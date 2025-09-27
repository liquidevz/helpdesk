import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Reply} from '@app/agent/reply';
import {
  ActiveDraft,
  useTicketPageStore,
} from '@app/agent/agent-ticket-page/ticket-page-store';
import {useParams} from 'react-router-dom';

interface Response {
  reply: Reply;
}

interface Params {
  draft: ActiveDraft;
  type: 'background' | 'manual';
  ticketId?: number | string;
}

export function useSaveDraft() {
  const urlParams = useParams();
  const {updateActiveDraft, setEditorIsOpen} = useTicketPageStore();
  return useMutation({
    mutationFn: (params: Params) => {
      updateActiveDraft({isSaving: true});
      const ticketId = params.ticketId || urlParams.ticketId;
      return saveDraft(params.draft, ticketId!);
    },
    onSuccess: async (response, params) => {
      if (params.type !== 'background') {
        const ticketId = params.ticketId || urlParams.ticketId;
        await queryClient.invalidateQueries({
          queryKey: ['tickets', `${ticketId}`],
        });
        setEditorIsOpen(false);
      }
      updateActiveDraft({
        isDirty: false,
        id: response.reply.id,
      });
    },
    onError: err => showHttpErrorToast(err),
    onSettled: () => {
      updateActiveDraft({isSaving: false});
    },
  });
}

function saveDraft(
  activeDraft: ActiveDraft,
  ticketId: string | number,
): Promise<Response> {
  const payload = {
    body: activeDraft.body,
    attachments: activeDraft.attachments.map(u => u.id),
  };
  const request = activeDraft.id
    ? apiClient.put(`replies/${activeDraft.id}`, payload)
    : apiClient.post(`tickets/${ticketId}/drafts`, payload);
  return request.then(r => r.data);
}
