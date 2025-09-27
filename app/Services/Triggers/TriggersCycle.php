<?php namespace App\Services\Triggers;

use App\Models\Operator;
use App\Models\Ticket;
use App\Models\Trigger;
use App\Services\Triggers\Actions\Actions;
use App\Services\Triggers\Conditions\Conditions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class TriggersCycle
{
    private array $alreadyFiredTriggers = [];

    private int $timesLooped = 0;

    private int $triggersFired = 0;

    public function __construct(
        private Actions $actions,
        private Conditions $conditions,
    ) {
    }

    public function runAgainstTicket(
        Ticket $updatedTicket,
        ?array $originalTicket = null,
        ?Collection $triggers = null,
    ): array {
        $triggers ??= $this->loadAllTriggers();

        $this->runCycle($triggers, $updatedTicket, $originalTicket);

        $response = [
            'timesFired' => $this->triggersFired,
            'timesLooped' => $this->timesLooped,
        ];

        $this->alreadyFiredTriggers = [];
        $this->timesLooped = 0;
        $this->triggersFired = 0;

        return $response;
    }

    public function executeTimeBasedTriggers(): void
    {
        $triggers = $this->loadAllTriggers()->filter(
            fn(Trigger $trigger) => $trigger->conditions->some(
                'time_based',
                '=',
                true,
            ),
        );

        Ticket::with('latest_reply')
            ->whereDoesntHave('tags', function (Builder $builder) {
                $builder->where('tags.name', 'locked');
            })
            ->eachById(function (Ticket $ticket) use ($triggers) {
                $this->runAgainstTicket($ticket, null, $triggers);
            }, 500);
    }

    /**
     * Triggers cycle will run every trigger against a ticket.
     * If trigger fires and "trigger action" updates ticket, the cycle will run again
     * skipping triggers that were already checked (regardless of them actually firing)
     */
    private function runCycle(
        Collection $triggers,
        Ticket $updatedTicket,
        ?array $originalTicket = null,
    ): void {
        foreach ($triggers as $trigger) {
            $this->timesLooped++;

            if (
                $this->triggerShouldFire(
                    $trigger,
                    $updatedTicket,
                    $originalTicket,
                )
            ) {
                $result = $this->fireTrigger($trigger, $updatedTicket);

                if ($result['command'] === 'abort') {
                    break;
                } elseif ($result['command'] === 'continue') {
                    continue;
                } elseif ($result['command'] === 'restart') {
                    $this->runCycle(
                        $triggers,
                        $result['ticket'],
                        $originalTicket,
                    );
                    break;
                }
            }
        }
    }

    private function fireTrigger(Trigger $trigger, Ticket $updatedTicket): array
    {
        $trigger->increment('times_fired');

        $updatedTicket = $this->actions->execute($updatedTicket, $trigger);

        //mark this trigger as already 'fired' so we don't fire same triggers twice
        $this->alreadyFiredTriggers[] = $trigger->id;

        //if one of this trigger's actions updates ticket or
        //one of its relationships, we need to run all triggers
        //against updated ticket again, except triggers that already fired
        if ($this->actions->updatesTicket($trigger->actions)) {
            $command = 'restart';
        }

        //if one of this trigger's actions aborts trigger
        //cycle (for example 'delete_ticket' action), bail
        if ($this->actions->abortsCycle($trigger->actions)) {
            $command = 'abort';
        }

        $this->triggersFired++;

        return [
            'command' => $command ?? 'continue',
            'ticket' => $updatedTicket,
        ];
    }

    /**
     * Determine if given trigger should fire based on specified arguments.
     */
    private function triggerShouldFire(
        Trigger $trigger,
        Ticket $updatedTicket,
        mixed $originalTicket,
    ): bool {
        //if this trigger has already been fired, continue to next trigger
        if (in_array($trigger->id, $this->alreadyFiredTriggers)) {
            return false;
        }

        return $this->conditions->areMet(
            $trigger,
            $updatedTicket,
            $originalTicket,
        );
    }

    protected function loadAllTriggers(): Collection
    {
        $triggers = Trigger::with('conditions', 'actions')->get();

        // attach selected operator to each condition
        $operatorsIds = $triggers->flatMap(
            fn($trigger) => $trigger->conditions->pluck('pivot.operator_id'),
        );
        $operators = Operator::whereIn('id', $operatorsIds)->get();

        foreach ($triggers as $trigger) {
            $trigger->conditions->each(function ($condition) use ($operators) {
                $condition->selected_operator = $operators->find(
                    $condition->pivot->operator_id,
                );
            });
        }

        return $triggers->values();
    }
}
