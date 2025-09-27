<?php

namespace App\Notifications\Ticketing\Replies;

use App\Models\Reply;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\Ticketing\TicketingNotification;
use App\Services\UrlGenerator;
use Illuminate\Support\Str;

abstract class NewReplyCreatedNotif extends TicketingNotification
{
    public function __construct(
        protected Ticket $ticket,
        protected Reply $reply,
    ) {
    }

    protected function mainAction(): array
    {
        return [
            'label' => __('View Conversation'),
            'action' => app(UrlGenerator::class)->ticket($this->ticket),
        ];
    }

    protected function lines(User $notifiable): array
    {
        return [
            $this->firstLine($notifiable),
            Str::limit(
                strip_tags(str_replace('&nbsp;', '', $this->reply->body)),
                150,
            ),
        ];
    }

    protected function firstLine(User $notifiable): string
    {
        $vars = [
            'user' => $this->reply->user->display_name,
            'assignee' => $this->ticket->assigned_to
                ? $this->ticket->assignee->display_name
                : null,
            'ticketId' => $this->ticket->id,
        ];

        if ($this->ticket->assigned_to === $notifiable->id) {
            return $this->reply->type === Reply::NOTE_TYPE
                ? __(
                    '**:user** added a note to your conversation #:ticketId',
                    $vars,
                )
                : __(
                    '**:user** replied to your conversation #:ticketId',
                    $vars,
                );
        } elseif ($this->ticket->assigned_to) {
            return $this->reply->type === Reply::NOTE_TYPE
                ? __(
                    '**:user** added a note to **:assignee** conversation #:ticketId',
                    $vars,
                )
                : __(
                    '**:user** replied to **:assignee** conversation #:ticketId',
                    $vars,
                );
        } else {
            return $this->reply->type === Reply::NOTE_TYPE
                ? __(
                    '**:user** added a note to unassigned conversation #:ticketId',
                    $vars,
                )
                : __(
                    '**:user** replied to unassigned conversation #:ticketId',
                    $vars,
                );
        }
    }

    protected function image(): string
    {
        return $this->ticket->user->avatar;
    }
}
