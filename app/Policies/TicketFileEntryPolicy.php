<?php

namespace App\Policies;

use App\Models\Reply;
use App\Models\User;
use Common\Core\Policies\FileEntryPolicy;
use Common\Files\FileEntry;
use Illuminate\Support\Facades\DB;

class TicketFileEntryPolicy extends FileEntryPolicy
{
    public function show(
        ?User $user,
        FileEntry $entry,
        Reply $reply = null,
    ): bool {
        if ($this->hasPermissionViaTicket($user, $entry)) {
            return true;
        }

        return parent::show($user, $entry);
    }

    public function download(?User $user, $entries, Reply $reply = null): bool
    {
        if ($this->hasPermissionViaTicket($user, $entries[0])) {
            return true;
        }

        return parent::download($user, $entries);
    }

    private function hasPermissionViaTicket(?User $user, FileEntry $entry): bool
    {
        if (request('ticketEntry')) {
            $fileEntryModel = DB::table('file_entry_models')
                ->where('file_entry_id', $entry->id)
                ->where('model_type', Reply::MODEL_TYPE)
                ->first();

            if (!is_null($fileEntryModel)) {
                $reply = Reply::with('ticket')->find($fileEntryModel->model_id);
                if ($reply->ticket->user_id === $user->id) {
                    return true;
                }
            }
        }
        return false;
    }

    private function getReplyForRequest(Reply $reply = null)
    {
        if ($reply) {
            return $reply;
        }

        if ($this->request->filled('replyId')) {
            return Reply::findOrFail($this->request->get('shareable_link'));
        }

        return null;
    }
}
