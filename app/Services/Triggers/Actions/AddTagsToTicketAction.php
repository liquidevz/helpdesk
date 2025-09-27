<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Tag;
use App\Models\Ticket;
use App\Models\Trigger;

class AddTagsToTicketAction implements TriggerActionInterface
{
    public function execute(
        Ticket $ticket,
        Action $action,
        Trigger $trigger,
    ): Ticket {
        $tags = json_decode($action->pivot['action_value'])->tags_to_add;
        $tags = is_array($tags) ? $tags : explode(',', $tags);

        $tags = app(Tag::class)->insertOrRetrieve($tags, null);

        $ticket->tags()->syncWithoutDetaching($tags->pluck('id')->toArray());

        //'unload' tags relationship in case it was already loaded
        //on passed in ticket so removed tags are properly removed
        //the next time tags relationship is accessed on this ticket
        unset($ticket->tags);

        return $ticket;
    }
}
