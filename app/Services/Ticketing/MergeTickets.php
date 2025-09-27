<?php

namespace App\Services\Ticketing;

use App\Models\Activity;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class MergeTickets
{
    public function execute(Ticket $ticket, Ticket $mergee): void
    {
        // merge replies (without touching timestamps)
        DB::table('replies')
            ->where('ticket_id', $mergee->id)
            ->update(['ticket_id' => $ticket->id]);

        // delete create ticket event for mergee so there's no duplicates
        Activity::where('subject_type', Ticket::MODEL_TYPE)
            ->where('event', 'created')
            ->where('subject_id', $mergee->id)
            ->delete();

        // merge activity log
        Activity::where('subject_type', Ticket::MODEL_TYPE)
            ->where('subject_id', $mergee->id)
            ->update(['subject_id' => $ticket->id]);

        // merge tags and delete mergee ticket
        $tagIds = $ticket->tags->pluck('id')->merge($mergee->tags->pluck('id'));
        (new DeleteTickets())->execute([$mergee->id]);
        $ticket->tags()->sync($tagIds);
    }
}
