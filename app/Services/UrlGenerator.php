<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Category;
use App\Models\Ticket;
use Common\Core\Prerender\BaseUrlGenerator;
use Illuminate\Support\Arr;

class UrlGenerator extends BaseUrlGenerator
{
    public function ticket(Ticket|array $ticket): string
    {
        $tag = Arr::get($ticket, 'status') ?? 'open';
        return url("agent/tickets/{$ticket['id']}?tagId={$tag}");
    }

    public function article(array|Article $article): string
    {
        return url('hc/articles') .
            "/{$article['id']}/" .
            slugify($article['title']);
    }

    public function category(Category|array $category): string
    {
        return url('hc/categories') .
            "/{$category['id']}/" .
            slugify($category['name']);
    }

    public function search(string $query): string
    {
        return url("hc/search/$query");
    }
}
