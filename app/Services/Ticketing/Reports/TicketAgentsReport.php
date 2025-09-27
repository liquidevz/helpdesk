<?php

namespace App\Services\Ticketing\Reports;

use Common\Auth\Actions\PaginateUsers;
use Common\Database\Metrics\MetricDateRange;
use Illuminate\Support\Collection;

class TicketAgentsReport
{
    protected array $report;

    const NAME = 'agents';

    protected array $agents = [];
    protected array $agentsIds = [];

    public function __construct(protected MetricDateRange $dateRange)
    {
        $this->report = [
            'label' => __('New tickets'),
            'data' => null,
        ];
    }

    public function process(Collection $tickets): void
    {
        if (!$this->report['data']) {
            $this->report['data'] = [];

            $this->agents = (new PaginateUsers())
                ->execute([
                    'permission' => 'tickets.update',
                    'perPage' => 20,
                ])
                ->items();

            $this->agentsIds = array_map(
                fn($agent) => $agent->id,
                $this->agents,
            );
        }

        $tickets->each(function ($ticket) {
            // count number of replies each agent made
            $ticket->replies->each(function ($reply, $i) use ($ticket) {
                if (in_array($reply->user_id, $this->agentsIds)) {
                    $this->incrementAgentStats($reply->user_id, 'replyCount');

                    if ($previous = $ticket->replies[$i + 1] ?? null) {
                        $diffInHours = $previous->created_at->diffInHours(
                            $reply->created_at,
                        );
                        $this->incrementAgentStats(
                            $reply->user_id,
                            'replyTimeSum',
                            $diffInHours,
                        );
                    }
                }
            });

            // count number of tickets each agent closed
            if (in_array($ticket->closed_by, $this->agentsIds)) {
                $this->incrementAgentStats($ticket->closed_by, 'ticketsSolved');
            }
        });
    }

    public function finalize(): array
    {
        // add agent emails to their statistics and calculate their average response time
        if (count($this->agents)) {
            foreach ($this->agents as $agent) {
                if (!isset($this->report['data'][$agent->id])) {
                    continue;
                }

                $avgResponseTime =
                    $this->report['data'][$agent->id]['replyCount'] > 0
                        ? round(
                            $this->report['data'][$agent->id]['replyTimeSum'] /
                                $this->report['data'][$agent->id]['replyCount'],
                            1,
                        )
                        : 0;

                $this->report['data'][$agent->id]['email'] = $agent->email;
                $this->report['data'][$agent->id][
                    'averageResponseTime'
                ] = $avgResponseTime;
            }

            // sort agents report by number of replies
            usort($this->report['data'], function ($a, $b) {
                return $b['replyCount'] - $a['replyCount'];
            });
        }

        $this->report['data'] = $this->report['data']
            ? array_values($this->report['data'])
            : [];
        return $this->report;
    }

    protected function incrementAgentStats(
        int $agentId,
        string $statName,
        int $value = 1,
    ): void {
        if (!isset($this->report['data'][$agentId])) {
            $this->report['data'][$agentId] = [
                'replyCount' => 0,
                'replyTimeSum' => 0,
                'ticketsSolved' => 0,
                'id' => $agentId,
            ];
        }

        $this->report['data'][$agentId][$statName] += $value;
    }
}
