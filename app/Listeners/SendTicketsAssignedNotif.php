<?php

namespace App\Listeners;

use App\Events\TicketsAssigned;
use App\Models\User;
use App\Notifications\Ticketing\Assigned\TicketAssignedNotif;
use App\Notifications\Ticketing\Assigned\TicketAssignedNotMeNotif;
use Auth;
use Notification;

class SendTicketsAssignedNotif
{
    public function handle(TicketsAssigned $event): void
    {
        $ticket = $event->updatedTickets->first()->load('assignee');
        $assigner = Auth::user();

        // not need to notify user if they assigned ticket to themselves
        if ($assigner->id !== $ticket['assigned_to']) {
            // ticket assigned to me
            $user = User::where('id', $ticket['assigned_to'])
                ->whereNeedsNotificationFor(TicketAssignedNotif::NOTIF_ID)
                ->first();
            if ($user) {
                Notification::send(
                    $user,
                    new TicketAssignedNotif($event->updatedTickets, $assigner),
                );
            }
        }

        // ticket assigned to someone else
        $users = User::where('id', '!=', $ticket['assigned_to'])
            ->whereNeedsNotificationFor(TicketAssignedNotMeNotif::NOTIF_ID)
            ->get();
        if ($users->isNotEmpty()) {
            Notification::send(
                $users,
                new TicketAssignedNotMeNotif(
                    $event->updatedTickets,
                    $assigner,
                    $ticket->assignee,
                ),
            );
        }
    }
}
