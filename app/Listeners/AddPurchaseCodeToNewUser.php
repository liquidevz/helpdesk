<?php

namespace App\Listeners;

use Common\Auth\Events\UserCreated;

class AddPurchaseCodeToNewUser
{
    public function handle(UserCreated $event): void
    {
        if (isset($event->data['envato_purchase_code'])) {
            $event->user->addPurchaseCode($event->data['envato_purchase_code']);
        }
    }
}
