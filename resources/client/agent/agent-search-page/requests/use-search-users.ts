import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {PaginateTicketsParams} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {useSearchParams} from 'react-router-dom';
import {User} from '@common/auth/user';

export interface PaginateUsersResponse extends PaginatedBackendResponse<User> {}

export function useSearchUsers() {
  const [searchParams] = useSearchParams();
  const params = {
    query: searchParams.get('query') ?? '',
    page: searchParams.get('page') ?? '1',
    perPage: searchParams.get('perPage') ?? '20',
  };
  return useQuery({
    queryKey: ['users', 'search', params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    enabled: !!params.query,
  });
}

function fetchUsers(params: PaginateTicketsParams) {
  return apiClient
    .get<PaginateUsersResponse>('search/users', {params})
    .then(response => response.data);
}
