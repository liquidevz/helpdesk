<?php namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use App\Services\Envato\EnvatoApiClient;
use Common\Core\BaseController;
use Illuminate\Http\JsonResponse;

class EnvatoController extends BaseController
{
    public function validateCode()
    {
        $code = request('purchase_code');

        if ($purchase = (new EnvatoApiClient())->getPurchaseByCode($code)) {
            return $this->success([
                'valid' => !!$purchase,
                'code' => $purchase,
            ]);
        } else {
            return $this->error(__('This purchase code is not valid.'));
        }
    }

    public function addPurchaseUsingCode(User $user): JsonResponse
    {
        $this->authorize('update', $user);

        $data = $this->validate(request(), [
            'purchaseCode' => 'required|string',
        ]);

        $envatoPurchase = (new EnvatoApiClient())->getPurchaseByCode(
            $data['purchaseCode'],
        );

        if (!$envatoPurchase) {
            return $this->error(__('There was an issue'), [
                'purchaseCode' => __('Could not find purchase with this code.'),
            ]);
        }

        $purchase = $user->addPurchaseCode($envatoPurchase['code']);

        return $this->success(['purchase' => $purchase]);
    }

    public function syncPurchases(User $user)
    {
        $this->authorize('update', $user);

        $user->syncPurchases();

        return $this->success(['purchases' => $user->purchase_codes]);
    }

    public function importItems()
    {
        $names = (new EnvatoApiClient())->importAuthorItems();

        $items = collect($names)->map(function ($name) {
            $tag = Tag::firstOrNew(['name' => slugify($name)]);
            $tag->fill([
                'type' => 'category',
                'display_name' => $name,
            ])->save();
            return $tag;
        });

        return $this->success(['items' => $items]);
    }
}
