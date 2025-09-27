import {Query, useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Reply} from '@app/agent/reply';
import {useAfterReplyAction} from '@app/agent/agent-ticket-page/use-after-reply-action';
import {useDeleteDraft} from '@app/agent/agent-ticket-page/reply-list/requests/use-delete-draft';
import {
  ticketPageStore,
  useTicketPageStore,
} from '@app/agent/agent-ticket-page/ticket-page-store';
import {useParams} from 'react-router-dom';

interface SubmitReplyResponse {
  reply: Reply;
}

interface Payload {
  type: 'drafts' | 'replies' | 'notes';
  body: string | null;
  status?: string;
  attachments?: number[];
}

export function useSubmitAgentReply() {
  const {ticketId} = useParams();
  const {perform, action} = useAfterReplyAction();
  const deleteDraft = useDeleteDraft({clearTicketCache: false});
  const {setTicketIsSaving} = useTicketPageStore();
  return useMutation({
    mutationFn: (payload: Payload) => {
      setTicketIsSaving(true);
      return submitReply({
        ticketId: ticketId!,
        ...payload,
      });
    },
    onSuccess: async () => {
      // no need to wait for these to finish
      queryClient.invalidateQueries({queryKey: ['mailbox', 'sidenav-tags']});
      if (ticketPageStore().activeDraft.id) {
        deleteDraft.mutate({id: ticketPageStore().activeDraft.id!});
      }
      ticketPageStore().discardActiveDraft();

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['tickets'],
          predicate: q => {
            // don't invalidate currently active ticket to avoid flickering
            return (
              action === 'stay_on_page' || !shouldIgnoreQuery(q, ticketId!)
            );
          },
        }),
        perform(),
      ]);
      toast(message('Reply submitted'));
    },
    onError: err => showHttpErrorToast(err),
    onSettled: () => setTicketIsSaving(false),
  });
}

function submitReply(payload: Payload & {ticketId: number | string}) {
  return apiClient
    .post<SubmitReplyResponse>(
      `tickets/${payload.ticketId}/${payload.type}`,
      payload,
    )
    .then(r => r.data);
}

function shouldIgnoreQuery(q: Query, ticketId: number | string) {
  const isActiveTicket =
    q.queryKey[0] === 'tickets' && q.queryKey[1] === `${ticketId}`;
  const isOtherUserTickets =
    q.queryKey[0] === 'tickets' &&
    typeof q.queryKey[1] === 'object' &&
    q.queryKey[1] &&
    'userId' in q.queryKey[1];
  return isActiveTicket || isOtherUserTickets;
}
