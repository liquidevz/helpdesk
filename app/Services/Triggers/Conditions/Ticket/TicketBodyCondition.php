<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketBodyCondition extends BaseCondition
{
    /**
     * Check if ticket body condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        ?array $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        if (!$updatedTicket->latest_reply) {
            return false;
        }

        return $this->comparator->compare(
            $updatedTicket->latest_reply->body,
            $conditionValue,
            $operatorName,
        );
    }
}
