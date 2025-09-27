<?php namespace App\Models;

use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Trigger extends BaseModel
{
    const MODEL_TYPE = 'trigger';

    protected $guarded = ['id'];
    protected $appends = ['model_type'];

    protected $casts = [
        'id' => 'integer',
        'times_fired' => 'integer',
        'user_id' => 'integer',
    ];

    public function conditions(): BelongsToMany
    {
        return $this->belongsToMany(
            Condition::class,
            'trigger_condition',
        )->withPivot(['condition_value', 'match_type', 'operator_id']);
    }

    public function actions(): BelongsToMany
    {
        return $this->belongsToMany(Action::class, 'trigger_action')->withPivot(
            ['action_value'],
        );
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
