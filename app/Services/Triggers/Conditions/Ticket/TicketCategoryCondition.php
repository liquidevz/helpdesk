<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketCategoryCondition extends BaseCondition
{
    /**
     * Check if ticket categories condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        ?array $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        foreach ($updatedTicket->categories as $category) {
            if (
                $this->comparator->compare(
                    $category->name,
                    $conditionValue,
                    $operatorName,
                )
            ) {
                return true;
            }
        }

        return false;
    }
}
