<?php

namespace App\Models;

use Auth;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Activity extends Model
{
    protected $table = 'activity_log';

    const UPDATED_AT = null;
    const MODEL_TYPE = 'activity';

    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'properties' => 'array',
    ];

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    static function articleViewed(
        int $articleId,
        int $causerId,
        Carbon $createdAt,
    ): ?Activity {
        return static::log(
            Article::MODEL_TYPE,
            $articleId,
            'viewed',
            $causerId,
            [],
            $createdAt,
        );
    }

    static function ticketCreated(Ticket $ticket): ?Activity
    {
        return static::log(
            Ticket::MODEL_TYPE,
            $ticket->id,
            'created',
            $ticket->user_id,
            [],
            $ticket->created_at,
        );
    }

    static function articlesSuggested(
        Ticket $ticket,
        string $query,
        array $articleIds,
        ?CarbonInterface $createdAt,
    ): ?Activity {
        return static::log(
            Ticket::MODEL_TYPE,
            $ticket->id,
            'articlesSuggested',
            $ticket->user_id,
            [
                'articleIds' => $articleIds,
                'query' => $query,
            ],
            $createdAt,
        );
    }

    static function replyCreated(Reply $reply, string $source): ?Activity
    {
        return static::log(
            Ticket::MODEL_TYPE,
            $reply->ticket_id,
            'replied',
            $reply->user_Id,
            [
                'replyId' => $reply->id,
                'source' => $source,
            ],
        );
    }

    static function helpCenterSearched(
        int $searchTermId,
        ?int $causerId,
    ): ?Activity {
        return static::log(
            SearchTerm::MODEL_TYPE,
            $searchTermId,
            'searched',
            $causerId,
        );
    }

    private static function log(
        string $subjectType,
        int $subjectId,
        string $event,
        ?int $causerId,
        array $properties = null,
        ?CarbonInterface $createdAt = null,
    ): ?Activity {
        if (!settings('tickets.log_activity')) {
            return null;
        }
        $activity = (new static())->fill([
            'causer_id' => $causerId ?? Auth::id(),
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'event' => $event,
            'properties' => $properties,
            'created_at' => $createdAt ?? now(),
        ]);
        $activity->save();
        return $activity;
    }
}
