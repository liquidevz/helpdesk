<?php namespace App\Http\Controllers;

use App\Models\Category;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;

class ArticleOrderController extends BaseController
{
    public function __invoke(Category $category)
    {
        $this->authorize('update', $category);

        $data = $this->validate(request(), [
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer',
        ]);

        $queryPart = '';
        foreach ($data['ids'] as $position => $id) {
            $position++;
            $queryPart .= " when article_id=$id then $position";
        }

        DB::table('category_article')
            ->where('category_id', $category->id)
            ->update([
                'position' => DB::raw("(case $queryPart end)"),
            ]);

        return $this->success();
    }
}
