<?php

namespace App\Services\Ticketing\Reports;

use Common\Database\Metrics\MetricDateRange;
use Illuminate\Support\Collection;

class FirstReplyTimesReport
{
    protected array $report;

    const NAME = 'firstReplyTimes';

    public function __construct(protected MetricDateRange $dateRange)
    {
        $this->report = [
            'average' => 0,
            'count' => 0,
            'sum' => 0,
            'label' => __('% of all replies'),
            // value is percentage, count is number if occurrences for that hour
            'data' => [
                '0-1' => [
                    'label' => '0-1',
                    'value' => 0,
                    'count' => 0,
                ],
                '0-8' => [
                    'label' => '0-8',
                    'value' => 0,
                    'count' => 0,
                ],
                '8-24' => [
                    'label' => '8-24',
                    'value' => 0,
                    'count' => 0,
                ],
                '>24' => [
                    'label' => '>24',
                    'value' => 0,
                    'count' => 0,
                ],
            ],
        ];
    }

    public function process(Collection $tickets): void
    {
        $firstReplyTimes = $tickets
            ->map(function ($ticket) {
                $creatorId = $ticket->user_id;

                //latest replies will be first in array
                $firstAgentReply = $ticket->replies->last(
                    fn($reply) => $reply->user_id != $creatorId,
                );

                return $firstAgentReply
                    ? $ticket->created_at->diffInHours(
                        $firstAgentReply->created_at,
                    )
                    : null;
            })
            ->filter();

        // we'll calculate average time after all tickets are processed, for now just increment count and sum
        $this->report['count'] += $firstReplyTimes->count();
        $this->report['sum'] += $firstReplyTimes->sum();

        $firstReplyTimes
            ->groupBy(fn($hours) => $hours)
            ->each(function ($items, $hours) {
                if ($hours <= 1) {
                    $this->report['data']['0-1']['count'] += count($items);
                }

                if ($hours <= 8) {
                    $this->report['data']['0-8']['count'] += count($items);
                }

                if ($hours <= 24 && $hours > 8) {
                    $this->report['data']['8-24']['count'] += count($items);
                }

                if ($hours > 24) {
                    $this->report['data']['>24']['count'] += count($items);
                }
            });
    }

    public function finalize(): array
    {
        //calculate average first response time
        if ($this->report['count']) {
            $this->report['average'] = round(
                $this->report['sum'] / $this->report['count'],
                1,
            );
        }

        //calculate first response time percentages for specific hours
        $total = array_reduce($this->report['data'], function ($carry, $item) {
            return $carry + $item['count'];
        });

        foreach ($this->report['data'] as $key => $stats) {
            if ($total) {
                $percentage = round(($stats['count'] / $total) * 100, 1);
            } else {
                $percentage = 0;
            }

            $this->report['data'][$key]['value'] = $percentage;
        }

        $this->report['data'] = array_values($this->report['data']);
        return $this->report;
    }
}
