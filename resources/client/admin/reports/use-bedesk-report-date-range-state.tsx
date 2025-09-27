import {useCallback, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {parseAbsoluteToLocal} from '@internationalized/date';
import {DateRangePresets} from '@common/ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';

export function useBedeskReportDateRangeState(defaultValue?: DateRangeValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setStateDateRange] = useState<DateRangeValue>(() => {
    try {
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      const compareStartDate = searchParams.get('compareStartDate');
      const compareEndDate = searchParams.get('compareEndDate');
      if (startDate && endDate) {
        return {
          start: parseAbsoluteToLocal(startDate),
          end: parseAbsoluteToLocal(endDate),
          compareStart: compareStartDate
            ? parseAbsoluteToLocal(compareStartDate)
            : undefined,
          compareEnd: compareEndDate
            ? parseAbsoluteToLocal(compareEndDate)
            : undefined,
        };
      }
    } catch (e) {}

    return defaultValue || DateRangePresets[2].getRangeValue();
  });

  const setDateRange = useCallback(
    (dateRange: DateRangeValue) => {
      setStateDateRange(dateRange);
      setSearchParams(
        prev => {
          // main date range
          if (dateRange.start) {
            prev.set('startDate', dateRange.start.toAbsoluteString());
          } else {
            prev.delete('startDate');
          }
          if (dateRange.end) {
            prev.set('endDate', dateRange.end.toAbsoluteString());
          } else {
            prev.delete('endDate');
          }

          // compare date range
          if (dateRange.compareStart) {
            prev.set(
              'compareStartDate',
              dateRange.compareStart.toAbsoluteString(),
            );
          } else {
            prev.delete('compareStartDate');
          }
          if (dateRange.compareEnd) {
            prev.set('compareEndDate', dateRange.compareEnd.toAbsoluteString());
          } else {
            prev.delete('compareEndDate');
          }
          return prev;
        },
        {replace: true},
      );
    },
    [setSearchParams],
  );
  return [dateRange, setDateRange] as const;
}
