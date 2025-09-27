<?php namespace App\Http\Controllers;

use App\Models\PurchaseCode;
use App\Models\Tag;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TicketCategoriesController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $dataSource = new Datasource(
            Tag::where('type', 'category'),
            request()->all(),
        );

        $pagination = $dataSource->paginate();

        if (request('filterByPurchases')) {
            $pagination->setCollection(
                $this->filterCategoriesByUserPurchases(
                    $pagination->getCollection(),
                ),
            );
        }

        return $this->success(['pagination' => $pagination]);
    }

    public function store()
    {
        $this->authorize('store', Tag::class);

        $data = $this->validate(request(), [
            'name' => 'required|string|min:2|unique:tags',
            'display_name' => 'string|min:2',
            'categories' => 'nullable|array',
        ]);

        $tag = Tag::create([
            'name' => $data['name'],
            'display_name' => $data['display_name'] ?? $data['name'],
            'type' => 'category',
        ]);

        if (isset($data['categories'])) {
            $tag->categories()->sync($data['categories']);
        }

        return $this->success(['tag' => $tag]);
    }

    public function update(int $tagId)
    {
        $this->authorize('update', Tag::class);

        $data = $this->validate(request(), [
            'name' => "string|min:2|unique:tags,name,$tagId",
            'display_name' => 'string|min:2',
            'categories' => 'nullable|array',
        ]);

        $tag = Tag::findOrFail($tagId);

        $tag->fill([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
        ])->save();

        if (isset($data['categories'])) {
            $tag->categories()->sync($data['categories']);
        }

        return $this->success(['tag' => $tag]);
    }

    public function destroy(string $ids)
    {
        $tagIds = explode(',', $ids);
        $this->authorize('destroy', [Tag::class, $tagIds]);

        Tag::whereIn('id', $tagIds)->delete();
        DB::table('taggables')
            ->whereIn('tag_id', $tagIds)
            ->delete();

        return $this->success();
    }

    private function filterCategoriesByUserPurchases(Collection $tags)
    {
        $user = Auth::user();

        $requireCode =
            settings('envato.enable') &&
            settings('envato.require_purchase_code');

        if (!$requireCode || $user->isAgent()) {
            return $tags;
        }

        $latestCode = $user->purchase_codes->first();
        if (
            !$user->isAgent() &&
            (!$latestCode || $latestCode->updated_at->lt(now()->subMinutes(10)))
        ) {
            $user->syncPurchases();
        }

        $userPurchases = $user->purchase_codes->keyBy(
            fn(PurchaseCode $code) => slugify($code->item_name),
        );

        $filteredTags = $tags->filter(
            fn(Tag $tag) => $userPurchases->has(slugify($tag->name)),
        );

        if (settings('envato.active_support') && !$user->isAgent()) {
            $filteredTags = $filteredTags->map(function ($tag) use ($userPurchases) {
                $supportedUntil = $userPurchases->get(slugify($tag->name))
                    ->supported_until;
                $tag['support_expired'] = $supportedUntil
                    ? $supportedUntil->lt(now())
                    : true;
                return $tag;
            });
        }
        return $filteredTags->values();
    }
}
