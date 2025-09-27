<?php namespace App\Models;

use Common\Core\BaseModel;
use Common\Files\FileEntry;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CannedReply extends BaseModel
{
    const MODEL_TYPE = 'canned_reply';

    protected $guarded = ['id'];
    protected $appends = ['model_type'];
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'shared' => 'boolean',
    ];

    public function attachments(): BelongsToMany
    {
        return $this->morphToMany(
            FileEntry::class,
            'model',
            'file_entry_models',
        )->orderBy('created_at', 'desc');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'body' => $this->body,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
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

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
        ];
    }
}
