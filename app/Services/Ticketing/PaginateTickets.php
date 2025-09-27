<?php

namespace App\Services\Ticketing;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaginateTickets
{
    public function execute(array $params): AbstractPaginator
    {
        $tagId = $params['tagId'] ?? null;
        $assignee = $params['assigned_to'] ?? null;
        $requester = $params['userId'] ?? null;
        $searchTerm = $params['query'] ?? null;
        $perPage = $params['perPage'] ?? 15;
        $page = $params['page'] ?? 1;
        $loader = $params['loader'] ?? 'basic';

        $query = Ticket::query()->when($loader === 'ticketTable', function (
            Builder $query,
        ) {
            $query
                ->with(['user', 'tags', 'latest_reply', 'assignee'])
                ->withCount('replies');
        });

        if ($tagId) {
            $this->filterByTag($tagId, $query);
        }

        if ($assignee) {
            $query->where('assigned_to', $assignee);
        }

        // get only tickets that specified user has created
        if ($requester) {
            $query->where('tickets.user_id', $requester);
        }

        if ($searchTerm) {
            $query->where('subject', 'like', "$searchTerm%");
        }

        if ($orderBy = Arr::get($params, 'orderBy')) {
            $query->orderBy($orderBy, Arr::get($params, 'orderDir', 'desc'));
        } else {
            $query->orderByStatus();
        }

        if (Arr::get($params, 'paginate') === 'simple') {
            $pagination = $query->simplePaginate(
                $perPage,
                ['*'],
                'page',
                $page,
            );
        } else {
            $pagination = $query->paginate($perPage, ['*'], 'page', $page);
        }

        //remove html tags from replies and limit to 1 reply
        if ($loader === 'ticketTable') {
            $pagination->through(function ($ticket) {
                if ($ticket->latest_reply) {
                    $ticket->latest_reply->body = Str::limit(
                        strip_tags($ticket->latest_reply->body),
                        300,
                    );
                }
                return $ticket;
            });
        }

        return $pagination;
    }

    public function filterByTag(string $tagId, Builder $builder): Builder
    {
        return match ($tagId) {
            'unassigned' => $builder->whereNull('assigned_to'),
            'mine' => $builder->where('assigned_to', Auth::id()),
            'assigned' => $builder->whereNotNull('assigned_to'),
            'closed' => $builder->whereNotNull('closed_at'),
            'open' => $builder->where('status', 'open'),
            'pending' => $builder->where('status', 'pending'),
            'locked' => $builder->where('status', 'locked'),
            'spam' => $builder->where('status', 'spam'),
            default => $builder->whereHas(
                'tags',
                fn(Builder $query) => $query
                    ->where('tags.id', (int) $tagId)
                    ->orWhere('tags.name', (string) $tagId),
            ),
        };
    }
}
