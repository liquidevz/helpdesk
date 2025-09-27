import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {
  DateRangeValue,
  dateRangeValueToPayload,
} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {DatasetItem, ReportMetric} from '@common/admin/analytics/report-metric';

export interface UseEnvatoReportResponse extends BackendResponse {
  earnings: ReportMetric<
    DatasetItem,
    {
      total: number;
    }
  >;
  earningsVsTickets: ReportMetric<
    DatasetItem,
    {
      total: number;
    }
  >;
  items: ReportMetric<{label: string; value: number}>;
  countries: ReportMetric<{label: string; value: number}>;
}

interface Params {
  dateRange?: DateRangeValue;
}

export function useEnvatoReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'envato', params],
    queryFn: () => fetchEnvatoReport(params),
  });
}

function fetchEnvatoReport(params: Params) {
  return apiClient
    .get<UseEnvatoReportResponse>(`reports/envato`, {
      params: dateRangeValueToPayload(params),
    })
    .then(response => response.data);
}
