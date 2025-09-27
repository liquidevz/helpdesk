<?php

namespace App\Data;

use App\Models\Tag;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Auth;

class LoadStatusAndCategoryTags
{
    public function execute(): array
    {
        $activeTickets = Ticket::where('status', 'open')
            ->select(['id', 'assigned_to'])
            ->with([
                'tags' => fn(MorphToMany $q) => $q->select('id'),
            ])
            ->limit(100)
            ->get();

        $unassigned = 'unassigned';
        $mine = 'mine';
        $assigned = 'assigned';
        $closed = 'closed';

        $viewTags = collect([
            [
                'name' => $unassigned,
                'id' => $unassigned,
                'display_name' => ucfirst($unassigned),
                'type' => 'view',
                'tickets_count' => $activeTickets
                    ->filter(fn(Ticket $ticket) => !$ticket->assigned_to)
                    ->count(),
            ],
            [
                'id' => $mine,
                'name' => $mine,
                'type' => 'view',
                'display_name' => ucfirst($mine),
                'tickets_count' => $activeTickets
                    ->filter(
                        fn(Ticket $ticket) => $ticket->assigned_to ===
                            Auth::id(),
                    )
                    ->count(),
            ],
            [
                'name' => $assigned,
                'id' => $assigned,
                'display_name' => ucfirst($assigned),
                'type' => 'view',
                'tickets_count' => $activeTickets
                    ->filter(function (Ticket $ticket) {
                        return !!$ticket->assigned_to &&
                            $ticket->assigned_to !== Auth::id();
                    })
                    ->count(),
            ],
            [
                'name' => $closed,
                'id' => $closed,
                'display_name' => ucfirst($closed),
                'type' => 'view',
            ],
        ]);

        $statusTags = Tag::where('type', 'status')->get();

        $categoryTags = Tag::where('type', 'category')
            ->with('categories')
            ->get()
            ->map(function (Tag $tag) use ($activeTickets) {
                $tag->tickets_count = $activeTickets
                    ->filter(
                        fn(Ticket $ticket) => $ticket->tags->contains($tag),
                    )
                    ->count();
                return $tag;
            });

        return [
            'viewTags' => $viewTags,
            'statusTags' => $statusTags,
            'categoryTags' => $categoryTags,
        ];
    }
}
