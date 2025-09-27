<?php namespace App\Events;

use App\Models\Reply;
use App\Models\Ticket;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class TicketReplyCreated implements ShouldQueue, ShouldBroadcast
{
    use SerializesModels, InteractsWithSockets;

    public int $creatorId;
    public string $replyType;
    public int $replyId;
    public int $ticketId;

    public function __construct(
        Ticket $ticket,
        Reply $reply,
    ) {
        $this->dontBroadcastToCurrentUser();

        $this->creatorId = $ticket->user_id;
        $this->replyId = $reply->id;
        $this->replyType = $reply->type;
        $this->ticketId = $reply->ticket_id;
    }

    public function broadcastOn(): \Illuminate\Broadcasting\Channel|array
    {
        return new Channel('tickets');
    }

    /**
     * Determine if this event should broadcast.
     *
     * @return bool
     */
    public function broadcastWhen()
    {
        return $this->replyType !== Reply::DRAFT_TYPE;
    }
}
