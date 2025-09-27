<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model {

    const MODEL_TYPE = 'email';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['address'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * User this email belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
