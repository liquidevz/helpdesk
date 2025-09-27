<?php namespace App\Http\Controllers;

use App\Services\Envato\EnvatoReportBuilder;
use App\Services\HelpCenter\PopularArticlesReport;
use App\Services\HelpCenter\SearchReport;
use App\Services\Ticketing\Reports\TicketsReportBuilder;
use Common\Core\BaseController;
use Common\Database\Metrics\MetricDateRange;

class ReportsController extends BaseController
{
    public function popularArticles()
    {
        $this->authorize('index', 'ReportPolicy');

        $pagination = (new PopularArticlesReport())->generate(request()->all());

        return $this->success(['pagination' => $pagination]);
    }

    public function search()
    {
        $this->authorize('index', 'ReportPolicy');

        $dateRange =
            request('startDate') && request('endDate')
                ? new MetricDateRange(
                    start: request('startDate'),
                    end: request('endDate'),
                    timezone: request('timezone'),
                )
                : null;

        $pagination = (new SearchReport($dateRange))->generate(
            request()->all(),
        );

        return $this->success(['pagination' => $pagination]);
    }

    public function envato()
    {
        $this->authorize('index', 'ReportPolicy');

        $report = (new EnvatoReportBuilder())->execute(request()->all());

        return $this->success($report);
    }

    public function tickets()
    {
        $this->authorize('index', 'ReportPolicy');

        $data = (new TicketsReportBuilder())->execute(request()->all());

        return $this->success($data);
    }
}
