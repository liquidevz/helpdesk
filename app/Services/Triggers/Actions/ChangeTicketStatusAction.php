<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Services\Ticketing\ChangeTicketStatus;

class ChangeTicketStatusAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $statusName = json_decode($action->pivot['action_value'])->status_name;

        (new ChangeTicketStatus())->execute([$ticket->id], $statusName);

        // 'unload' tags relationship in case it was already loaded
        // on given ticket so removed tags are properly removed
        // the next time tags/status relationship is accessed on this ticket
        $ticket->unsetRelation('tags');

        return $ticket;
    }
}
