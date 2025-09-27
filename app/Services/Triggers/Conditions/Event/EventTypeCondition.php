<?php

namespace App\Services\Triggers\Conditions\Event;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class EventTypeCondition extends BaseCondition
{
    /**
     * Check if ticket was created or updated.
     */
    public function isMet(
        Ticket $updatedTicket,
        array|null $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        if ($operatorName === 'is') {
            if ($conditionValue === 'ticket_created' && !$originalTicket) {
                return true;
            } elseif ($conditionValue === 'ticket_updated' && $originalTicket) {
                return true;
            }
        } elseif ($operatorName === 'not') {
            if ($conditionValue === 'ticket_created' && $originalTicket) {
                return true;
            } elseif (
                $conditionValue === 'ticket_updated' &&
                !$originalTicket
            ) {
                return true;
            }
        }

        return false;
    }
}
