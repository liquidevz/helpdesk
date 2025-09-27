<?php namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Ticket;
use App\Models\User;
use App\Services\Search\SearchArticles;
use App\Services\Search\SearchTickets;
use App\Services\Search\SearchUsers;
use Arr;
use Common\Core\BaseController;

class SearchController extends BaseController
{
    public function all()
    {
        $params = request()->all();
        $results = [
            'tickets' => app(SearchTickets::class)->execute($params),
            'users' => app(SearchUsers::class)->execute(
                Arr::except($params, 'filters'),
            ),
            'articles' => app(SearchArticles::class)->execute(
                Arr::except($params, 'filters'),
            ),
        ];

        return $this->success(['results' => $results]);
    }

    public function articles()
    {
        $this->authorize('index', Article::class);

        $params = request()->all();
        if (!isset($params['query'])) {
            $params['query'] = request()->route('query');
        }

        $data = (new SearchArticles())->execute($params);

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'search-page',
        ]);
    }

    public function users()
    {
        $this->authorize('index', User::class);

        $pagination = (new SearchUsers())->execute(request()->all());

        return $this->success([
            'pagination' => $pagination,
        ]);
    }

    public function tickets()
    {
        $this->authorize('index', Ticket::class);

        $pagination = (new SearchTickets())->execute(request()->all());

        return $this->success(['pagination' => $pagination]);
    }
}
