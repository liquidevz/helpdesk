import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {useAuth} from '@common/auth/use-auth';
import {CannedReply} from '@app/agent/agent-ticket-page/canned-replies/canned-reply';

interface Response extends PaginatedBackendResponse<CannedReply> {}

export function useCannedReplies(query: string = '') {
  const {user} = useAuth();
  return useQuery({
    queryKey: ['canned-replies', `${user?.id}`, query],
    queryFn: ({signal}) => fetchCannedReplies(user!.id, query, signal),
    placeholderData: keepPreviousData,
  });
}

async function fetchCannedReplies(
  userId: number,
  query: string,
  signal?: AbortSignal,
) {
  if (query) {
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  return apiClient
    .get<Response>('canned-replies', {
      params: {userId, shared: true, perPage: 15, query},
      signal,
    })
    .then(response => response.data);
}
