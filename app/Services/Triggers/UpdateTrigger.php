<?php

namespace App\Services\Triggers;

use App\Models\Trigger;
use Illuminate\Support\Facades\DB;

class UpdateTrigger
{
    public function execute(Trigger $trigger, array $data): Trigger
    {
        $trigger->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        $this->handleConditions($trigger, $data);
        $this->handleActions($trigger, $data);

        return $trigger;
    }

    protected function handleConditions(Trigger $trigger, array $data): void
    {
        $createTrigger = new CreateTrigger();
        [$existingConditions, $newConditions] = collect(
            $data['conditions'],
        )->partition(fn($condition) => isset($condition['id']));

        // detach conditions that are not in the new conditions array
        DB::table('trigger_condition')
            ->where('trigger_id', $trigger->id)
            ->whereNotIn('id', $existingConditions->pluck('id'))
            ->delete();

        // attach new conditions
        if ($newConditions->isNotEmpty()) {
            $createTrigger->attachConditions(
                $trigger,
                $newConditions->toArray(),
            );
        }

        // update existing conditions
        foreach ($existingConditions as $condition) {
            DB::table('trigger_condition')
                ->where('id', $condition['id'])
                ->update([
                    'condition_value' => $condition['value'],
                    'match_type' => $condition['match_type'],
                    'operator_id' => $condition['operator_id'],
                    'condition_id' => $condition['condition_id'],
                ]);
        }
    }

    protected function handleActions(Trigger $trigger, array $data): void
    {
        $createTrigger = new CreateTrigger();
        [$existingActions, $newActions] = collect($data['actions'])->partition(
            fn($action) => isset($action['id']),
        );

        // detach actions that are not in the new actions array
        DB::table('trigger_action')
            ->where('trigger_id', $trigger->id)
            ->whereNotIn('id', $existingActions->pluck('id'))
            ->delete();

        // attach new actions
        if ($newActions->isNotEmpty()) {
            $createTrigger->attachActions($trigger, $newActions->toArray());
        }

        // update existing actions
        foreach ($existingActions as $action) {
            DB::table('trigger_action')
                ->where('id', $action['id'])
                ->update([
                    'action_id' => $action['action_id'],
                    'action_value' => json_encode($action['action_value']),
                ]);
        }
    }
}
