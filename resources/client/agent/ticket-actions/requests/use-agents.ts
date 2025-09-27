import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {User} from '@common/auth/user';
import {AGENT_PERMISSION} from '@app/agent/ticket';

export function useAgents() {
  return useQuery({
    queryKey: ['users', 'agents'],
    queryFn: () => fetchAgents(),
  });
}

function fetchAgents() {
  return apiClient
    .get<PaginatedBackendResponse<User>>('users', {
      params: {
        permission: AGENT_PERMISSION,
        perPage: 20,
      },
    })
    .then(response => response.data);
}
