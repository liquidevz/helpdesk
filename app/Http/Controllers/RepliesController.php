<?php namespace App\Http\Controllers;

use App\Events\TicketUpdated;
use App\Models\Reply;
use Common\Core\BaseController;

class RepliesController extends BaseController
{
    public function show(Reply $reply)
    {
        $this->authorize('show', $reply);

        $reply->load(['user', 'attachments', 'ticket']);

        return $this->success(['reply' => $reply]);
    }

    public function update(Reply $reply)
    {
        $this->authorize('update', $reply);

        $data = $this->validate(request(), [
            'body' => 'string|min:1',
            'attachments' => 'array|max:5|exists:file_entries,id',
        ]);

        if (isset($data['body'])) {
            $reply->body = $data['body'];
        }

        if (isset($data['attachments'])) {
            $reply->attachments()->sync($data['attachments']);
        }

        $reply->save();

        if ($reply->type !== Reply::DRAFT_TYPE) {
            event(new TicketUpdated($reply->ticket, $reply->ticket));
        }

        return $this->success(['reply' => $reply->load('attachments', 'user')]);
    }

    public function destroy(Reply $reply)
    {
        $this->authorize('destroy', $reply);

        $reply->attachments()->detach();
        $reply->delete();

        if ($reply->type !== Reply::DRAFT_TYPE) {
            event(new TicketUpdated($reply->ticket, $reply->ticket));
        }

        return $this->success();
    }
}
