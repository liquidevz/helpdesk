<?php

namespace App\Services\Ticketing;

use App\Models\Reply;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Facades\Auth;

class PaginateTicketReplies
{
    public function execute(
        int $ticketId,
        array $params = [],
    ): AbstractPaginator {
        return Reply::with(['user' => fn($q) => $q->compact(), 'attachments'])
            ->where('ticket_id', $ticketId)
            ->where(function (Builder $replyQuery) {
                // load all replies
                $replyQuery->where('type', Reply::REPLY_TYPE);

                // load notes if current user is agent
                if (Auth::user()->isAgent()) {
                    $replyQuery->orWhere('type', Reply::NOTE_TYPE);
                }
            })
            ->orderBy('created_at', 'desc')
            ->simplePaginate($params['perPage'] ?? 10);
    }
}
