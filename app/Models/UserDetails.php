<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model {

    const MODEL_TYPE = 'user_details';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['details', 'notes'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * User profile belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
