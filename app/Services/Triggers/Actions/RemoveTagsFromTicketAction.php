<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;
use Common\Tags\Tag;

class RemoveTagsFromTicketAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $tagNames = json_decode($action->pivot['action_value'])->tags_to_remove;
        $tags = Tag::whereIn('name', explode(',', $tagNames))->get();

        $ticket->tags()->detach($tags->pluck('id')->toArray());

        //'unload' tags relationship in case it was already loaded
        //on passed in ticket so removed tags are properly removed
        //the next time tags relationship is accessed on this ticket
        unset($ticket->tags);

        return $ticket;
    }
}
