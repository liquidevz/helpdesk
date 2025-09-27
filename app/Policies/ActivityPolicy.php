<?php namespace App\Policies;

use App\Models\User;
use Common\Core\Policies\BasePolicy;

class ActivityPolicy extends BasePolicy
{
    public function index(User $user)
    {
        return $this->hasPermission($user, 'tickets.view');
    }

    public function store(User $user)
    {
        return true;
    }

    public function destroy(User $user)
    {
        return $this->hasPermission($user, 'tickets.delete');
    }
}
