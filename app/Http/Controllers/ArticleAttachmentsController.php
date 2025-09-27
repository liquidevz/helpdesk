<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\FileEntry;
use Common\Core\BaseController;
use Common\Files\Response\DownloadFilesResponse;

class ArticleAttachmentsController extends BaseController
{
    public function download(Article $article, $hashes)
    {
        $this->authorize('show', $article);

        $hashes = explode(',', $hashes);
        $fileEntryIds = array_map(
            fn($hash) => app(FileEntry::class)->decodeHash($hash),
            $hashes,
        );

        $fileEntries = $article
            ->attachments()
            ->whereIn('file_entries.id', $fileEntryIds)
            ->get();

        if ($fileEntries->isEmpty()) {
            abort(404);
        }

        return app(DownloadFilesResponse::class)->create($fileEntries);
    }
}
