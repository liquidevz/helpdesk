<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Models\User;
use App\Notifications\TriggerEmailAction;

class SendEmailToUserAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $data = json_decode($action['pivot']['action_value'], true);
        $user = User::findOrFail($data['agent_id']);
        $ticket->load('latest_replies');
        $data['ticket'] = $ticket->toArray();
        $data['user'] = $user->toArray();

        $user->notify(new TriggerEmailAction($data));

        return $ticket;
    }
}
