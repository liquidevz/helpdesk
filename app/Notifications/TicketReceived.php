<?php

namespace App\Notifications;

use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TicketReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Ticket $ticket)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via(mixed $notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @return MailMessage
     */
    public function toMail(mixed $notifiable)
    {
        return (new MailMessage)
            ->subject(__('Request Received'))
            ->line(__(
                "Thanks for getting in touch! This is an automatic email just to let you know that we've received your request and your ticket reference is #:ticketId.",
                ['ticketId' => $this->ticket->id]
            ))
            ->line(__('One of our support agents will get back to you shortly. Please do not submit multiple tickets for the same request, as this will not result in a faster response time.'))
            ->action(__('View Help Center'), url('/hc'));
    }
}
