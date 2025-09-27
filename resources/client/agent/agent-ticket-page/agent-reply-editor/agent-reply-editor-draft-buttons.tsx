import React, {Fragment, useCallback} from 'react';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CheckCircleIcon} from '@common/icons/material/CheckCircle';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {DeleteIcon} from '@common/icons/material/Delete';
import {useSaveDraft} from '@app/agent/agent-ticket-page/requests/use-save-draft';
import {useDeleteDraft} from '@app/agent/agent-ticket-page/reply-list/requests/use-delete-draft';
import {
  ticketPageStore,
  useTicketPageStore,
} from '@app/agent/agent-ticket-page/ticket-page-store';
import {useKeybind} from '@common/utils/keybinds/use-keybind';
import {MenubarButtonProps} from '@common/text-editor/menubar/menubar-button-props';

interface Props {
  size?: MenubarButtonProps['size'];
}
export function AgentReplyEditorDraftButtons({size = 'sm'}: Props) {
  const isDirty = useTicketPageStore(s => s.activeDraft.isDirty);
  const isSaving = useTicketPageStore(s => s.activeDraft.isSaving);
  const isEmpty = useTicketPageStore(
    s => !s.activeDraft.body && !s.activeDraft.attachments?.length,
  );
  const saveDraft = useSaveDraft();
  const deleteDraft = useDeleteDraft();

  const handleDraftSave = () => {
    saveDraft.mutate({
      draft: ticketPageStore().activeDraft,
      type: 'manual',
    });
  };

  const handleDraftDelete = useCallback(() => {
    if (ticketPageStore().activeDraft.id) {
      deleteDraft.mutate(
        {id: ticketPageStore().activeDraft.id!},
        {onSuccess: () => ticketPageStore().setEditorIsOpen(false)},
      );
    } else {
      ticketPageStore().setEditorIsOpen(false);
    }
  }, [deleteDraft]);

  useKeybind('window', 'Escape', () => {
    if (ticketPageStore().editorIsOpen) {
      handleDraftDelete();
    }
  });

  return (
    <Fragment>
      <Tooltip label={<Trans message="Save draft" />}>
        <IconButton
          className="ml-auto"
          size={size}
          color={!isDirty ? 'positive' : null}
          onClick={handleDraftSave}
          disabled={isSaving || isEmpty}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip label={<Trans message="Discard (Esc)" />}>
        <IconButton size={size} disabled={isSaving} onClick={handleDraftDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}
