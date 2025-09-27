<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketMailboxAddressCondition extends BaseCondition
{
    public function isMet(
        Ticket $updatedTicket,
        ?array $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        return $this->comparator->compare(
            $updatedTicket->received_at_email,
            $conditionValue,
            $operatorName,
        );
    }
}
