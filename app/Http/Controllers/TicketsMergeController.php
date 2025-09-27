<?php namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\Ticketing\MergeTickets;
use Common\Core\BaseController;

class TicketsMergeController extends BaseController
{
    public function merge()
    {
        $data = $this->validate(request(), [
            'ticketId' => 'required|integer|exists:tickets,id',
            'mergeeId' => 'required|integer|exists:tickets,id',
        ]);

        $ticket = Ticket::findOrFail($data['ticketId']);
        $mergee = Ticket::findOrFail($data['mergeeId']);

        $this->authorize('update', $ticket);

        (new MergeTickets())->execute($ticket, $mergee);

        return $this->success([
            'ticket' => $ticket->fresh(),
        ]);
    }
}
