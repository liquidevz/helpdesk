<?php

namespace App\Services\Triggers;

use App\Models\Trigger;
use Illuminate\Support\Facades\DB;

class LoadTrigger
{
    public function execute(Trigger $trigger): Trigger
    {
        $conditions = DB::table('trigger_condition')
            ->where('trigger_id', $trigger->id)
            ->get()
            ->map(
                fn($pivot) => [
                    'id' => (int) $pivot->id,
                    'condition_id' => (int) $pivot->condition_id,
                    'operator_id' => (int) $pivot->operator_id,
                    'value' => $pivot->condition_value,
                    'match_type' => $pivot->match_type,
                ],
            );
        $trigger->setRelation('conditions', $conditions);

        $actions = DB::table('trigger_action')
            ->where('trigger_id', $trigger->id)
            ->get()
            ->map(
                fn($pivot) => [
                    'id' => (int) $pivot->id,
                    'action_id' => (int) $pivot->action_id,
                    'action_value' => $this->formatActionValue(
                        $pivot->action_value,
                    ),
                ],
            );
        $trigger->setRelation('actions', $actions);

        return $trigger;
    }

    protected function formatActionValue(string $actionValue): array
    {
        $actionValue = json_decode($actionValue, true);
        if (
            isset($actionValue['tags_to_add']) &&
            is_string($actionValue['tags_to_add'])
        ) {
            $actionValue['tags_to_add'] = explode(
                ',',
                $actionValue['tags_to_add'],
            );
        }
        if (
            isset($actionValue['tags_to_remove']) &&
            is_string($actionValue['tags_to_remove'])
        ) {
            $actionValue['tags_to_remove'] = explode(
                ',',
                $actionValue['tags_to_remove'],
            );
        }
        return $actionValue;
    }
}
