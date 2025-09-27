<?php

namespace App\Services\Ticketing\Reports;

use Common\Database\Metrics\MetricDateRange;
use Common\Database\Metrics\Traits\GeneratesTrendResults;
use Illuminate\Support\Collection;

class NewTicketsReport
{
    use GeneratesTrendResults;

    protected array $report;

    const NAME = 'newTickets';

    public function __construct(protected MetricDateRange $dateRange)
    {
        $this->report = [
            'total' => 0,
            'solvedTotal' => 0,
            'unsolvedTotal' => 0,
            'solvedOnFirstReplyCount' => 0,
            'solvedOnFirstReplyPercentage' => 0,
            'label' => __('New tickets'),
            'data' => $this->getAllPossibleDateResults($this->dateRange),
        ];
    }

    public function process(Collection $tickets): void
    {
        $this->report['total'] += $tickets->count();
        $this->incrementSolvedTicketsCount($tickets);
        $this->incrementUnsolvedTicketsCount($tickets);
        $this->incrementResolvedOnFirstReplyCount($tickets);

        $format = $this->dateRange->getGroupingFormat();
        $tickets
            ->groupBy(fn($item) => $item->created_at->format($format))
            ->each(function ($tickets, $key) {
                if (isset($this->report['data'][$key])) {
                    $this->report['data'][$key]['value'] += $tickets->count();
                }
            });
    }

    public function finalize(): array
    {
        $this->report['data'] = array_values($this->report['data']);

        if ($this->report['solvedTotal'] > 0) {
            $this->report['solvedOnFirstReplyPercentage'] =
                round(
                    $this->report['solvedOnFirstReplyCount'] /
                        $this->report['solvedTotal'],
                    1,
                ) / 100;
        }

        return $this->report;
    }

    protected function incrementSolvedTicketsCount(Collection $tickets): void
    {
        $this->report['solvedTotal'] += $tickets
            ->filter(function ($ticket) {
                return $ticket->status === 'closed' &&
                    $ticket->closed_at->between(
                        $this->dateRange->start,
                        $this->dateRange->end,
                    );
            })
            ->count();
    }

    protected function incrementUnsolvedTicketsCount(Collection $tickets): void
    {
        $this->report['unsolvedTotal'] += $tickets
            ->filter(fn($ticket) => in_array($ticket->status, ['open', 'pending']))
            ->count();
    }

    protected function incrementResolvedOnFirstReplyCount(
        Collection $tickets,
    ): void {
        // ticket is considered resolved on first reply if there's
        // only one agent reply and ticket has closed_at timestamp
        $this->report['solvedOnFirstReplyCount'] += $tickets
            ->filter(
                fn($ticket) => $ticket->closed_at !== null &&
                    $ticket->replies
                        ->filter(
                            fn($reply) => $reply->user_id !== $ticket->user_id,
                        )
                        ->count() === 1,
            )
            ->count();
    }
}
