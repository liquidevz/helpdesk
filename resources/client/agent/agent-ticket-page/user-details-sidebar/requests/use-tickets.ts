import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {Ticket} from '@app/agent/ticket';

export interface PaginateTicketsParams {
  tagId?: string | number | null;
  page?: string | number;
  perPage?: string | number;
  userId?: string | number;
  query?: string | null;
  paginate?: 'simple';
  loader?: 'basic' | 'ticketTable';
  orderBy?: string;
  orderDir?: string;
}

export interface PaginateTicketsResponse
  extends PaginatedBackendResponse<Ticket> {}

export function useTickets(params: PaginateTicketsParams) {
  return useQuery({
    queryKey: ['tickets', params],
    queryFn: () => fetchTickets(params),
    placeholderData: keepPreviousData,
  });
}

function fetchTickets(params: PaginateTicketsParams) {
  return apiClient
    .get<PaginateTicketsResponse>('tickets', {params})
    .then(response => response.data);
}
