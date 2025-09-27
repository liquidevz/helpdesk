<?php

namespace App\Listeners;

use App\Events\TicketReplyCreated;
use App\Models\Reply;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\Ticketing\Replies\Agent\AgentRepliedToMyTicketNotif;
use App\Notifications\Ticketing\Replies\Agent\AgentRepliedToSomeoneElseTicketNotif;
use App\Notifications\Ticketing\Replies\Agent\AgentRepliedToUnassignedTicketNotif;
use App\Notifications\Ticketing\Replies\Customer\CustomerRepliedToMyTicketNotif;
use App\Notifications\Ticketing\Replies\Customer\CustomerRepliedToSomeoneElseTicketNotif;
use App\Notifications\Ticketing\Replies\Customer\CustomerRepliedToUnassignedTicketNotif;
use Illuminate\Contracts\Queue\ShouldQueue;
use Notification;

class SendReplyCreatedNotif implements ShouldQueue
{
    public function __construct(private Ticket $ticket, private Reply $reply)
    {
    }

    public function handle(TicketReplyCreated $event): void
    {
        $ticket = $this->ticket->find($event->ticketId);
        $reply = $this->reply->find($event->replyId);
        $replyFromAgent = $reply->user?->isAgent();

        if ($ticket->assigned_to) {
            // ticket assigned to me
            $notif1 = $replyFromAgent
                ? AgentRepliedToMyTicketNotif::class
                : CustomerRepliedToMyTicketNotif::class;
            $user = app(User::class)
                ->where('id', $ticket->assigned_to)
                ->where('id', '!=', $reply->user_id)
                ->whereNeedsNotificationFor($notif1::NOTIF_ID)
                ->first();
            if ($user) {
                Notification::send(
                    $user,
                    new $notif1($ticket, $reply),
                );
            }

            // ticket assigned to someone else
            $notif2 = $replyFromAgent
                ? AgentRepliedToSomeoneElseTicketNotif::class
                : CustomerRepliedToSomeoneElseTicketNotif::class;
            $users = User::where('id', '!=', $ticket->assigned_to)
                ->where('id', '!=', $reply->user_id)
                ->whereNeedsNotificationFor($notif2::NOTIF_ID)
                ->get();
            if ($users->isNotEmpty()) {
                Notification::send(
                    $users,
                    new $notif2($ticket, $reply),
                );
            }
        } else {
            // ticket is unassigned
            $notif3 = $replyFromAgent
                ? AgentRepliedToUnassignedTicketNotif::class
                : CustomerRepliedToUnassignedTicketNotif::class;

            $users = User::with('notificationSubscriptions')
                ->where('id', '!=', $reply->user_id)
                ->whereNeedsNotificationFor($notif3::NOTIF_ID)
                ->get();
            if ($users->isNotEmpty()) {
                Notification::send(
                    $users,
                    new $notif3($ticket, $reply),
                );
            }
        }
    }
}
