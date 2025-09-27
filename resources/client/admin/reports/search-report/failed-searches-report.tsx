import {useOutletContext} from 'react-router-dom';
import {SearchReportTable} from '@app/admin/reports/search-report/search-report-table';
import React from 'react';
import {Trans} from '@common/i18n/trans';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';

export function FailedSearchesReport() {
  const {dateRange} = useOutletContext<{dateRange: DateRangeValue}>();
  return (
    <SearchReportTable
      dateRange={dateRange}
      failedSearches
      description={
        <Trans message="This report shows search terms people use that don't match any articles. Use this metric to improve your help center search and content." />
      }
    />
  );
}
