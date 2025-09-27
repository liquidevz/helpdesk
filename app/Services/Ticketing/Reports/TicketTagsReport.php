<?php

namespace App\Services\Ticketing\Reports;

use Common\Database\Metrics\MetricDateRange;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TicketTagsReport
{
    protected array $report;

    const NAME = 'tags';

    public function __construct(protected MetricDateRange $dateRange)
    {
        $this->report = [
            'label' => __('New tickets'),
            'data' => [],
        ];
    }

    public function process(Collection $tickets): void
    {
        $tickets
            ->flatMap(fn($ticket) => $ticket->tags)
            ->filter(fn($tag) => $tag->type !== 'status')
            ->groupBy('name')
            ->map(
                fn($values) => [
                    'value' => $values->count(),
                    'label' => Str::limit($values[0]->display_name, 18),
                ],
            )
            ->each(function ($datum) {
                if (isset($this->report['data'][$datum['label']])) {
                    $this->report['data'][$datum['label']]['value'] +=
                        $datum['value'];
                } else {
                    $this->report['data'][$datum['label']] = $datum;
                }
            });
    }

    public function finalize(): array
    {
        $this->report['data'] = array_values($this->report['data']);
        return $this->report;
    }
}
