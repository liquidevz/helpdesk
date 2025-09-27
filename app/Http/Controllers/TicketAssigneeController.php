<?php namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\Ticketing\AssignTicketsToAgent;
use Common\Core\BaseController;

class TicketAssigneeController extends BaseController
{
    public function change()
    {
        $this->authorize('update', Ticket::class);

        $data = $this->validate(request(), [
            'ticketIds' => 'required|array|min:1',
            'ticketIds.*' => 'required|integer',
            'userId' => 'required|integer',
        ]);

        (new AssignTicketsToAgent())->execute(
            $data['ticketIds'],
            $data['userId'],
        );

        return $this->success();
    }
}
