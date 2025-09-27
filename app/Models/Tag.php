<?php

namespace App\Models;

use Common\Files\FileEntry;
use Common\Tags\Tag as BaseTag;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends BaseTag
{
    public function tickets(): MorphToMany
    {
        return $this->morphedByMany(Ticket::class, 'taggable');
    }

    public function uploads(): MorphToMany
    {
        return $this->morphedByMany(FileEntry::class, 'taggable');
    }

    public function articles(): MorphToMany
    {
        return $this->morphedByMany(Article::class, 'taggable');
    }

    public function categories(): MorphToMany
    {
        return $this->morphedByMany(Category::class, 'taggable')->select([
            'id',
            'name',
        ]);
    }
}
