<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    protected $guarded = ['id'];

    protected $casts = ['id' => 'integer'];

    public $timestamps  = false;

    const MODEL_TYPE = 'operator';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
