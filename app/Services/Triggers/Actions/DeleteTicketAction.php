<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Services\Ticketing\DeleteTickets;

class DeleteTicketAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        (new DeleteTickets())->execute([$ticket->id]);
        return $ticket;
    }
}
