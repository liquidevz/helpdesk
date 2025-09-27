<?php namespace App\Http\Controllers;

use App\Data\TicketLoader;
use App\Events\TicketCreated;
use App\Events\TicketUpdated;
use App\Models\Ticket;
use App\Rules\EnvatoSupportIsNotExpired;
use App\Services\Ticketing\CreateTicket;
use App\Services\Ticketing\DeleteTickets;
use App\Services\Ticketing\PaginateTickets;
use App\Services\Ticketing\SendTicketReplyEmail;
use Common\Core\BaseController;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class TicketController extends BaseController
{
    public function index()
    {
        $this->authorize('index', [Ticket::class, request('userId')]);

        $this->validate(request(), [
            'tags' => 'string|min:1',
            'assigned_to' => 'integer',
        ]);

        $pagination = (new PaginateTickets())->execute(request()->all());

        return $this->success(['pagination' => $pagination]);
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('show', $ticket);

        $response = (new TicketLoader())->loadData($ticket);

        return $this->success($response);
    }

    public function store()
    {
        $this->authorize('store', Ticket::class);

        $data = $this->validate(request(), [
            'user_id' => 'integer|exists:users,id',
            'subject' => 'required|min:3|max:255',
            'category_id' => [
                'required',
                'integer',
                'min:1',
                new EnvatoSupportIsNotExpired(),
            ],
            'body' => 'required|min:3',
            'attachments' => 'array|max:10|exists:file_entries,id',
            'status' => 'string',
            'created_by_agent' => 'boolean',
        ]);
        $createdByAgent = $data['created_by_agent'] ?? false;

        $ticket = (new CreateTicket())->execute($data);

        event(
            new TicketCreated(
                $ticket,
                $createdByAgent,
                request('suggestionLog'),
            ),
        );

        // send ticket reply email, if ticket was created by agent
        if ($createdByAgent) {
            (new SendTicketReplyEmail())->execute(
                $ticket,
                $ticket->latest_reply,
                Auth::user(),
            );
        }

        return response($ticket, 201);
    }

    public function update(int $id)
    {
        $ticket = Ticket::findOrFail($id);
        $this->authorize('update', $ticket);

        $data = $this->validate(request(), [
            'subject' => 'min:3|max:255',
            'category_id' => 'integer|min:1',
            'status' => 'string',
            'user_id' => 'integer|exists:users,id',
        ]);

        $ticket->fill($data)->save();

        event(new TicketUpdated($ticket));

        return $this->success(['ticket' => $ticket]);
    }

    public function destroy(string $ids)
    {
        $ticketIds = explode(',', $ids);
        $this->authorize('destroy', Ticket::class);

        (new DeleteTickets())->execute($ticketIds);

        return $this->success([], 204);
    }

    public function nextActiveTicket($tagId)
    {
        $this->authorize('index', Ticket::class);

        $query = Ticket::query()->where(function (Builder $builder) {
            $builder
                ->whereNull('assigned_to')
                ->orWhere('assigned_to', Auth::id());
        });

        if ($tagId !== 'closed') {
            $query->whereNull('closed_at');
        }

        (new PaginateTickets())->filterByTag($tagId, $query);

        $ticket = $query->orderByStatus()->first();

        return $this->success(['ticket' => $ticket]);
    }
}
