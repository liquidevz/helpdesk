<?php

namespace App\Services\HelpCenter;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;

class CrupdateArticle
{
    public function execute(
        array $data,
        Article $originalArticle = null,
    ): Article {
        $article = $originalArticle ?: new Article();

        $this->saveInlineProps($article, $data);

        if (isset($data['sections'])) {
            $sections = Category::select(['id', 'parent_id'])
                ->whereNotNull('parent_id')
                ->whereIn('id', $data['sections'])
                ->get();
            $ids = $sections->pluck('id')->merge($sections->pluck('parent_id'));
            $article->sections()->sync($ids);
        }

        if (array_key_exists('attachments', $data)) {
            $article->attachments()->sync($data['attachments']);
        }

        if (array_key_exists('tags', $data)) {
            $tags = app(Tag::class)->insertOrRetrieve($data['tags']);
            $article->tags()->sync($tags->pluck('id'));
        }

        return $article;
    }

    protected function saveInlineProps(Article $article, array $data): void
    {
        $inlineProps = [
            'title',
            'body',
            'slug',
            'description',
            'draft',
            'author_id',
            'position',
            'visible_to_role',
            'managed_by_role',
        ];

        foreach ($inlineProps as $prop) {
            if (array_key_exists($prop, $data)) {
                $article->{$prop} = $data[$prop];
            }
        }

        if (!$article->title) {
            $article->title = __('Untitled');
        }

        $article->save();
    }
}
