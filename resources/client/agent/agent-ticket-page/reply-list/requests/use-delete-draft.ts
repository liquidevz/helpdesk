import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {useTicketPageStore} from '@app/agent/agent-ticket-page/ticket-page-store';
import {useParams} from 'react-router-dom';

interface Payload {
  id: number;
}

interface Options {
  clearTicketCache?: boolean;
}

export function useDeleteDraft({clearTicketCache = true}: Options = {}) {
  const {ticketId} = useParams();
  const {updateActiveDraft, discardActiveDraft} = useTicketPageStore();
  return useMutation({
    mutationFn: (payload: Payload) => {
      updateActiveDraft({isSaving: true});
      return deleteDraft(payload);
    },
    onSuccess: async () => {
      discardActiveDraft();
      if (clearTicketCache) {
        await queryClient.invalidateQueries({
          queryKey: ['tickets', `${ticketId}`],
        });
      }
    },
    onError: err => showHttpErrorToast(err),
    onSettled: () => updateActiveDraft({isSaving: false}),
  });
}

function deleteDraft(payload: Payload) {
  return apiClient.delete(`replies/${payload.id}`).then(r => r.data);
}
