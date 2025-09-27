<?php

namespace App\Services\HelpCenter;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use ZipArchive;

class ExportHelpCenterImages
{
    public function execute(
        ZipArchive $zip = null,
        Article|null $article = null,
        string|null $prefix = null,
    ): Collection {
        $names = $this->getAllHelpCenterImages($article);

        if ($zip) {
            $names->each(function ($name) use ($zip, $prefix) {
                try {
                    $contents = Storage::disk('public')->get($name);
                    $path = $prefix ? "$prefix/images/$name" : "images/$name";
                    $zip->addFromString($path, $contents);
                } catch (FileNotFoundException) {
                    //
                }
            });
        }

        return $names;
    }

    private function getAllHelpCenterImages(
        Article|null $article = null,
    ): Collection {
        $names = collect();

        if ($article) {
            $articles = collect([$article]);
        } else {
            $articles = Article::get();
        }

        $articles
            ->filter(fn($article) => $article->body)
            ->each(function (Article $article) use ($names) {
                $crawler = new Crawler();
                $crawler->addHtmlContent($article->body);

                $crawler
                    ->filter('img')
                    ->each(function (Crawler $node) use ($names) {
                        if ($this->shouldIncludeImg($node->attr('src'))) {
                            $names->push(
                                explode('storage/', $node->attr('src'))[1],
                            );
                        }
                    });
            });

        // get category images also
        $categoryImages = Category::whereNotNull('image')
            ->pluck('image')
            ->filter(fn($path) => $this->shouldIncludeImg($path))
            ->map(fn($path) => str_replace('storage/', '', $path));
        return $names->concat($categoryImages);
    }

    protected function shouldIncludeImg(string $src): bool
    {
        $host = parse_url(config('app.url'))['host'];
        return Str::contains($src, $host) || Str::startsWith($src, 'storage');
    }
}
