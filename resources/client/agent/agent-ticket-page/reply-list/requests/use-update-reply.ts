import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Reply} from '@app/agent/reply';

interface Response {
  reply: Reply;
}

interface Payload {
  reply: Reply;
  body?: string | null;
  attachments?: number[];
}

export function useUpdateReply() {
  return useMutation({
    mutationFn: (payload: Payload) => updateReply(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ['tickets', `${payload.reply.ticket_id}`, 'replies'],
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function updateReply({reply, ...payload}: Payload) {
  return apiClient
    .put<Response>(`replies/${reply.id}`, payload)
    .then(r => r.data);
}
