<?php namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;

class CategoryOrderController extends BaseController
{
    public function __invoke()
    {
        $this->authorize('update', Article::class);

        $data = $this->validate(request(), [
            'parentId' => 'integer|nullable',
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer',
        ]);

        $queryPart = '';
        foreach ($data['ids'] as $position => $id) {
            $position++;
            $queryPart .= " when id=$id then $position";
        }

        Category::where('parent_id', $data['parentId'] ?? null)->update([
            'position' => DB::raw("(case $queryPart end)"),
        ]);

        return $this->success();
    }
}
