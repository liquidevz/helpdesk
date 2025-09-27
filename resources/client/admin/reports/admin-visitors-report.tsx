import React from 'react';
import {VisitorsReportCharts} from '@common/admin/analytics/visitors-report-charts';
import {useAdminReport} from '@common/admin/analytics/use-admin-report';
import {useBedeskReportDateRangeState} from '@app/admin/reports/use-bedesk-report-date-range-state';
import {Trans} from '@common/i18n/trans';
import {BedeskAdminReportLayout} from '@app/admin/reports/bedesk-admin-report-layout';
import {AdminHeaderReport} from '@common/admin/analytics/admin-header-report';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';

export function AdminVisitorsReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const {data, isLoading, isPlaceholderData} = useAdminReport({
    types: ['visitors'],
    dateRange: dateRange,
  });

  return (
    <BedeskAdminReportLayout
      name="visitors"
      title={<Trans message="Visitors report" />}
      dateRange={dateRange}
      setDateRange={setDateRange}
      enableCompare
    >
      <HeaderReport dateRange={dateRange} />
      <VisitorsReportCharts
        isLoading={isLoading || isPlaceholderData}
        report={data?.visitorsReport}
      />
    </BedeskAdminReportLayout>
  );
}

interface HeaderReportProps {
  dateRange: DateRangeValue;
}
function HeaderReport({dateRange}: HeaderReportProps) {
  const {data, isLoading, isPlaceholderData} = useAdminReport({
    types: ['header'],
    dateRange: dateRange,
  });
  return (
    <AdminHeaderReport report={data?.headerReport} isLoading={isLoading} />
  );
}
