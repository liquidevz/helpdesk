import React from 'react';
import {LineChart} from '@common/charts/line-chart';
import {Trans} from '@common/i18n/trans';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {useTicketReport} from '@app/admin/reports/ticket-report/use-ticket-report';
import {BarChart} from '@common/charts/bar-chart';
import {BusiestTimeOfDayChart} from '@app/admin/reports/ticket-report/busiest-time-of-day-chart';
import {AgentPerformanceTable} from '@app/admin/reports/ticket-report/agent-performance-table';
import {TicketReportHeader} from '@app/admin/reports/ticket-report/ticket-report-header';
import {BedeskAdminReportLayout} from '@app/admin/reports/bedesk-admin-report-layout';
import {useBedeskReportDateRangeState} from '@app/admin/reports/use-bedesk-report-date-range-state';

const colGap = 'gap-12 md:gap-24 mb-12 md:mb-24';
const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;

export function AdminTicketReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const query = useTicketReport({dateRange});
  return (
    <BedeskAdminReportLayout
      name="tickets"
      title={<Trans message="Ticket report" />}
      dateRange={dateRange}
      setDateRange={setDateRange}
      enableCompare
    >
      <TicketReportHeader data={query.data} isLoading={query.isLoading} />
      <div className={rowClassName}>
        <LineChart
          data={query.data?.newTickets}
          className="flex-auto"
          isLoading={query.isLoading}
          title={<Trans message="New tickets" />}
          hideLegend
          description={
            <Trans
              message=":count total tickets"
              values={{
                count: (
                  <FormattedNumber
                    value={query.data?.newTickets?.datasets[0]?.total || 0}
                  />
                ),
              }}
            />
          }
        />
        <BarChart
          data={query.data?.firstReplyTimes}
          className="max-w-500"
          direction="vertical"
          individualBarColors
          isLoading={query.isLoading}
          hideLegend
          title={<Trans message="Hours until first agent reply" />}
          description={
            <Trans
              message=":hoursh average"
              values={{
                hours: (
                  <FormattedNumber
                    value={
                      query.data?.firstReplyTimes.datasets[0]?.average || 0
                    }
                  />
                ),
              }}
            />
          }
        />
      </div>
      <div className={rowClassName}>
        <BusiestTimeOfDayChart report={query.data?.busiestTimeOfDay} />
        <BarChart
          data={query.data?.tags}
          className="max-w-620"
          direction="horizontal"
          isLoading={query.isLoading}
          individualBarColors
          hideLegend
          title={<Trans message="Tickets by tags" />}
        />
      </div>
      <div className={rowClassName}>
        <AgentPerformanceTable report={query.data?.agents} />
      </div>
    </BedeskAdminReportLayout>
  );
}
