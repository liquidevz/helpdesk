<?php namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\Ticketing\ChangeTicketStatus;
use Common\Core\BaseController;

class TicketStatusController extends BaseController
{
    public function change()
    {
        $data = $this->validate(request(), [
            'ids' => 'required|array',
            'status' => 'required|string|in:open,closed,locked,pending,spam',
        ]);

        $tickets = Ticket::whereIn('id', $data['ids'])->get();

        $this->authorize('update', [new Ticket(), $tickets]);

        (new ChangeTicketStatus())->execute($data['ids'], $data['status']);

        return $this->success();
    }
}
