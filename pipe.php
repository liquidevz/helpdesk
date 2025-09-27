#!/usr/bin/php -q
<?php

use App\Services\Mail\Parsing\ParsedEmail;
use App\Services\Mail\TransformEmailIntoTicketOrReply;
use App\Services\Mail\Transformers\MimeMailTransformer;

if (version_compare(PHP_VERSION, '8.1') === -1) {
    throw new Exception('You need at least PHP 8.1 in order for email piping to work.');
}

ini_set('memory_limit', '256M'); //The concern here is having enough mem for emails with attachments.

if (!defined('STDIN')) {
    define('STDIN', fopen('php://stdin', 'r'));
}

$content = '';
while ($f = fgets(STDIN)) {
    $content .= $f;
}

define('PATH_INSTALL', str_replace('\\', '/', dirname(__FILE__)));

$autoloadFile = PATH_INSTALL . '/vendor/autoload.php';
if (!file_exists($autoloadFile)) {
    throw new Exception('Unable to find autoloader: ~/vendor/autoload.php');
}
require $autoloadFile;

$appFile = PATH_INSTALL . '/bootstrap/app.php';
if (!file_exists($appFile)) {
    throw new Exception('Unable to find app loader: ~/bootstrap/app.php');
}
$app = require_once $appFile;
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

if (settings('incoming_email.pipe.enabled')) {
    $emailData = (new MimeMailTransformer())->transform($content);
    (new TransformEmailIntoTicketOrReply(
        new ParsedEmail($emailData),
    ))->execute();
}


?>
