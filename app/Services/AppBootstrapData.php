<?php namespace App\Services;

use Common\Core\Bootstrap\BaseBootstrapData;

class AppBootstrapData extends BaseBootstrapData
{
    public function init(): self
    {
        parent::init();

        if (!$this->data['user']?->hasPermission('tickets.update')) {
            $this->data['settings']['notif']['subs']['integrated'] = false;
        }

        return $this;
    }
}
