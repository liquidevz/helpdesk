<?php

namespace App\Models;

use Common\Files\FileEntry as CommonFileEntry;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class FileEntry extends CommonFileEntry
{
    public function replies(): MorphToMany
    {
        return $this->morphedByMany(Reply::class, 'model', 'file_entry_models');
    }

    public function canned_replies(): BelongsToMany
    {
        return $this->morphedByMany(
            CannedReply::class,
            'model',
            'file_entry_models',
        );
    }
}
