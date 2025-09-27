<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketAttachmentsCondition extends BaseCondition
{
    /**
     * Check if ticket uploads condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        $originalTicket,
        string $operatorName,
        $conditionValue,
    ): bool {
        return $this->comparator->compare(
            $updatedTicket->attachments_count,
            $conditionValue,
            $operatorName,
        );
    }
}
