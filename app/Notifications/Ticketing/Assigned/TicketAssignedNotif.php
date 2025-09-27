<?php

namespace App\Notifications\Ticketing\Assigned;

use App\Models\User;
use App\Notifications\Ticketing\TicketingNotification;
use App\Services\UrlGenerator;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TicketAssignedNotif extends TicketingNotification
{
    public const NOTIF_ID = '02';

    public function __construct(
        protected Collection $tickets,
        protected User $assigner,
        protected ?User $assignee = null,
    ) {
    }

    protected function image(): string
    {
        return $this->assigner->avatar;
    }

    protected function lines(User $notifiable): array
    {
        return [$this->firstLine(), $this->secondLine()];
    }

    protected function firstLine(): string
    {
        $line =
            $this->tickets->count() === 1
                ? '**:assigner** assigned :assignee conversion #:ticketId'
                : '**:assigner** assigned :assignee :count conversions';

        return __($line, [
            'assigner' => $this->assigner->display_name,
            'assignee' => $this->assignee
                ? $this->assignee->display_name
                : __('you'),
            'ticketId' => $this->tickets->first()->id,
            'count' => $this->tickets->count(),
        ]);
    }

    protected function secondLine(): string
    {
        return Str::limit(
            strip_tags($this->tickets->first()->latest_reply->body),
            150,
        );
    }

    protected function mainAction(): array
    {
        return [
            'label' => __('View conversation'),
            'action' => app(UrlGenerator::class)->ticket(
                $this->tickets->first(),
            ),
        ];
    }
}
