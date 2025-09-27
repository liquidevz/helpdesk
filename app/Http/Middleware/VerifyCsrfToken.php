<?php

namespace App\Http\Middleware;

use Common\Core\BaseVerifyCsrfToken;

class VerifyCsrfToken extends BaseVerifyCsrfToken
{
    protected $except = [
        'secure/broadcasting/auth',
        'tickets/mail/incoming',
        'tickets/mail/failed',
        'tickets/mail/incoming/mailgun',
        'tickets/mail/failed/mailgun',
        'tickets/mail/incoming/gmail',
        'search-term',
    ];
}
