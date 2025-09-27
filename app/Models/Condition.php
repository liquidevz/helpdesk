<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'time_based' => 'boolean',
        'condition_id' => 'integer',
    ];

    public $timestamps = false;

    const MODEL_TYPE = 'condition';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    /**
     *  Operators that are attached to this condition.
     */
    public function operators()
    {
        return $this->belongsToMany(Operator::class);
    }

    /**
     * @param string $value
     * @return array
     */
    public function getInputConfigAttribute($value)
    {
        return json_decode($value);
    }
}
