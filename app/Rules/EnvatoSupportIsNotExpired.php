<?php

namespace App\Rules;

use App\Models\PurchaseCode;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class EnvatoSupportIsNotExpired implements Rule
{
    public function passes($attribute, $value): bool
    {
        if (settings('envato.active_support')) {
            $category = Tag::where('type', 'category')->find($value);
            $matchedCode = Auth::user()->purchase_codes->first(
                fn(PurchaseCode $purchaseCode) => str_contains(
                    slugify($purchaseCode['item_name']),
                    slugify($category->name),
                ),
            );
            return $matchedCode && !$this->supportExpired($matchedCode);
        } else {
            return true;
        }
    }

    public function message(): string
    {
        return __(
            'Your support period for this item has expired. Please renew support on envato to create new tickets.',
        );
    }

    protected function supportExpired(PurchaseCode $code)
    {
        if (!$code->supported_until) {
            return false;
        }
        $supportedUntil = is_string($code->supported_until)
            ? Carbon::parse($code->supported_until)
            : $code->supported_until;
        return $supportedUntil->lessThan(Carbon::now());
    }
}
