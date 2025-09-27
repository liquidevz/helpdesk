<?php namespace App\Http\Controllers;

use App\Data\CategoryLoader;
use App\Http\Requests\ModifyCategories;
use App\Models\Article;
use App\Models\Category;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CategoryController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Article::class);

        $params = request()->all();
        $params['order'] = 'position|asc';
        $builder = Category::when(
            request('compact'),
            fn($q) => $q->compact(),
        )->withCount('articles');

        if (request('parentId')) {
            $builder->where('parent_id', request('parentId'));
        } elseif (request('type') === 'category') {
            $builder->whereNull('parent_id');
            $builder->withCount('sections');
        } elseif (request('type') === 'section') {
            $builder->whereNotNull('parent_id');
        }

        foreach (explode(',', request('load', '')) as $load) {
            if ($load === 'sections') {
                $builder->with(['sections' => fn($query) => $query->compact()]);
            }
        }

        $datasource = new Datasource($builder, $params);

        return $this->success([
            'pagination' => $datasource->paginate(),
            'category' => request('parentId')
                ? Category::find(request('parentId'))
                : null,
        ]);
    }

    public function show()
    {
        $data = (new CategoryLoader())->loadData(request('loader'));
        $this->authorize('show', $data['category']);

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'category-page',
        ]);
    }

    public function store(ModifyCategories $request)
    {
        $this->authorize('store', Article::class);

        $last = Category::orderBy('position', 'desc')->first();

        $category = Category::create([
            'name' => request('name'),
            'description' => request('description'),
            'image' => request('image', null),
            'parent_id' => request('parent_id', null),
            'position' => $last ? $last->position + 1 : 1,
            'managed_by_role' => request('managed_by_role', null),
            'visible_to_role' => request('visible_to_role', null),
        ]);

        return $this->success(['category' => $category]);
    }

    public function update(int $id, ModifyCategories $request)
    {
        $this->authorize('update', Article::class);

        $category = Category::findOrFail($id);

        $category->fill(request()->all())->save();

        return $this->success(['category' => $category]);
    }

    public function destroy(int $id)
    {
        $this->authorize('destroy', Article::class);

        $category = Category::findOrFail($id);

        $category
            ->where('parent_id', $category->id)
            ->update(['parent_id' => null]);

        $category->articles()->detach();

        $category->delete();

        return $this->success();
    }

    public function sidenavContent(int $categoryId)
    {
        $this->authorize('index', Article::class);

        $categories = Category::where('parent_id', $categoryId)
            ->orderByPosition()
            ->with([
                'articles' => function (BelongsToMany $query) {
                    $query->select('id', 'title', 'position', 'slug');
                },
            ])
            ->limit(10)
            ->get();

        return $this->success(['sections' => $categories]);
    }
}
