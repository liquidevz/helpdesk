<?php namespace App\Http\Controllers;

use App\Data\ArticleLoader;
use App\Http\Requests\ModifyArticle;
use App\Jobs\IncrementArticleViews;
use App\Models\Article;
use App\Models\Category;
use App\Services\HelpCenter\CrupdateArticle;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Article::class);

        $with = explode(',', request('with', ''));
        $builder = in_array('body', $with)
            ? Article::query()
            : Article::compact();

        if (in_array('author', $with)) {
            $builder->with('author');
        }

        if (request('sectionId')) {
            $builder
                ->join(
                    'category_article',
                    'category_article.article_id',
                    '=',
                    'articles.id',
                )
                ->where('category_article.category_id', request('sectionId'));
        }

        if ($tags = request('tags')) {
            $builder->filterByTags($tags);
        }

        if ($draft = request('draft')) {
            $builder->where('draft', (int) $draft);
        }

        $datasource = new Datasource($builder, request()->except('with'));
        $datasource->order = false;

        //order
        $defaultOrder = explode(
            '|',
            request('defaultOrder') ??
                settings('articles.default_order', 'position|desc'),
        );
        $order = $datasource->getOrder($defaultOrder[0], $defaultOrder[1]);

        // order articles by the amount of 'was helpful' user
        // feedback they have in article_feedback table
        if ($order['col'] === 'was_helpful') {
            $builder->orderByFeedback($order['dir']);
        } elseif (Str::endsWith($order['col'], 'position')) {
            $builder->orderByPosition();
        }

        // do a regular order, by a column in main articles table
        else {
            $builder->orderBy($order['col'], $order['dir']);
        }

        $pagination = $datasource->paginate();

        $pagination->transform(function ($article) {
            $article['body'] = Str::limit(
                strip_tags(html_entity_decode($article['body'])),
                200,
            );
            return $article;
        });

        if (in_array('path', $with)) {
            $pagination->loadPath();
        }

        return $this->success([
            'pagination' => $pagination,
            'section' => request('sectionId')
                ? Category::with('parent')->find(request('sectionId'))
                : null,
        ]);
    }

    public function show()
    {
        $data = (new ArticleLoader())->loadData(request('loader'));

        $this->authorize('show', $data['article']);

        dispatch(
            new IncrementArticleViews(
                $data['article']->id,
                Auth::id(),
                now()->timestamp,
            ),
        );

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'article-page',
        ]);
    }

    public function update(Article $article, ModifyArticle $request)
    {
        $this->authorize('update', $article);

        $article = (new CrupdateArticle())->execute($request->all(), $article);

        return $this->success(['article' => $article]);
    }

    public function store(ModifyArticle $request)
    {
        $this->authorize('store', Article::class);

        $article = (new CrupdateArticle())->execute($request->all());

        return $this->success(['article' => $article], 201);
    }

    public function destroy(string $ids)
    {
        $ids = explode(',', $ids);
        $this->authorize('destroy', Article::class);

        //detach categories
        DB::table('category_article')
            ->whereIn('article_id', $ids)
            ->delete();

        //detach tags
        DB::table('taggables')
            ->whereIn('taggable_id', $ids)
            ->where('taggable_type', Article::MODEL_TYPE)
            ->delete();

        //delete articles
        Article::whereIn('id', $ids)->delete();

        return $this->success();
    }
}
