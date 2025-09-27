import {useOutletContext} from 'react-router-dom';
import {SearchReportTable} from '@app/admin/reports/search-report/search-report-table';
import React from 'react';
import {Trans} from '@common/i18n/trans';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';

export function PopularSearchesReport() {
  const {dateRange} = useOutletContext<{dateRange: DateRangeValue}>();
  return (
    <SearchReportTable
      dateRange={dateRange}
      description={
        <Trans message="Use the popular searches report to see what your customers are looking for, and learn what your customers are most interested in or struggling with the most." />
      }
    />
  );
}
