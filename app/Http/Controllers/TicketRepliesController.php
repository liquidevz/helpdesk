<?php namespace App\Http\Controllers;

use App\Http\Requests\ModifyReplies;
use App\Models\Reply;
use App\Models\Ticket;
use App\Services\Ticketing\PaginateTicketReplies;
use App\Services\Ticketing\SubmitTicketReply;
use Common\Core\BaseController;

class TicketRepliesController extends BaseController
{
    public function index(Ticket $ticket)
    {
        $this->authorize('index', [Reply::class, $ticket]);

        $pagination = (new PaginateTicketReplies())->execute(
            $ticket->id,
            request()->all(),
        );

        return $this->success(['pagination' => $pagination]);
    }

    public function store(
        Ticket $ticket,
        string $type,
        ModifyReplies $request,
        SubmitTicketReply $replyCreator,
    ) {
        $this->authorize('store', [Reply::class, $ticket]);

        if ($ticket->status === 'locked') {
            return $this->error(
                __('This ticket is locked. To reply, create a new ticket.'),
            );
        }

        $reply = $replyCreator->execute(
            $ticket,
            $request->all(),
            $type,
            Reply::SOURCE_SITE,
        );

        return $this->success(['reply' => $reply->toArray()], 201);
    }
}
