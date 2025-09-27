import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Reply} from '@app/agent/reply';
import {useParams} from 'react-router-dom';
import {FileEntry} from '@common/uploads/file-entry';

interface SubmitReplyResponse {
  reply: Reply;
}

interface Payload {
  body: string | null;
  attachments?: FileEntry[];
}

export function useSubmitCustomerReply() {
  const {ticketId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) =>
      submitReply({
        ticketId: ticketId!,
        ...payload,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tickets']});
      toast(message('Reply submitted'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function submitReply(data: Payload & {ticketId: number | string}) {
  const payload = {
    body: data.body,
    attachments: data.attachments?.map(a => a.id),
  };
  return apiClient
    .post<SubmitReplyResponse>(`tickets/${data.ticketId}/replies`, payload)
    .then(r => r.data);
}
