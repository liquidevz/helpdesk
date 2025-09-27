import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Payload {
  ids: number[];
}

export function useDeleteCannedReplies() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteReplies(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['canned-replies']});
    },
    onError: err => showHttpErrorToast(err),
  });
}

function deleteReplies(payload: Payload) {
  return apiClient
    .delete(`canned-replies/${payload.ids.join(',')}`)
    .then(r => r.data);
}
