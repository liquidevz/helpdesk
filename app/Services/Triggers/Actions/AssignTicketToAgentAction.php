<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Services\Ticketing\AssignTicketsToAgent;

class AssignTicketToAgentAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger
    ): Ticket {
        $agentId = json_decode($action->pivot['action_value'])->agent_id;
        return app(AssignTicketsToAgent::class)
            ->execute([$ticket->id], $agentId)
            ->first();
    }
}
