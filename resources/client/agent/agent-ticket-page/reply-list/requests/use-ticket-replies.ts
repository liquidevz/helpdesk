import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {SimplePaginationResponse} from '@common/http/backend-response/pagination-response';
import {Reply} from '@app/agent/reply';

export function useTicketReplies(
  ticketId: number,
  initialPage?: SimplePaginationResponse<Reply>
) {
  return useInfiniteData({
    queryKey: ['tickets', `${ticketId}`, 'replies'],
    endpoint: `tickets/${ticketId}/replies`,
    initialPage,
  });
}
