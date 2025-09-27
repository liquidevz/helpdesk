import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Payload {
  ids: (number | string)[];
  status: string;
}

export function useChangeTicketStatus() {
  return useMutation({
    mutationFn: (payload: Payload) => changeStatus(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({queryKey: ['mailbox', 'sidenav-tags']});
      await queryClient.invalidateQueries({queryKey: ['tickets']});
    },
    onError: err => showHttpErrorToast(err),
  });
}

function changeStatus(payload: Payload) {
  return apiClient
    .post<BackendResponse>(`tickets/status/change`, payload)
    .then(r => r.data);
}
