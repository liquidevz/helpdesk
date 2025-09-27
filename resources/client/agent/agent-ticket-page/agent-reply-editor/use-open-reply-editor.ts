import {useCallback} from 'react';
import {useTicket} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {ticketPageStore} from '@app/agent/agent-ticket-page/ticket-page-store';

export function useOpenReplyEditor() {
  const {data} = useTicket();
  return useCallback(() => {
    if (!data) return;
    if (data.draft) {
      ticketPageStore().updateActiveDraft({
        ...data.draft,
        isDirty: false,
      });
    }
    ticketPageStore().setEditorIsOpen(true);
  }, [data]);
}
