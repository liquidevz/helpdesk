import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {Ticket} from '@app/agent/ticket';
import {SimplePaginationResponse} from '@common/http/backend-response/pagination-response';
import {Reply} from '@app/agent/reply';
import {produce} from 'immer';
import {useParams} from 'react-router-dom';

export interface GetTicketResponse {
  ticket: Ticket;
  replies: SimplePaginationResponse<Reply>;
  draft?: Reply;
}

export function useTicket(ticketId?: number | string) {
  const params = useParams();
  ticketId = ticketId || params.ticketId;
  return useQuery({
    queryKey: ['tickets', `${ticketId}`],
    queryFn: () => fetchTicket(ticketId!),
  });
}

export function updateTicketQuery(
  ticketId: number | string,
  updaterFn: (old: GetTicketResponse) => void,
) {
  queryClient.setQueryData<GetTicketResponse>(
    ['tickets', `${ticketId}`],
    old => {
      if (!old) return;
      return produce(old, updaterFn);
    },
  );
}

export function useTicketHcCategories(): number[] {
  const {data} = useTicket();
  return (
    data?.ticket?.tags
      ?.filter(tag => tag.type === 'category')
      .flatMap(tag => tag.categories.map(c => c.id)) || []
  );
}

function fetchTicket(ticketId: string | number) {
  return apiClient
    .get<GetTicketResponse>(`tickets/${ticketId}`)
    .then(response => response.data);
}
