<?php namespace App\Services\Triggers\Conditions;

use App\Models\Ticket;

abstract class BaseCondition
{
    public function __construct(protected PrimitiveValuesComparator $comparator)
    {
    }

    abstract public function isMet(
        Ticket $updatedTicket,
        array|null $originalTicket,
        string $operatorName,
        mixed $conditionValue,
    ): bool;
}
