<?php namespace App\Services\Triggers\Conditions\Ticket;

use App\Models\Ticket;
use App\Services\Triggers\Conditions\BaseCondition;

class TicketStatusCondition extends BaseCondition
{
    /**
     * Check if ticket subject condition should be met based on specified values.
     */
    public function isMet(
        Ticket $updatedTicket,
        ?array $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool {
        if (!$updatedTicket->status) {
            return false;
        }
        return match ($operatorName) {
            'is' => $this->comparator->compare(
                $updatedTicket->status,
                $conditionValue,
                'equals',
            ),
            'not' => $this->comparator->compare(
                $updatedTicket->status,
                $conditionValue,
                'not_equals',
            ),
            'changed' => $this->statusChanged($updatedTicket, $originalTicket),
            'not_changed' => !$this->statusChanged(
                $updatedTicket,
                $originalTicket,
            ),
            'changed_to' => $this->statusChanged(
                $updatedTicket,
                $originalTicket,
            ) &&
                $this->comparator->compare(
                    $updatedTicket->status,
                    $conditionValue,
                    'equals',
                ),
            'not_changed_to' => $this->statusChanged(
                $updatedTicket,
                $originalTicket,
            ) &&
                $this->comparator->compare(
                    $updatedTicket->status,
                    $conditionValue,
                    'not_equals',
                ),
            'changed_from' => $this->statusChanged(
                $updatedTicket,
                $originalTicket,
            ) &&
                $this->comparator->compare(
                    $originalTicket['status'],
                    $conditionValue,
                    'equals',
                ),
            'not_changed_from' => $this->statusChanged(
                $updatedTicket,
                $originalTicket,
            ) &&
                $this->comparator->compare(
                    $originalTicket['status'],
                    $conditionValue,
                    'not_equals',
                ),
            default => false,
        };
    }

    /**
     * @param array $originalTicket
     * @return bool
     */
    protected function statusChanged(Ticket $updatedTicket, $originalTicket)
    {
        return $originalTicket &&
            $this->comparator->compare(
                $updatedTicket->status,
                $originalTicket['status'],
                'not_equals',
            );
    }
}
