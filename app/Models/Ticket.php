<?php namespace App\Models;

use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;

class Ticket extends BaseModel
{
    use Searchable;

    const MODEL_TYPE = 'ticket';

    protected $guarded = ['id', 'animated'];
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'assigned_to' => 'integer',
        'closed_at' => 'datetime',
    ];
    protected $appends = ['model_type'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->select([
            'id',
            'name',
            'display_name',
            'type',
        ]);
    }

    public function categories(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->where(
            'tags.type',
            'category',
        );
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class)->orderBy('created_at', 'desc');
    }

    public function repliesCount(): HasOne
    {
        return $this->hasOne(Reply::class)
            ->selectRaw('ticket_id, count(*) as aggregate')
            ->groupBy('ticket_id');
    }

    public function latest_replies(): HasMany
    {
        return $this->hasMany(Reply::class)
            ->where('type', Reply::REPLY_TYPE)
            ->orderBy('created_at', 'desc')
            ->limit(5);
    }

    public function latest_reply(): HasOne
    {
        return $this->hasOne(Reply::class)
            ->where('type', Reply::REPLY_TYPE)
            ->orderBy('created_at', 'desc');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Reply::class)
            ->orderBy('created_at', 'desc')
            ->where('type', Reply::NOTE_TYPE);
    }

    public function scopeOrderByStatus(Builder $query): Builder
    {
        $prefix = DB::getTablePrefix();
        return $query->orderByRaw(
            "FIELD(status, 'open', 'pending', 'closed', 'locked', 'spam') asc, {$prefix}tickets.updated_at desc",
        );
    }

    protected function scopeWhereTag(
        Builder $builder,
        string $tag,
        string $operator = '=',
    ): Builder {
        return $builder->whereHas('tags', function (Builder $tb) use (
            $tag,
            $operator,
        ) {
            $tb->where('name', $operator, $tag);
        });
    }

    public function getAttachmentsCountAttribute($value): int
    {
        if (is_numeric($value)) {
            return (int) $value;
        }

        return DB::table('file_entry_models')
            ->whereIn('model_id', function ($query) {
                /** @var $query Builder */
                return $query
                    ->from('replies')
                    ->where('replies.ticket_id', $this->id)
                    ->select('id');
            })
            ->where('model_type', Reply::class)
            ->count();
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'replies' => $this->replies->map(function (Reply $reply) {
                return $reply->toSearchableArray();
            }),
            'user' => $this->user ? $this->user->toSearchableArray() : null,
            'user_id' => $this->user ? $this->user->id : null,
            'status' => $this->status,
            'assigned_to' => $this->assigned_to,
            'closed_at' => $this->closed_at->timestamp ?? '_null',
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->subject,
        ];
    }

    protected function makeAllSearchableUsing($query)
    {
        return $query->with(['replies', 'user.purchase_codes', 'tags']);
    }

    public static function filterableFields(): array
    {
        return [
            'id',
            'created_at',
            'updated_at',
            'closed_at',
            'assigned_to',
            'user_id',
            'status',
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
