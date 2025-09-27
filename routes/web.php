<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmailApiWebhookController;
use App\Http\Controllers\GmailWebhookController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\MailgunWebhookController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SearchTermController;

//SEARCH TERM LOGGING
Route::post('search-term', [SearchTermController::class, 'storeSearchSession']);

//TICKETS MAIL WEBHOOKS
Route::post('tickets/mail/incoming', [
    EmailApiWebhookController::class,
    'handleIncoming',
]);
Route::post('tickets/mail/incoming/mailgun', [
    MailgunWebhookController::class,
    'handleIncoming',
]);
Route::post('tickets/mail/failed/mailgun', [
    MailgunWebhookController::class,
    'handleFailed',
]);

Route::post('tickets/mail/incoming/gmail', [
    GmailWebhookController::class,
    'handle',
]);
Route::post('tickets/mail/failed', [
    EmailApiWebhookController::class,
    'handleFailed',
]);

//FRONT-END ROUTES THAT NEED TO BE PRE-RENDERED
Route::get('/', LandingPageController::class);
Route::get('hc', LandingPageController::class);
Route::get('hc/articles/{articleId}/{slug}', [ArticleController::class, 'show']);
Route::get('hc/articles/{categoryId}/{sectionId}/{articleId}/{slug}', [ArticleController::class, 'show']);
Route::get('hc/categories/{categoryId}/{sectionId}/{slug}', [CategoryController::class, 'show']);
Route::get('hc/categories/{categoryId}/{slug}', [CategoryController::class, 'show']);
Route::get('hc/search/{query}', [SearchController::class, 'articles']);

Route::fallback('\Common\Core\Controllers\HomeController@show');
