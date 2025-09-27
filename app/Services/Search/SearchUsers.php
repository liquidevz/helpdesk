<?php

namespace App\Services\Search;

use App\Models\User;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;

class SearchUsers
{
    public function execute(array $params): AbstractPaginator
    {
        $datasource = new Datasource(
            User::query(),
            $params,
            null,
            config('scout.driver'),
        );

        $pagination = $datasource->paginate();
        $pagination->load('roles');
        return $pagination;
    }
}
