<?php namespace App\Http\Controllers;

use App\Models\Reply;
use App\Services\Files\EmailStore;
use Common\Core\BaseController;

class OriginalReplyEmailController extends BaseController
{
    public function show(Reply $reply)
    {
        $this->authorize('show', $reply);

        $original = (new EmailStore())->getEmailForReply($reply);

        return $this->success(['email' => $original]);
    }

    public function download(Reply $reply)
    {
        $this->authorize('show', $reply);

        return (new EmailStore())->download($reply);
    }
}
