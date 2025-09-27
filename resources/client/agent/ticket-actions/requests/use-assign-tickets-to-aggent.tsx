import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Payload {
  ticketIds: (number | string)[];
  userId: number | string;
}

export function useAssignTicketsToAgent() {
  return useMutation({
    mutationFn: (payload: Payload) => assignTickets(payload),
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({queryKey: ['mailbox', 'sidenav-tags']}),
        queryClient.invalidateQueries({queryKey: ['tickets']}),
      ]);
      toast(message('Tickets reassigned'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function assignTickets(payload: Payload) {
  return apiClient
    .post<BackendResponse>(`tickets/assign`, payload)
    .then(r => r.data);
}
