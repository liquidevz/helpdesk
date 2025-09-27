<?php namespace App\Models;

use Common\Core\BaseModel;
use Common\Files\FileEntry;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;

class Reply extends BaseModel
{
    use Searchable;

    const DRAFT_TYPE = 'drafts';
    const REPLY_TYPE = 'replies';
    const NOTE_TYPE = 'notes';
    const MODEL_TYPE = 'reply';

    const SOURCE_EMAIL = 'email';
    const SOURCE_SITE = 'site';

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'ticket_id' => 'integer',
    ];

    protected $guarded = ['id'];
    protected $appends = ['model_type'];
    protected $hidden = ['uuid', 'email_id'];

    public function attachments(): BelongsToMany
    {
        return $this->morphToMany(
            FileEntry::class,
            'model',
            'file_entry_models',
        )->orderBy('file_entries.created_at', 'desc');
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCompact(Builder $q)
    {
        return $q->select(
            'id',
            'user_id',
            DB::raw('SUBSTRING(body, 1, 80) as body'),
        );
    }

    public function stripBody(int $length = 200): void
    {
        if ($this->exists) {
            $body = Str::limit(strip_tags($this->body, '<br>'), $length);
            $this->body = preg_replace('/<br\W*?>/', ' ', $body); // replace <br> with space
        }
    }

    public function bodyForEmail(): array|string|null
    {
        // prepend relative image urls for email body
        return preg_replace_callback(
            '/src="(storage\/ticket_images\/[^"]*\.\w+)"/i',
            fn($matches) => 'src="' . url($matches[1]) . '"',
            $this->body,
        );
    }

    public static function createForTicket(
        Ticket $ticket,
        array $data,
        string $type = self::REPLY_TYPE,
    ): Reply {
        $reply = self::create([
            'body' => $data['body'] ?? '',
            'user_id' => $data['user_id'] ?? Auth::id(),
            'ticket_id' => $ticket->id,
            'type' => $type,
            'uuid' => Str::random(30),
            'email_id' => $data['email_id'] ?? null,
        ]);

        if (!empty($data['attachments'])) {
            $reply->attachments()->attach($data['attachments']);
        }

        return $reply;
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'body' => strip_tags($this->body),
        ];
    }

    public static function filterableFields(): array
    {
        return ['id'];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => strip_tags($this->body),
        ];
    }
}
