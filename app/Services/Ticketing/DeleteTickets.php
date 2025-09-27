<?php

namespace App\Services\Ticketing;

use App\Models\Activity;
use App\Models\Reply;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class DeleteTickets
{
    public function execute(array $ticketIds): void
    {
        $replyIds = Reply::whereIn('ticket_id', $ticketIds)
            ->get(['id', 'ticket_id'])
            ->pluck('id');

        //detach attachments from replies
        DB::table('file_entry_models')
            ->whereIn('model_id', $replyIds)
            ->where('model_type', Reply::MODEL_TYPE)
            ->delete();

        //detach tags from tickets
        DB::table('taggables')
            ->whereIn('taggable_id', $ticketIds)
            ->where('taggable_type', Ticket::MODEL_TYPE)
            ->delete();

        //delete ticket replies
        Reply::whereIn('id', $replyIds)->delete();

        //delete tickets
        Ticket::whereIn('id', $ticketIds)->delete();

        // delete activity items
        Activity::where('subject_type', Ticket::MODEL_TYPE)
            ->whereIn('subject_id', $ticketIds)
            ->delete();
    }
}
