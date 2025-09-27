<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DemoHelpCenterSeeder extends Seeder
{
    private array $demoCategories;

    public function __construct(
        User $user,
        Category $category,
        Article $article,
        Filesystem $fs,
    ) {
        $this->demoCategories = json_decode(
            File::get(database_path('seeders/demo/demo-categories.json')),
            true,
        );
    }

    public function run(): void
    {
        DB::table('category_article')->truncate();
        DB::table('articles')->truncate();
        DB::table('categories')->truncate();

        $parents = $this->seedParentCategories();
        $children = $this->seedChildCategories($parents);
        $articleIds = $this->seedArticles();
        $this->attachArticlesToCategories($children, $parents, $articleIds);
    }

    private function seedParentCategories(): Collection
    {
        Category::insert(
            collect($this->demoCategories['parents'])
                ->map(
                    fn($name) => [
                        'name' => $name,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                )
                ->toArray(),
        );

        return Category::whereIn(
            'name',
            $this->demoCategories['parents'],
        )->get();
    }

    private function seedChildCategories(Collection $parents): Collection
    {
        $children = $parents
            ->map(function (Category $parent) {
                return collect($this->demoCategories['children'])->map(
                    fn($name) => [
                        'name' => $name,
                        'parent_id' => $parent->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            })
            ->flatten(1)
            ->toArray();

        Category::insert($children);

        return Category::whereIn(
            'name',
            $this->demoCategories['children'],
        )->get();
    }

    private function seedArticles(): Collection
    {
        $articleNames = collect($this->demoCategories['articles'])->flatten(1);

        $articles = $articleNames
            ->map(
                fn($name) => [
                    'title' => $name,
                    'body' => File::get(
                        database_path('seeders/demo/demo-article-body.txt'),
                    ),
                    'author_id' => User::findAdmin()->id,
                    'slug' => slugify($name),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            )
            ->toArray();

        Article::insert($articles);

        return Article::whereIn('title', $articleNames)
            ->get()
            ->pluck('id', 'title');
    }

    private function attachArticlesToCategories(
        Collection $children,
        Collection $parents,
        Collection $articleIds,
    ): void {
        $index = 0;
        $allPivots = [];

        foreach ($children as $key => $child) {
            $pivots = collect($this->demoCategories['articles'][$index])
                ->map(function ($articles) use ($child, $articleIds) {
                    return collect($articles)->map(
                        fn($name, $articleIndex) => [
                            'article_id' => $articleIds[$name],
                            'category_id' => $child->id,
                            'position' => $articleIndex,
                        ],
                    );
                })
                ->flatten(1)
                ->toArray();

            foreach ($pivots as $pivot) {
                $newPivot = [
                    'article_id' => $pivot['article_id'],
                    'category_id' => $child->parent_id,
                    'position' => $pivot['position'],
                ];
                $exists = Arr::first($allPivots, function ($p) use ($newPivot) {
                    return $p['article_id'] === $newPivot['article_id'] &&
                        $p['category_id'] === $newPivot['category_id'];
                });
                if ($exists) {
                    continue;
                }
                $pivots[] = $newPivot;
            }

            $allPivots = array_merge($allPivots, $pivots);

            $index++;

            //reset index to back to zero once it reaches 6
            //because there are only 5 6 article categories
            if ($index === 6) {
                $index = 0;
            }
        }

        DB::table('category_article')->insert($allPivots);
    }
}
