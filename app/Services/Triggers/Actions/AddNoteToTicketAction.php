<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Reply;
use App\Models\Ticket;
use App\Models\Trigger;

class AddNoteToTicketAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $body = json_decode($action->pivot['action_value'])->note_text;

        Reply::createForTicket(
            $ticket,
            [
                'body' => $body,
                'user_id' => $trigger->user_id,
            ],
            Reply::NOTE_TYPE,
        );

        return $ticket;
    }
}
