<?php

namespace App\Services\Search;

use App\Models\Article;
use App\Models\Category;
use Common\Database\Datasource\Datasource;
use Common\Database\Datasource\DatasourceFilters;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SearchArticles
{
    public function execute(array $params): array
    {
        $categoryIds = Arr::get($params, 'categoryIds')
            ? Str::of(Arr::get($params, 'categoryIds'))
                ->explode(',')
                ->map(fn(string $cat) => (int) trim($cat))
            : null;
        $builder = Article::query()->filterByVisibleToRole();

        $filters = new DatasourceFilters(Arr::get($params, 'filters'));
        $filters->where('draft', '=', false);

        if ($categoryIds?->isNotEmpty()) {
            $filters->where('categories', 'has', $categoryIds);
        }

        // filter by user envato purchases
        if (
            settings('envato.filter_search') &&
            Auth::user() &&
            !Auth::user()->isAgent()
        ) {
            $itemNames = Auth::user()->purchase_codes->pluck('item_name');
            $catIds = Category::whereIn('name', $itemNames)->pluck('id');
            if ($catIds->isNotEmpty()) {
                $filters->where('categories', 'has', $catIds);
            }
        }

        $datasource = new Datasource(
            $builder,
            $params,
            $filters,
            config('scout.driver'),
        );

        $pagination = $datasource->paginate();
        $pagination->loadPath($categoryIds?->first());

        $pagination->through(function (Article $article) {
            return $article->only([
                'id',
                'title',
                'slug',
                'updated_at',
                'path',
            ]);
        });

        return [
            'pagination' => $pagination,
            'query' => Arr::get($params, 'query'),
            'categoryIds' => $categoryIds,
            'loader' => 'searchArticles',
        ];
    }
}
