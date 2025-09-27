<?php

namespace App\Http\Controllers;

use App\Models\User;
use Common\Auth\Actions\DeleteUsers;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;

class MergeUsersController extends BaseController
{
    public function __invoke()
    {
        $data = $this->validate(request(), [
            'user_id' => 'required|integer|exists:users,id',
            'mergee_id' => 'required|integer|exists:users,id',
        ]);

        $mergee = User::findOrFail($data['mergee_id']);
        $user = User::findOrFail($data['user_id']);
        $userId = $data['user_id'];

        // sessions
        $mergee->activeSessions()->update(['user_id' => $userId]);

        // activity log
        $mergee->activityLog()->update(['causer_id' => $userId]);

        // article feedback
        DB::table('article_feedback')
            ->where('user_id', $mergee->id)
            ->update(['user_id' => $userId]);

        // bans
        $mergee->bans()->update(['bannable_id' => $userId]);

        // canned replies
        $mergee->cannedReplies()->update(['user_id' => $userId]);

        // csv exports
        DB::table('csv_exports')
            ->where('user_id', $mergee->id)
            ->update(['user_id' => $userId]);

        // emails
        $allEmails = $mergee->secondary_emails
            ->pluck('address')
            ->merge($user->secondary_emails->pluck('address'))
            ->push($mergee->email)
            ->unique();
        DB::table('emails')
            ->whereIn('id', [$mergee->id, $user->id])
            ->delete();
        DB::table('emails')->insert(
            $allEmails
                ->map(
                    fn($email) => [
                        'address' => $email,
                        'user_id' => $userId,
                    ],
                )
                ->toArray(),
        );

        // uploads
        DB::table('file_entry_models')
            ->where('model_id', $mergee->id)
            ->where('model_type', User::MODEL_TYPE)
            ->update(['model_id' => $userId]);

        // notifications
        $mergee->notifications()->update(['notifiable_id' => $userId]);
        $mergee->notificationSubscriptions()->delete();

        // permissions
        $allPermissions = DB::table('permissionables')
            ->whereIn('permissionable_id', [$mergee->id, $user->id])
            ->where('permissionable_type', User::MODEL_TYPE)
            ->get()
            ->unique('permission_id')
            ->map(function ($permission) use ($userId) {
                $permission->permissionable_id = $userId;
                return $permission;
            });
        DB::table('permissionables')
            ->whereIn('permissionable_id', [$mergee->id, $user->id])
            ->where('permissionable_type', User::MODEL_TYPE)
            ->delete();
        DB::table('permissionables')->insert(
            json_decode(json_encode($allPermissions), true),
        );

        // tokens
        DB::table('personal_access_tokens')
            ->where('tokenable_id', $mergee->id)
            ->where('tokenable_type', User::MODEL_TYPE)
            ->update(['tokenable_id' => $userId]);

        // purchase codes
        $mergee->purchase_codes()->update(['user_id' => $userId]);

        // replies
        $mergee->replies()->update(['user_id' => $userId]);

        // search terms
        DB::table('search_terms')
            ->where('user_id', $mergee->id)
            ->update(['user_id' => $userId]);

        // social profiles
        $allProfiles = DB::table('social_profiles')
            ->whereIn('user_id', [$mergee->id, $user->id])
            ->get()
            ->unique('service_name')
            ->map(function ($permission) use ($userId) {
                $permission->user_id = $userId;
                return $permission;
            });
        DB::table('social_profiles')
            ->whereIn('user_id', [$mergee->id, $user->id])
            ->delete();
        DB::table('social_profiles')->insert(
            json_decode(json_encode($allProfiles), true),
        );

        // tags
        $mergee->tags()->update(['taggable_id' => $userId]);

        // tickets
        $mergee->tickets()->update(['user_id' => $userId]);

        // user details
        $mergee->details()->update(['user_id' => $userId]);

        // file entries
        DB::table('user_file_entry')
            ->where('user_id', $mergee->id)
            ->update(['user_id' => $userId]);

        // roles
        $allRoles = DB::table('user_role')
            ->whereIn('user_id', [$mergee->id, $user->id])
            ->get()
            ->unique('role_id')
            ->map(function ($permission) use ($userId) {
                $permission->user_id = $userId;
                return $permission;
            });
        DB::table('user_role')
            ->whereIn('user_id', [$mergee->id, $user->id])
            ->delete();
        DB::table('user_role')->insert(
            json_decode(json_encode($allRoles), true),
        );

        (new DeleteUsers())->execute([$mergee->id]);
    }
}
