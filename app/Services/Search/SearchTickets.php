<?php

namespace App\Services\Search;

use App\Models\Ticket;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;

class SearchTickets
{
    public function execute(array $params): AbstractPaginator
    {
        $datasource = new Datasource(
            Ticket::query(),
            $params,
            null,
            config('scout.driver'),
        );

        $pagination = $datasource->paginate();

        $pagination
            ->load(['latest_reply', 'user', 'tags'])
            ->loadCount(['replies']);
        $pagination->each(function (Ticket $ticket) {
            if ($ticket->latest_reply) {
                $ticket->latest_reply->stripBody();
            }
        });

        return $pagination;
    }
}
