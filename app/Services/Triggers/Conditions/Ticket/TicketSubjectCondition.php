<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketSubjectCondition extends BaseCondition
{
    /**
     * Check if ticket subject condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        array|null $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        return $this->comparator->compare(
            $updatedTicket->subject,
            $conditionValue,
            $operatorName,
        );
    }
}
