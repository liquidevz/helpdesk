<?php

namespace App\Jobs;

use App\Models\Activity;
use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Session;

class IncrementArticleViews implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $articleId, public ?int $authUserId, public int $timestamp)
    {
    }

    public function handle()
    {
        if (!$this->shouldIncrement()) {
            return;
        }

        Session::put("articleViews.$this->articleId", $this->timestamp);

        Article::where('id', $this->articleId)->increment('views');

        if ($this->authUserId) {
            Activity::articleViewed(
                $this->articleId,
                $this->authUserId,
                Carbon::createFromTimestamp($this->timestamp),
            );
        }
    }

    private function shouldIncrement(): bool
    {
        $views = Session::get('articleViews');

        // user has not viewed this article yet
        if (!$views || !isset($views[$this->articleId])) {
            return true;
        }

        // only log a view every 10 minutes from the same user
        $time = Carbon::createFromTimestamp($views[$this->articleId]);
        return Carbon::now()->diffInMinutes($time) > 10;
    }
}
