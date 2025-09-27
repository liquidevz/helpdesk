<?php

namespace App\Listeners;

use App\Models\Activity;
use App\Models\CannedReply;
use App\Models\Ticket;
use App\Services\Ticketing\DeleteTickets;
use Common\Auth\Events\UsersDeleted;
use Illuminate\Support\Facades\DB;

class DeleteUserRelations
{
    public function handle(UsersDeleted $event): void
    {
        $userIds = $event->users->pluck('id');

        // emails
        DB::table('emails')
            ->whereIn('user_id', $userIds)
            ->delete();

        // details
        DB::table('user_details')
            ->whereIn('user_id', $userIds)
            ->delete();

        // purchase codes
        DB::table('purchase_codes')
            ->whereIn('user_id', $userIds)
            ->delete();

        // tickets
        $ticketIds = Ticket::whereIn('user_id', $userIds)->pluck('id');
        (new DeleteTickets())->execute($ticketIds->toArray());

        // activity log
        Activity::whereIn('causer_id', $userIds)->delete();

        // canned replies
        CannedReply::whereIn('user_id', $userIds)->delete();
    }
}
