<?php namespace App\Services\Ticketing\Reports;

use App\Models\Ticket;
use Carbon\Carbon;
use Common\Database\Metrics\MetricDateRange;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class TicketsReportBuilder
{
    public function execute(array $params): array
    {
        $report = $this->getReport($params);
        if (
            isset($params['compareStartDate']) &&
            isset($params['compareEndDate'])
        ) {
            $compareReport = $this->getReport([
                'startDate' => $params['compareStartDate'],
                'endDate' => $params['compareEndDate'],
                'timezone' => $params['timezone'] ?? null,
            ]);
            foreach ($compareReport as $key => $compareDate) {
                $report[$key]['datasets'][] = $compareDate['datasets'][0];
            }
        }

        return $report;
    }

    protected function getReport(array $params): array
    {
        $dateRange = new MetricDateRange(
            start: $params['startDate'] ?? null,
            end: $params['endDate'] ?? null,
            timezone: $params['timezone'] ?? null,
        );

        return cache()->remember(
            "{$dateRange->start->timestamp}-{$dateRange->end->timestamp}",
            now()->addMinutes(settings('cache.report_minutes', 60)),
            fn() => $this->generateReport($dateRange),
        );
    }

    protected function generateReport(MetricDateRange $dateRange): array
    {
        // can't use Ticket, Reply or other models, because
        // they are just too slow and use too much memory

        $builders = [
            new NewTicketsReport($dateRange),
            new FirstReplyTimesReport($dateRange),
            new BusiestTimeOfDayReport($dateRange),
            new TicketTagsReport($dateRange),
            new TicketAgentsReport($dateRange),
        ];

        DB::table('tickets')
            ->select([
                'id',
                'user_id',
                'created_at',
                'closed_at',
                'closed_by',
                'status',
            ])
            ->whereBetween('tickets.created_at', [
                $dateRange->start,
                $dateRange->end,
            ])
            ->chunkById(1000, function ($tickets) use ($builders) {
                $tickets = $this->prepareTickets($tickets);

                foreach ($builders as $builder) {
                    $builder->process($tickets);
                }
            });

        $report = [];
        foreach ($builders as $builder) {
            $report[$builder::NAME] = [
                'granularity' => $dateRange->granularity,
                'datasets' => [$builder->finalize()],
            ];
        }

        return $report;
    }

    private function prepareTickets(Collection $tickets): Collection
    {
        $ticketIds = $tickets->pluck('id');

        // load tags of all given tickets
        $tags = DB::table('tags')
            ->select(
                'tags.name',
                'tags.id',
                'tags.type',
                'tags.display_name',
                'taggables.taggable_id as ticket_id',
            )
            ->leftJoin('taggables', 'taggables.tag_id', '=', 'tags.id')
            ->where('taggables.taggable_type', Ticket::MODEL_TYPE)
            ->whereIn('taggables.taggable_id', $ticketIds)
            ->get();

        $tagsDict = [];
        foreach ($tags as $tag) {
            $tagsDict[$tag->ticket_id][] = $tag;
        }

        // load replies of all given tickets
        $replies = DB::table('replies')
            ->select('id', 'ticket_id', 'user_id', 'created_at')
            ->whereIn('ticket_id', $ticketIds)
            ->orderBy('created_at', 'desc')
            ->limit(1000)
            ->get();

        $repliesDict = [];
        foreach ($replies as $reply) {
            $reply->created_at = Carbon::parse($reply->created_at);
            $repliesDict[$reply->ticket_id][] = $reply;
        }

        foreach ($tickets as $k => $ticket) {
            //initiate carbon instances
            $tickets[$k]->closed_at = Carbon::parse($ticket->closed_at);
            $tickets[$k]->created_at = Carbon::parse($ticket->created_at);

            //assign tags and replies to tickets they belong to
            $tickets[$k]->replies = collect($repliesDict[$ticket->id] ?? []);
            $tickets[$k]->tags = collect($tagsDict[$ticket->id] ?? []);
        }

        return $tickets;
    }
}
