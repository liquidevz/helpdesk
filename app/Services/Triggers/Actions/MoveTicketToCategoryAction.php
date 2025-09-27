<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Services\Ticketing\AddTagToTickets;
use Common\Tags\Tag;

class MoveTicketToCategoryAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $categoryName = json_decode($action['pivot']['action_value'])
            ->category_name;

        $category = Tag::updateOrCreate([
            'name' => $categoryName,
            'type' => 'category',
        ]);

        (new AddTagToTickets())->execute([$ticket->id], $category['id']);

        //'unload' tags relationship in case it was already loaded
        //on passed in ticket so removed tags are properly removed
        //the next time tags relationship is accessed on this ticket
        unset($ticket->tags);

        return $ticket;
    }
}
