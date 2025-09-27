<?php

use App\Models\Article;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (Article::with('categories')->lazy(100) as $article) {
            foreach ($article->categories as $item) {
                if ($item->is_section && !$article->categories->find($item->parent_id)) {
                    $article->categories()->attach($item->parent_id);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
