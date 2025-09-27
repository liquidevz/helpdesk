<?php namespace App\Http\Controllers;

use App\Models\User;
use Common\Core\BaseController;

class UserPurchasesController extends BaseController
{
    public function index(User $user)
    {
        $this->authorize('show', $user);

        return $this->success(['purchases' => $user->purchase_codes]);
    }
}
