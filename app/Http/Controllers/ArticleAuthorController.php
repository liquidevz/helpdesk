<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use Common\Auth\Actions\PaginateUsers;
use Common\Core\BaseController;

class ArticleAuthorController extends BaseController
{
    public function index()
    {
        $this->authorize('update', Article::class);

        $params = array_merge([
            request()->all(),
            [
                'permission' => 'articles.update',
                'perPage' => 10,
            ],
        ]);

        $users = (new PaginateUsers())
            ->execute($params)
            ->map(fn(User $user) => $user->toNormalizedArray());

        return $this->success(['results' => $users]);
    }

    public function show(int $userId)
    {
        $this->authorize('update', Article::class);

        return $this->success([
            'model' => User::findOrFail($userId)->toNormalizedArray(),
        ]);
    }
}
