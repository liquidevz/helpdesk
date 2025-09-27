import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {PaginateTicketsParams} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {useSearchParams} from 'react-router-dom';
import {Ticket} from '@app/agent/ticket';

export interface PaginateTicketsResponse
  extends PaginatedBackendResponse<Ticket> {}

export function useSearchTickets() {
  const [searchParams] = useSearchParams();
  const params = {
    filters: searchParams.get('filters') ?? '',
    query: searchParams.get('query') ?? '',
    page: searchParams.get('page') ?? '1',
    perPage: searchParams.get('perPage') ?? '20',
  };
  const enabled = !!params.query || !!params.filters;
  return useQuery({
    queryKey: ['tickets', 'search', params],
    queryFn: () => fetchTickets(params),
    placeholderData: enabled ? keepPreviousData : undefined,
    enabled,
  });
}

function fetchTickets(params: PaginateTicketsParams) {
  return apiClient
    .get<PaginateTicketsResponse>('search/tickets', {params})
    .then(response => response.data);
}
