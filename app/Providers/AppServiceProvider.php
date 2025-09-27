<?php namespace App\Providers;

use App\Http\Controllers\TagController;
use App\Models\Article;
use App\Models\Category;
use App\Models\SearchTerm;
use App\Models\Ticket;
use App\Models\User;
use App\Services\Admin\GetAnalyticsHeaderData;
use App\Services\AppBootstrapData;
use App\Services\SocialiteProviders\EnvatoProvider;
use App\Services\UrlGenerator;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Core\Bootstrap\BootstrapData;
use Common\Core\Contracts\AppUrlGenerator;
use Common\Tags\TagController as CommonTagController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Contracts\Factory;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Model::preventLazyLoading(!$this->app->isProduction());

        $this->app->bind(BootstrapData::class, AppBootstrapData::class);

        Relation::enforceMorphMap([
            Ticket::MODEL_TYPE => Ticket::class,
            Article::MODEL_TYPE => Article::class,
            Category::MODEL_TYPE => Category::class,
            SearchTerm::MODEL_TYPE => SearchTerm::class,
            User::MODEL_TYPE => User::class,
        ]);

        $this->registerSocialiteEnvatoDriver();
    }

    public function register(): void
    {
        $this->app->bind(AppUrlGenerator::class, UrlGenerator::class);
        $this->app->bind(CommonTagController::class, TagController::class);

        $this->app->bind(
            GetAnalyticsHeaderDataAction::class,
            GetAnalyticsHeaderData::class,
        );
    }

    private function registerSocialiteEnvatoDriver(): void
    {
        if (settings('envato.enable')) {
            $socialite = $this->app->make(Factory::class);
            $socialite->extend('envato', function ($app) use ($socialite) {
                $config = $app['config']['services.envato'];
                return $socialite->buildProvider(
                    EnvatoProvider::class,
                    $config,
                );
            });
        }
    }
}
