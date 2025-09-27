import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Reply} from '@app/agent/reply';
import {useParams} from 'react-router-dom';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Response {
  reply: Reply;
}

interface Payload {
  body: string | null;
  attachments?: number[];
}

export function useCreateNote() {
  const {ticketId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) => createNote(ticketId!, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tickets', `${ticketId}`],
      });
      toast(message('Note added'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function createNote(ticketId: number | string, payload: Payload) {
  return apiClient
    .post<Response>(`tickets/${ticketId}/notes`, payload)
    .then(r => r.data);
}
