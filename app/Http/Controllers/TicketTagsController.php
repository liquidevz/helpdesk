<?php namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Ticket;
use App\Services\Ticketing\AddTagToTickets;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;

class TicketTagsController extends BaseController
{
    public function add()
    {
        $this->authorize('update', Ticket::class);

        $data = $this->validate(request(), [
            'ticketIds' => 'required|array',
            'tagName' => 'required|string|max:255',
        ]);

        $tag = app(Tag::class)->insertOrRetrieve([$data['tagName']], null)[0];

        (new AddTagToTickets())->execute($data['ticketIds'], $tag->id);

        return $this->success(['tag' => $tag->load('categories')]);
    }

    public function remove()
    {
        $this->authorize('update', Ticket::class);

        $data = $this->validate(request(), [
            'ticketIds' => 'required|array',
            'tagId' => 'required|integer',
        ]);

        DB::table('taggables')
            ->whereIn('taggable_id', $data['ticketIds'])
            ->where('tag_id', $data['tagId'])
            ->where('taggable_type', Ticket::MODEL_TYPE)
            ->delete();

        return $this->success();
    }
}
