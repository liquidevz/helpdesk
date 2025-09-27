<?php namespace App\Models;

use App\Services\Envato\EnvatoApiClient;
use Common\Auth\BaseUser;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Sanctum\HasApiTokens;

class User extends BaseUser
{
    use HasApiTokens;

    protected bool $billingEnabled = false;

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class)->orderBy('created_at', 'desc');
    }

    public function details(): HasOne
    {
        return $this->hasOne(UserDetails::class);
    }

    public function secondary_emails(): HasMany
    {
        return $this->hasMany(Email::class);
    }

    public function purchase_codes(): HasMany
    {
        return $this->hasMany(PurchaseCode::class)->orderBy(
            'created_at',
            'desc',
        );
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class);
    }

    public function cannedReplies(): HasMany
    {
        return $this->hasMany(CannedReply::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function activityLog(): HasMany
    {
        return $this->hasMany(Activity::class, 'causer_id');
    }

    public function syncPurchases(): void
    {
        $purchases = (new EnvatoApiClient())->getBuyerPurchases($this->id);
        if ($purchases && !$purchases->isEmpty()) {
            $this->purchase_codes()
                ->whereNotIn('code', $purchases->pluck('code'))
                ->delete();
            foreach ($purchases as $purchase) {
                $this->purchase_codes()->updateOrCreate(
                    ['code' => $purchase['code']],
                    $purchase,
                );
            }
            $this->load('purchase_codes');
        }
    }

    public function addPurchaseCode(string $code): PurchaseCode|null
    {
        $envatoPurchase = (new EnvatoApiClient())->getPurchaseByCode($code);

        if ($envatoPurchase) {
            return $this->purchase_codes()->updateOrCreate(
                ['code' => $envatoPurchase['code']],
                $envatoPurchase,
            );
        }

        return null;
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasPermission('superAdmin') ||
            $this->hasPermission('admin');
    }

    public function isAgent(): bool
    {
        return $this->isSuperAdmin() ||
            $this->belongsToRole('agents') ||
            $this->hasPermission('tickets.update');
    }

    public function belongsToRole(string $name): bool
    {
        return $this->roles->contains('name', $name);
    }

    protected function makeAllSearchableUsing($query)
    {
        return $query->with(['purchase_codes']);
    }

    public function toSearchableArray(): array
    {
        $data = parent::toSearchableArray();
        $data['purchase_codes'] = $this->purchase_codes->pluck(
            'envato_username',
        );
        return $data;
    }
}
