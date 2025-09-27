<?php namespace App\Services\Files;

use App\Models\Reply;
use App\Services\Mail\Parsing\ParsedEmail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class EmailStore
{
    public function storeEmail(
        ParsedEmail $parsedEmail,
        Reply $reply = null,
    ): void {
        //if email was matched to existing ticket, we will use reply UUID
        //as file name, so we can later match it to corresponding reply
        if ($reply) {
            $path = $this->makeMatchedEmailPath($reply);

            //otherwise we will store email into "unmatched" directory
        } else {
            $path = $this->makeUnmatchedEmailPath();
        }

        file_put_contents($path, $parsedEmail->toJson());
    }

    public function getEmailForReply(Reply $reply): ?array
    {
        $path = $this->makeMatchedEmailPath($reply);

        if (!file_exists($path)) {
            return null;
        }

        return json_decode(file_get_contents($path), true);
    }

    public function download(Reply $reply)
    {
        $path = $this->makeMatchedEmailPath($reply);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->download($path);
    }

    private function makeMatchedEmailPath(Reply $reply): string
    {
        $date = $reply->created_at;
        $dir = storage_path(
            "app/emails/matched/{$date->year}/{$date->month}/{$date->day}",
        );
        File::ensureDirectoryExists($dir);
        return "$dir/$reply->uuid.json";
    }

    private function makeUnmatchedEmailPath(): string
    {
        $date = now();
        $name = "{$date->hour}:{$date->minute}" . Str::random(30);
        $dir = storage_path(
            "app/emails/unmatched/{$date->year}/{$date->month}/{$date->day}",
        );
        File::ensureDirectoryExists($dir);
        return "$dir/{$name}.json";
    }
}
