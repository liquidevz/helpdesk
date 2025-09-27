<?php namespace App\Events;

use App\Models\Ticket;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class TicketCreated implements ShouldQueue, ShouldBroadcast
{
    use SerializesModels, InteractsWithSockets;

    public function __construct(
        public Ticket $ticket,
        public ?bool $createdByAgent = false,
        public ?array $suggestionLog = [],
    ) {
        $this->dontBroadcastToCurrentUser();
    }

    public function broadcastOn()
    {
        return new Channel('tickets');
    }
}
