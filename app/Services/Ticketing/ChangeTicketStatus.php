<?php

namespace App\Services\Ticketing;

use App\Models\Ticket;
use App\Models\User;

class ChangeTicketStatus
{
    public function execute(mixed $ids, string $status, User $user = null): void
    {
        $values = ['status' => $status];
        if ($status === 'closed') {
            $values['closed_at'] = now();
            if (!$user) {
                $user = auth()->user();
            }
            if ($user?->isAgent()) {
                $values['closed_by'] = $user->id;
            }
        } elseif ($status === 'open' || $status === 'pending') {
            $values['closed_at'] = null;
            $values['closed_by'] = null;
        }

        Ticket::whereIn('id', $ids)->update($values);
    }
}
