import {useCallback} from 'react';
import {useSaveDraft} from '@app/agent/agent-ticket-page/requests/use-save-draft';
import {ticketPageStore} from '@app/agent/agent-ticket-page/ticket-page-store';

export function useBackgroundDraftSave() {
  const saveDraft = useSaveDraft();
  return useCallback(
    (
      type: 'background' | 'manual' = 'background',
      ticketId?: number | string
    ) => {
      if (
        ticketPageStore().activeDraft.isDirty &&
        !ticketPageStore().activeDraft.isSaving &&
        !ticketPageStore().ticketIsSaving
      ) {
        saveDraft.mutate({
          ticketId,
          draft: ticketPageStore().activeDraft,
          type,
        });
      }
    },
    [saveDraft]
  );
}
