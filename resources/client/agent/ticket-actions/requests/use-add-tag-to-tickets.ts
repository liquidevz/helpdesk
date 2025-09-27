import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {TicketTag} from '@app/agent/ticket';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Response extends BackendResponse {
  tag: TicketTag;
}

interface Payload {
  tagName: string;
  ticketIds: number[];
}

export function useAddTagToTickets() {
  return useMutation({
    mutationFn: (payload: Payload) => addTag(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({queryKey: ['mailbox', 'sidenav-tags']});
      await queryClient.invalidateQueries({queryKey: ['tickets']});
      toast(message('Tag added'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function addTag(payload: Payload): Promise<Response> {
  return apiClient.post(`tickets/tags/add`, payload).then(r => r.data);
}
