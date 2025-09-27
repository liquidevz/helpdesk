import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {Category} from '@app/help-center/categories/category';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {
  DateRangeValue,
  dateRangeValueToPayload,
} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';

export interface UseSearchReportResponse
  extends PaginatedBackendResponse<SearchTermReport> {}

export interface SearchTermReport {
  id: number;
  term: string;
  last_seen: string;
  resulted_in_ticket: number;
  count: string;
  ctr: number;
  category?: Category;
}

export interface UseSearchReportParams {
  page?: string | number;
  perPage?: string | number;
  userId?: string | number;
  dateRange?: DateRangeValue;
  failedSearches?: boolean;
  orderBy?: 'last_seen' | 'count';
}

export function useSearchReport(params: UseSearchReportParams) {
  return useQuery({
    queryKey: ['reports', 'search', params],
    queryFn: () => fetchSearches(params),
  });
}

function fetchSearches(params: UseSearchReportParams) {
  return apiClient
    .get<UseSearchReportResponse>(`reports/search`, {
      params: dateRangeValueToPayload(params),
    })
    .then(response => response.data);
}
