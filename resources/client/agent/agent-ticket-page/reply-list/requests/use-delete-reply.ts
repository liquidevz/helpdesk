import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Reply} from '@app/agent/reply';

interface Payload {
  reply: Reply;
}

export function useDeleteReply() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteReply(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ['tickets', `${payload.reply.ticket_id}`],
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function deleteReply(payload: Payload) {
  return apiClient.delete(`replies/${payload.reply.id}`).then(r => r.data);
}
