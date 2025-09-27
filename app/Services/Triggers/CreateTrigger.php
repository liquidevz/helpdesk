<?php

namespace App\Services\Triggers;

use App\Models\Trigger;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CreateTrigger
{
    public function execute(array $data)
    {
        $trigger = Trigger::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'times_fired' => $data['times_fired'] ?? 0,
            'user_id' => Auth::id(),
        ]);

        $this->attachConditions($trigger, $data['conditions']);
        $this->attachActions($trigger, $data['actions']);

        return $trigger;
    }

    public function attachConditions(Trigger $trigger, array $conditions): void
    {
        $conditions = array_map(
            fn($data) => [
                'condition_value' => $data['value'],
                'match_type' => $data['match_type'],
                'operator_id' => $data['operator_id'],
                'condition_id' => $data['condition_id'],
                'trigger_id' => $trigger['id'],
            ],
            $conditions,
        );
        DB::table('trigger_condition')->insert(
            $this->removeIdenticalArrays($conditions),
        );
    }

    public function attachActions(Trigger $trigger, array $actions): void
    {
        $actions = array_map(
            fn($data) => [
                'action_id' => $data['action_id'],
                'action_value' => json_encode($data['action_value']),
                'trigger_id' => $trigger['id'],
            ],
            $actions,
        );
        DB::table('trigger_action')->insert(
            $this->removeIdenticalArrays($actions),
        );
    }

    protected function removeIdenticalArrays(array $array): array
    {
        return array_map(
            'unserialize',
            array_unique(array_map('serialize', $array)),
        );
    }
}
