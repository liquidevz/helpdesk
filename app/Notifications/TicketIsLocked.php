<?php

namespace App\Notifications;

use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TicketIsLocked extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Ticket $ticket)
    {
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject(__('Ticket is locked'))
            ->line(
                __(
                    "Ticket you replied to ({$this->ticket->id}) was locked due to inactivity. Please create a new ticket on our support site.",
                ),
            )
            ->action(__('Create Ticket'), url('/hc/tickets/new'));
    }
}
