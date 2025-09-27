<?php

namespace App\Services\Ticketing;

use App\Mail\TicketReply;
use App\Models\Reply;
use App\Models\Ticket;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendTicketReplyEmail
{
    public function execute(Ticket $ticket, Reply $reply, ?User $creator): void
    {
        if (
            settings('replies.send_email') &&
            ($creator && $creator->isAgent())
        ) {
            try {
                Mail::send(new TicketReply($ticket, $reply));
            } catch (Exception $e) {
                if (!app()->environment('production')) {
                    throw $e;
                } else {
                    Log::error($e);
                }
            }
        }
    }
}
