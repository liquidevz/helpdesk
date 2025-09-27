<?php

namespace App\Models;

use Common\Auth\Roles\Role;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ArticleRole extends Role
{
    protected $table = 'roles';

    protected $appends = ['manage', 'view'];

    protected function manage(): Attribute
    {
        return Attribute::make(get: fn() => (bool) $this->pivot->manage);
    }

    protected function view(): Attribute
    {
        return Attribute::make(
            get: fn() => (bool) ($this->pivot->manage ?: $this->pivot->view),
        );
    }
}
