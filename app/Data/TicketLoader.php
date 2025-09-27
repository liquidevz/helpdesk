<?php

namespace App\Data;

use App\Models\PurchaseCode;
use App\Models\Ticket;
use App\Services\Ticketing\PaginateTicketReplies;
use Illuminate\Support\Facades\Auth;

class TicketLoader
{
    public function loadData(Ticket $ticket): array
    {
        $ticket->load([
            'tags.categories',
            'user.purchase_codes',
            'user.tags',
            'assignee',
        ]);

        $draft = $ticket
            ->replies()
            ->with(['user' => fn($q) => $q->compact(), 'attachments'])
            ->where('type', 'drafts')
            ->where('user_id', Auth::id())
            ->first();

        $ticket->user->purchase_codes->transform(function (PurchaseCode $code) {
            $code->support_expired =
                !$code->supported_until || $code->supported_until->lt(now());
            return $code;
        });

        $replies = (new PaginateTicketReplies())->execute($ticket->id);

        return [
            'ticket' => $ticket,
            'replies' => $replies,
            'draft' => $draft,
        ];
    }
}
