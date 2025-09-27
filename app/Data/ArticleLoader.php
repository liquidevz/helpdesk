<?php

namespace App\Data;

use App\Models\Article;
use App\Models\Category;
use App\Services\HelpCenter\ArticleCollection;
use App\Services\HelpCenter\GenerateArticleContentNav;
use Illuminate\Support\Collection;

class ArticleLoader
{
    public function loadData(?string $loader): array
    {
        if (!$loader) {
            $loader = 'articlePage';
        }

        // make sure it's a valid category id. It can be null or number, but not "null" as string
        $categoryId = request()->route('categoryId');
        if ($categoryId && !ctype_digit($categoryId)) {
            abort(404);
        }

        $articleId = request()->route('articleId');
        $article = Article::findOrFail($articleId);
        $article = (new ArticleCollection([$article]))
            ->loadPath(
                request()->route('categoryId'),
                request()->route('sectionId'),
            )
            ->first();

        if ($loader === 'articlePage') {
            return $this->loadArticlePage(
                $article,
                $article->path[0]['id'] ?? null,
            );
        }

        if ($loader === 'updateArticle') {
            return $this->loadArticleForUpdatePage($article);
        }

        return ['article' => $article, 'loader' => $loader];
    }

    protected function loadArticlePage(
        Article $article,
        int $categoryId = null,
    ): array {
        $article->load('attachments');

        $pageNav = (new GenerateArticleContentNav())->execute($article);

        // prefix help center urls with full path in article body
        if ($article->path->count() > 1) {
            $category = $article->path[0]['id'];
            $section = $article->path[1]['id'];

            $article->body = preg_replace(
                '/"hc\/articles\/([0-9]+)\/([a-z0-9\-]+)"/',
                "hc/articles/$category/$section/$1/$2",
                $article->body,
            );
        }

        return [
            'article' => $article,
            'categoryNav' => $categoryId
                ? $this->loadCategoryNav($categoryId)
                : collect([]),
            'pageNav' => $pageNav,
            'loader' => 'articlePage',
        ];
    }

    protected function loadArticleForUpdatePage(Article $article): array
    {
        return [
            'article' => $article->load([
                'sections.parent',
                'tags',
                'attachments',
                'author',
            ]),
            'loader' => 'updateArticle',
        ];
    }

    public function loadCategoryNav(int $categoryId): Collection
    {
        return Category::where('parent_id', $categoryId)
            ->filterByVisibleToRole()
            ->orderByPosition()
            ->with([
                'articles' => fn($q) => $q->filterByVisibleToRole(),
            ])
            ->limit(10)
            ->get();
    }
}
