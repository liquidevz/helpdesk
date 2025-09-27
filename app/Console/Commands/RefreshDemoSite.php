<?php

namespace App\Console\Commands;

use Common\Settings\Setting;
use Database\Seeders\DemoHelpCenterSeeder;
use Database\Seeders\DemoTicketsSeeder;
use Database\Seeders\DemoUserSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RefreshDemoSite extends Command
{
    protected $signature = 'demo:refresh';
    protected $description = 'Refresh demo site with sample data.';

    public function handle()
    {
        if (!config('common.site.demo')) {
            $this->warn('This is not a demo site! Aborting...');
            return;
        }

        $progress = $this->output->createProgressBar(9);
        $progress->advance();

        $tableNames = Schema::getConnection()
            ->getDoctrineSchemaManager()
            ->listTableNames();

        foreach ($tableNames as $name) {
            if ($name === 'migrations') {
                continue;
            }
            DB::table($name)->truncate();
        }
        $progress->advance();

        Artisan::call('db:seed', ['--force' => true]);
        Artisan::call('common:seed');
        $progress->advance();

        Artisan::call('db:seed', [
            '--force' => true,
            '--class' => DemoUserSeeder::class,
        ]);
        $progress->advance();

        Artisan::call('db:seed', [
            '--force' => true,
            '--class' => DemoHelpCenterSeeder::class,
        ]);
        $progress->advance();

        Artisan::call('db:seed', [
            '--force' => true,
            '--class' => DemoTicketsSeeder::class,
        ]);
        $progress->advance();

        Artisan::call('scout:import "App\\\Models\\\Article"');
        Artisan::call('scout:import "App\\\Models\\\User"');
        Artisan::call('scout:import "App\\\Models\\\Ticket"');
        $progress->advance();

        //other settings
        Setting::where('name', 'i18n.enable')->update(['value' => false]);
        Setting::where('name', 'cookie_notice.enable')->update([
            'value' => false,
        ]);
        Setting::where('name', 'uploads.chunk_size')->update([
            'value' => 4_194_304,
        ]); //4MB
        $progress->advance();

        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        $progress->advance();
    }
}
