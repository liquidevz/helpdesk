<?php

namespace App\Data;

use App\Models\Category;

class CategoryLoader
{
    public function loadData(?string $loader): array
    {
        if (!$loader) {
            $loader = 'categoryPage';
        }

        $categoryId =
            request()->route('sectionId') ?? request()->route('categoryId');
        $category = Category::findOrFail($categoryId);

        $data = ['category' => $category, 'loader' => $loader];

        if ($loader === 'categoryPage') {
            $data['categoryNav'] = (new ArticleLoader())->loadCategoryNav(
                $category->parent_id ?? $category->id,
            );

            $data['articles'] = $category
                ->articles()
                ->filterByVisibleToRole()
                ->limit(40)
                ->get()
                ->loadPath($category);

            if ($category->is_section) {
                $category->load('parent');
            }
        }

        return $data;
    }
}
