<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ArticleAttachmentsController;
use App\Http\Controllers\ArticleAuthorController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleFeedbackController;
use App\Http\Controllers\ArticleOrderController;
use App\Http\Controllers\CannedRepliesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryOrderController;
use App\Http\Controllers\EmailApiWebhookController;
use App\Http\Controllers\EnvatoController;
use App\Http\Controllers\HelpCenterActionsController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\MergeUsersController;
use App\Http\Controllers\OriginalReplyEmailController;
use App\Http\Controllers\RepliesController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TicketAssigneeController;
use App\Http\Controllers\TicketCategoriesController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketRepliesController;
use App\Http\Controllers\TicketsMergeController;
use App\Http\Controllers\TicketStatusController;
use App\Http\Controllers\TicketTagsController;
use App\Http\Controllers\TriggerController;
use App\Http\Controllers\UserDetailsController;
use App\Http\Controllers\UserPurchasesController;
use Common\Notifications\NotificationSubscriptionsController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function() {
    Route::group(['middleware' => ['optionalAuth:sanctum', 'verified', 'verifyApiAccess']], function () {
        //TICKETS
        Route::get('tickets', [TicketController::class, 'index']);
        Route::get('tickets/{tagId}/next-active-ticket', [TicketController::class, 'nextActiveTicket']);
        Route::post('tickets', [TicketController::class, 'store']);
        Route::put('tickets/{id}', [TicketController::class, 'update']);
        Route::post('tickets/merge', [TicketsMergeController::class, 'merge']);
        Route::get('tickets/{ticket}', [TicketController::class, 'show']);
        Route::delete('tickets/{ids}', [TicketController::class, 'destroy']);
        Route::get('tickets/{ticket}/replies', [TicketRepliesController::class, 'index']);
        Route::post('tickets/{ticket}/{type}', [TicketRepliesController::class, 'store'])->where('type', 'drafts|replies|notes');
        Route::post('tickets/assign', [TicketAssigneeController::class, 'change']);
        Route::post('tickets/status/change', [TicketStatusController::class, 'change']);
        Route::post('tickets/tags/add', [TicketTagsController::class, 'add']);
        Route::post('tickets/tags/remove', [TicketTagsController::class, 'remove']);

        //REPLIES
        Route::get('replies/{reply}', [RepliesController::class, 'show']);
        Route::get('replies/{reply}/original', [OriginalReplyEmailController::class, 'show']);
        Route::get('replies/{reply}/original/download', [OriginalReplyEmailController::class, 'download']);
        Route::put('replies/{reply}', [RepliesController::class, 'update']);
        Route::delete('replies/{reply}', [RepliesController::class, 'destroy']);

        //USERS
        Route::get('users/{user}/purchases', [UserPurchasesController::class, 'index']);
        Route::put('users/{id}/details', [UserDetailsController::class, 'update']);
        Route::post('merge-users', MergeUsersController::class);

        //SEARCH
        Route::get('search/all', [SearchController::class, 'all']);
        Route::get('search/users', [SearchController::class, 'users']);
        Route::get('search/tickets', [SearchController::class, 'tickets']);
        Route::get('search/articles', [SearchController::class, 'articles']);

        //TAGS
        Route::get('tags/agent-mailbox', [TagController::class, 'tagsForAgentMailbox']);

        //TICKET CATEGORIES
        Route::get('ticket-categories', [TicketCategoriesController::class, 'index']);
        Route::post('ticket-categories', [TicketCategoriesController::class, 'store']);
        Route::put('ticket-categories/{tagId}', [TicketCategoriesController::class, 'update']);
        Route::delete('ticket-categories/{tagIds}', [TicketCategoriesController::class, 'destroy']);

        //REPORTS
        Route::get('reports/tickets', [ReportsController::class, 'tickets']);
        Route::get('reports/envato', [ReportsController::class, 'envato']);
        Route::get('reports/search', [ReportsController::class, 'search']);
        Route::get('reports/popular-articles', [ReportsController::class, 'popularArticles']);

        //CANNED REPLIES
        Route::get('canned-replies', [CannedRepliesController::class, 'index']);
        Route::post('canned-replies', [CannedRepliesController::class, 'store']);
        Route::put('canned-replies/{id}', [CannedRepliesController::class, 'update']);
        Route::delete('canned-replies/{id}', [CannedRepliesController::class, 'destroy']);

        //HELP CENTER
        Route::get('hc', LandingPageController::class);

        //HELP CENTER CATEGORIES
        Route::get('hc/sidenav/{categoryId}', [CategoryController::class, 'sidenavContent']);
        Route::get('hc/categories', [CategoryController::class, 'index']);
        Route::get('hc/categories/{categoryId}', [CategoryController::class, 'show']);
        Route::post('hc/categories', [CategoryController::class, 'store']);
        Route::post('hc/categories/reorder', CategoryOrderController::class);
        Route::post('hc/categories/{category}/articles/reorder', ArticleOrderController::class);
        Route::put('hc/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('hc/categories/{id}', [CategoryController::class, 'destroy']);

        //HELP CENTER ARTICLES
        Route::get('hc/articles/{categoryId}/{sectionId}/{articleId}', [ArticleController::class, 'show']);
        Route::get('hc/articles/{articleId}', [ArticleController::class, 'show']);
        Route::get('hc/articles/{article}/download/{hashes}', [ArticleAttachmentsController::class, 'download']);
        Route::get('hc/articles', [ArticleController::class, 'index']);
        Route::post('hc/articles', [ArticleController::class, 'store']);
        Route::put('hc/articles/{article}', [ArticleController::class, 'update']);
        Route::post('hc/articles/{article}/feedback', [ArticleFeedbackController::class, 'store']);
        Route::delete('hc/articles/{id}', [ArticleController::class, 'destroy']);

        //AUTOCOMPLETE
        Route::get('autocomplete/article-authors', [ArticleAuthorController::class, 'index']);
        Route::get('autocomplete/article-authors/{userId}', [ArticleAuthorController::class, 'show']);

        //TRIGGERS
        Route::get('triggers', [TriggerController::class, 'index']);
        Route::get('triggers/config', [TriggerController::class, 'config']);
        Route::get('triggers/{trigger}', [TriggerController::class, 'show']);
        Route::post('triggers', [TriggerController::class, 'store']);
        Route::put('triggers/{trigger}', [TriggerController::class, 'update']);
        Route::delete('triggers/{ids}', [TriggerController::class, 'destroy']);

        //ENVATO
        Route::get('envato/validate-purchase-code', [EnvatoController::class, 'validateCode']);
        Route::post('envato/items/import', [EnvatoController::class, 'importItems']);
        Route::post('users/{user}/envato/add-purchase-using-code', [EnvatoController::class, 'addPurchaseUsingCode']);
        Route::post('users/{user}/envato/sync-purchases', [EnvatoController::class, 'syncPurchases']);

        //HElP CENTER IMPORT/EXPORT
        Route::post('hc/actions/import', [HelpCenterActionsController::class, 'import']);
        Route::get('hc/actions/export', [HelpCenterActionsController::class, 'export']);

        //NOTIFICATIONS
        Route::apiResource('notification-subscription', NotificationSubscriptionsController::class, ['as' => 'apiNotifSubs']);


        //ACTIVITY LOG
        Route::get('activity-log', [ActivityLogController::class, 'index']);

        //UPLOADS
        Route::get('uploads/{id}', '\Common\Files\Controllers\FileEntriesController@show');

        //TICKETS MAIL WEBHOOKS
        Route::post('tickets/mail/incoming', [EmailApiWebhookController::class, 'handleIncoming']);
        Route::post('tickets/mail/failed', [EmailApiWebhookController::class,'handleFailed']);
    });
});
