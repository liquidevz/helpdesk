import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Payload {
  ids: (number | string)[];
}

export function useDeleteTickets() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteTickets(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tickets']});
      toast(message('Tickets deleted'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function deleteTickets({ids}: Payload) {
  return apiClient
    .delete<BackendResponse>(`tickets/${ids.join(',')}`)
    .then(r => r.data);
}
