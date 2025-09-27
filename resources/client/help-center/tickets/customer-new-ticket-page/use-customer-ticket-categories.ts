import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {TicketTag} from '@app/agent/ticket';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';

interface Response extends PaginatedBackendResponse<TicketTag> {}

export function useCustomerTicketCategories() {
  return useQuery({
    queryKey: ['new-ticket-categories'],
    queryFn: () => fetchCategories(),
  });
}

function fetchCategories() {
  return apiClient
    .get<Response>(`ticket-categories`, {
      params: {
        perPage: 25,
        with: 'categories',
        orderBy: 'name',
        orderDir: 'asc',
        filterByPurchases: true,
        paginate: 'simple',
      },
    })
    .then(response => response.data);
}
