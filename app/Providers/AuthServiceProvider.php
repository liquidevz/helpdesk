<?php namespace App\Providers;

use App\Models\Category;
use App\Models\User;
use App\Policies\ArticlePolicy;
use App\Policies\ReportPolicy;
use App\Policies\TicketFileEntryPolicy;
use Common\Files\FileEntry;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        'ReportPolicy' => ReportPolicy::class,
        Category::class => ArticlePolicy::class,
        FileEntry::class => TicketFileEntryPolicy::class,
    ];

    public function boot(): void
    {
        Gate::define('viewPulse', function (User $user) {
            return $user->hasPermission('admin.access');
        });
    }
}
