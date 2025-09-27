<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'aborts_cycle' => 'integer',
        'updates_ticket' => 'integer',
        'input_config' => 'json',
        'action_id' => 'integer',
    ];

    public $timestamps = false;

    const MODEL_TYPE = 'action';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
