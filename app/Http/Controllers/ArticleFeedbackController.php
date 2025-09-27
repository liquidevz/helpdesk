<?php namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleFeedback;
use Common\Core\BaseController;

class ArticleFeedbackController extends BaseController
{
    public function store(Article $article)
    {
        $this->authorize('show', $article);

        $data = $this->validate(request(), [
            'wasHelpful' => 'required|boolean',
            'comment' => 'string|min:1|max:1000',
        ]);

        $ip = getIp();
        $userId = request()->user()?->id;

        // if we are not able to resolve user ip and user is not logged in, bail
        if (!$userId && !$ip) {
            $this->error();
        }

        // if we have user_id, search for existing feedback by user_id
        if ($userId) {
            $feedback = $article
                ->feedback()
                ->where('user_id', $userId)
                ->first();
        }

        // if we didn't find feedback by user_id and have client IP, search for existing feedback by client IP
        if (!isset($feedback) && $ip) {
            $feedback = $article
                ->feedback()
                ->where('ip', $ip)
                ->first();
        }

        if (!$feedback) {
            $feedback = new ArticleFeedback();
        }

        $feedback
            ->fill([
                'article_id' => $article->id,
                'comment' => $data['comment'] ?? null,
                'was_helpful' => $data['wasHelpful'],
                'ip' => $ip,
                'user_id' => $userId,
            ])
            ->save();

        return $this->success();
    }
}
