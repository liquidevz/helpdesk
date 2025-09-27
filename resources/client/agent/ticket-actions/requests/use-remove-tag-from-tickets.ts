import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {updateTicketQuery} from '@app/agent/agent-ticket-page/requests/use-ticket';

interface Payload {
  tagId: number;
  ticketIds: number[];
}

export function useRemoveTagFromTickets() {
  return useMutation({
    mutationFn: (payload: Payload) => removeTag(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({queryKey: ['mailbox', 'sidenav-tags']});
      payload.ticketIds.forEach(ticketId => {
        updateTicketQuery(ticketId, old => {
          old.ticket.tags = old.ticket.tags?.filter(
            tag => tag.id !== payload.tagId,
          );
        });
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function removeTag(payload: Payload): Promise<BackendResponse> {
  return apiClient.post(`tickets/tags/remove`, payload).then(r => r.data);
}
