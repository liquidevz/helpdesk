<?php

namespace App\Notifications\Ticketing;

use App\Models\Ticket;
use App\Models\User;
use App\Services\UrlGenerator;
use Str;

class TicketCreatedNotif extends TicketingNotification
{
    public const NOTIF_ID = '01';

    public function __construct(protected Ticket $ticket)
    {
    }

    protected function lines(User $notifiable): array
    {
        $category = $this->ticket->categories->first();
        $categoryName = $category ? $category->display_name : '-';
        $subject = $this->ticket->subject;

        return [
            $this->firstLine(),
            __("Category: $categoryName", ['category' => $categoryName]),
            __("Subject: $subject", ['category' => $categoryName]),
            Str::limit(strip_tags($this->ticket->latest_reply->body), 150),
        ];
    }

    protected function firstLine(): string
    {
        return __(':customer has started a new conversion #:ticketId', [
            'customer' => $this->ticket->user->display_name,
            'ticketId' => $this->ticket->id,
        ]);
    }

    protected function image(): string
    {
        return $this->ticket->user->avatar;
    }

    protected function mainAction(): array
    {
        return [
            'label' => __('View conversation'),
            'action' => app(UrlGenerator::class)->ticket($this->ticket),
        ];
    }
}
