<?php

namespace App\Console\Commands;

use App\Services\Triggers\TriggersCycle;
use Illuminate\Console\Command;

class ExecuteTimeBasedTriggers extends Command
{
    protected $signature = 'triggers:execute';

    protected $description = 'Execute triggers that should run periodically.';

    public function handle()
    {
        app(TriggersCycle::class)->executeTimeBasedTriggers();

        $this->info('Triggers executed successfully.');

        return parent::SUCCESS;
    }
}
