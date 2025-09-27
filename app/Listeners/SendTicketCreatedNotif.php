<?php

namespace App\Listeners;

use App\Events\TicketCreated;
use App\Models\User;
use App\Notifications\Ticketing\TicketCreatedNotif;
use Notification;

class SendTicketCreatedNotif
{
    public function handle(TicketCreated $event): void
    {
        $users = app(User::class)
            ->whereNeedsNotificationFor(TicketCreatedNotif::NOTIF_ID)
            ->get();
        Notification::send($users, new TicketCreatedNotif($event->ticket));
    }
}
