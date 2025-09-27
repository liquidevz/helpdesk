import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {Reply} from '@app/agent/reply';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CreateCannedReplyPayload} from '@app/agent/agent-ticket-page/canned-replies/requests/use-create-canned-reply';

interface Response {
  reply: Reply;
}

export function useUpdateCannedReply(
  form: UseFormReturn<CreateCannedReplyPayload>,
  id: number,
) {
  return useMutation({
    mutationFn: (payload: CreateCannedReplyPayload) =>
      updateCannedReply(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['canned-replies']});
      toast(message('Reply updated'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateCannedReply(id: number, payload: CreateCannedReplyPayload) {
  return apiClient
    .put<Response>(`canned-replies/${id}`, payload)
    .then(r => r.data);
}
