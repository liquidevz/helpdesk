import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {useParams} from 'react-router-dom';
import {Ticket} from '@app/agent/ticket';

interface Response extends BackendResponse {
  ticket: Ticket;
}

interface Payload {
  mergeeId: number;
}

export function useMergeTickets() {
  const {ticketId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) =>
      mergeTickets({
        ...payload,
        ticketId: ticketId!,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tickets']});
      toast(message('Merged tickets'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function mergeTickets(
  payload: Payload & {ticketId: number | string},
): Promise<Response> {
  return apiClient.post(`tickets/merge`, payload).then(r => r.data);
}
