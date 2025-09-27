<?php namespace App\Listeners;

use App\Events\TicketCreated;
use App\Events\TicketUpdated;
use App\Models\Activity;
use App\Models\Ticket;
use App\Notifications\TicketReceived;
use App\Services\Search\SearchTerms\AggregateSearchTerms;
use App\Services\Triggers\TriggersCycle;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Events\Dispatcher;

class TicketEventSubscriber implements ShouldQueue
{
    public function onTicketCreated(TicketCreated $e): void
    {
        $ticket = Ticket::find($e->ticket->id);
        app(TriggersCycle::class)->runAgainstTicket($ticket);
        if (!$e->createdByAgent) {
            (new AggregateSearchTerms())
                ->execute($e->suggestionLog)
                ->each(function ($term) use ($ticket) {
                    Activity::articlesSuggested(
                        $ticket,
                        $term['term'],
                        $term['results'],
                        isset($term['date'])
                            ? CarbonImmutable::parse($term['date'])
                            : null,
                    );
                });
            Activity::ticketCreated($ticket);
            if (settings('tickets.send_ticket_created_notification')) {
                $ticket->user->notify(new TicketReceived($ticket));
            }
        }
    }

    public function onTicketUpdated(TicketUpdated $event): void
    {
        app(TriggersCycle::class)->runAgainstTicket(
            $event->updatedTicket,
            $event->originalTicket,
        );
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(TicketCreated::class, [self::class, 'onTicketCreated']);
        $events->listen(TicketUpdated::class, [self::class, 'onTicketUpdated']);
    }
}
