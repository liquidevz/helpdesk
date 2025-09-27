import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {Reply} from '@app/agent/reply';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response {
  reply: Reply;
}

export interface CreateCannedReplyPayload {
  name: string;
  body: string | null;
  attachments?: number[];
  shared?: boolean;
}

export function useCreateCannedReply(
  form: UseFormReturn<CreateCannedReplyPayload>,
) {
  return useMutation({
    mutationFn: (payload: CreateCannedReplyPayload) =>
      createCannedReply(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['canned-replies']});
      toast(message('Saved reply created'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createCannedReply(payload: CreateCannedReplyPayload) {
  return apiClient.post<Response>(`canned-replies`, payload).then(r => r.data);
}
