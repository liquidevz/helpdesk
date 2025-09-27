<?php namespace App\Services\Triggers\Conditions\Customer;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class CustomerEmailCondition extends BaseCondition
{
    /**
     * Check if ticket customer condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        ?array $originalTicket,
        string $operatorName,
        $conditionValue,
    ): bool {
        return $this->comparator->compare(
            $updatedTicket->user->email,
            $conditionValue,
            $operatorName,
        );
    }
}
