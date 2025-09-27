<?php namespace App\Services\Triggers\Actions;

use App\Models\Action;
use App\Models\Ticket;
use App\Models\Trigger;

interface TriggerActionInterface {
    public function execute(Ticket $ticket, Action $action, Trigger $trigger): Ticket;
}
