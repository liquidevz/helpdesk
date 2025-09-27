import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {
  DateRangeValue,
  dateRangeValueToPayload,
} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {DatasetItem, ReportMetric} from '@common/admin/analytics/report-metric';

const endpoint = 'reports/tickets';

export interface FetchTicketReportResponse extends BackendResponse {
  newTickets: ReportMetric<
    DatasetItem,
    {
      total: number;
      solvedTotal: number;
      unsolvedTotal: number;
      solvedOnFirstReplyPercentage: number;
    }
  >;
  firstReplyTimes: ReportMetric<
    {
      label: string;
      value: number;
      percentage: number;
    },
    {average: number}
  >;
  busiestTimeOfDay: ReportMetric<
    {value: Record<string, number>},
    {max: number}
  >;
  tags: ReportMetric<{label: string; value: number}>;
  agents: ReportMetric<{
    id: number;
    email: string;
    replyCount: number;
    ticketsSolved: number;
    averageResponseTime: number;
  }>;
}

interface Payload {
  dateRange: DateRangeValue;
}

export function useTicketReport(payload: Payload) {
  return useQuery<FetchTicketReportResponse>({
    queryKey: [endpoint, payload],
    queryFn: () => fetchTicketReport(endpoint, payload),
    placeholderData: keepPreviousData,
  });
}

function fetchTicketReport<
  T extends FetchTicketReportResponse = FetchTicketReportResponse,
>(endpoint: string, payload: Payload): Promise<T> {
  return apiClient
    .get(endpoint, {params: dateRangeValueToPayload(payload)})
    .then(response => response.data);
}
