import {useEnvatoReport} from '@app/admin/reports/envato-report/use-envato-report';
import {useBedeskReportDateRangeState} from '@app/admin/reports/use-bedesk-report-date-range-state';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {BedeskAdminReportLayout} from '@app/admin/reports/bedesk-admin-report-layout';
import {LineChart} from '@common/charts/line-chart';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {BarChart} from '@common/charts/bar-chart';

const colGap = 'gap-12 md:gap-24 mb-12 md:mb-24';
const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;

export function EnvatoReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const query = useEnvatoReport({
    dateRange,
  });
  return (
    <BedeskAdminReportLayout
      name="envato"
      title={<Trans message="Envato report" />}
      dateRange={dateRange}
      setDateRange={setDateRange}
      enableCompare
      granularity="day"
    >
      <div className={rowClassName}>
        <LineChart
          data={query.data?.earnings}
          className="flex-auto"
          isLoading={query.isLoading}
          title={<Trans message="Earnings" />}
          hideLegend
          description={
            <Trans
              message=":count total"
              values={{
                count: (
                  <FormattedNumber
                    value={query.data?.earnings?.datasets[0]?.total || 0}
                  />
                ),
              }}
            />
          }
        />
        <BarChart
          data={query.data?.items}
          className="max-w-620"
          direction="horizontal"
          isLoading={query.isLoading}
          individualBarColors
          hideLegend
          title={<Trans message="Earnings by item" />}
        />
      </div>
      <div className={rowClassName}>
        <LineChart
          data={query.data?.earningsVsTickets}
          className="flex-auto"
          isLoading={query.isLoading}
          title={<Trans message="Earnings vs tickets" />}
        />
        <BarChart
          data={query.data?.countries}
          className="max-w-620"
          direction="horizontal"
          isLoading={query.isLoading}
          individualBarColors
          hideLegend
          title={<Trans message="Earnings by country" />}
        />
      </div>
    </BedeskAdminReportLayout>
  );
}
