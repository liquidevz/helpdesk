<?php namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Common\Core\BaseController;
use Illuminate\Validation\Rule;

class UserDetailsController extends BaseController
{
    public function update(int $userId)
    {
        $this->authorize('update', User::class);

        $data = $this->validate(
            request(),
            [
                'emails' => 'array',
                'emails.*.address' => [
                    'required',
                    'email',
                    Rule::unique('emails', 'address')->ignore(
                        $userId,
                        'user_id',
                    ),
                    Rule::unique('users', 'email')->ignore($userId),
                ],
                'tags' => 'array',
                'tags.*' => 'string',
                'details' => 'string|nullable',
                'notes' => 'string|nullable',
                'timezone' => 'string|nullable',
                'country' => 'string|nullable',
                'language' => 'string|nullable',
            ],
            [],
            [
                'emails.*.address' => 'email',
            ],
        );

        $user = User::with(['details', 'secondary_emails'])->findOrFail(
            $userId,
        );

        // save details and notes
        if (!$user->details) {
            $user->setRelation('details', $user->details()->create([]));
        }
        $user->details
            ->fill([
                'details' => $data['details'] ?? null,
                'notes' => $data['notes'] ?? null,
            ])
            ->save();

        // save tags
        if (array_key_exists('tags', $data)) {
            $tagIds = collect($data['tags'])
                ->filter()
                ->map(fn($tagName) => Tag::firstOrCreate(['name' => $tagName]))
                ->pluck('id');
            $user->tags()->sync($tagIds);
        }

        // save emails
        if (array_key_exists('emails', $data)) {
            $user->secondary_emails()->delete();
            $user
                ->secondary_emails()
                ->createMany(
                    collect($data['emails'])->map(
                        fn($email) => ['address' => $email['address']],
                    ),
                );
        }

        $user
            ->fill(request()->only(['timezone', 'country', 'language']))
            ->save();

        return $this->success(['user' => $user]);
    }
}
