<?php

namespace App\Services\Ticketing;

use App\Models\Reply;
use App\Models\Ticket;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class CreateTicket
{
    public function execute(array $data)
    {
        if (!Arr::has($data, 'user_id')) {
            $data['user_id'] = Auth::id();
        }

        $ticket = Ticket::create([
            'user_id' => $data['user_id'],
            'subject' => $data['subject'],
            'received_at_email' => $data['received_at_email'] ?? null,
            'status' => $data['status'] ?? 'open',
        ]);

        if (isset($data['category_id'])) {
            $ticket->tags()->syncWithoutDetaching([$data['category_id']]);
        }

        Reply::createForTicket(
            $ticket,
            Arr::only($data, ['body', 'user_id', 'email_id', 'attachments']),
        );

        return $ticket;
    }
}
