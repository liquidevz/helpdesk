<?php namespace App\Services\Ticketing;

use App\Events\TicketReplyCreated;
use App\Events\TicketUpdated;
use App\Models\Activity;
use App\Models\Reply;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

/**
 * Handle reply submission from website ticket page or email.
 */
class SubmitTicketReply
{
    public function execute(
        Ticket $ticket,
        array $data,
        string $type,
        string $source,
    ): Reply {
        $reply = Reply::createForTicket($ticket, $data, $type);
        $creator = request()->user();

        if ($type === 'replies') {
            $statusName = $data['status'] ?? 'open';

            //change ticket status to specified one or "open"
            (new ChangeTicketStatus())->execute([$ticket->id], $statusName);

            if ($creator && !$creator->isAgent()) {
                Activity::replyCreated($reply, $source);
            }

            (new SendTicketReplyEmail())->execute($ticket, $reply, $creator);
        }

        if ($type !== 'drafts') {
            event(new TicketReplyCreated($ticket, $reply, Auth::id()));
            event(new TicketUpdated($ticket));
        }

        return $reply->load('user', 'attachments');
    }
}
