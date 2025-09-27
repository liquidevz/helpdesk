<?php namespace App\Policies;

use App\Models\User;
use Common\Core\Policies\BasePolicy;

class ReportPolicy extends BasePolicy
{
    public function index(User $user)
    {
        return $user->hasPermission('reports.view');
    }
}
