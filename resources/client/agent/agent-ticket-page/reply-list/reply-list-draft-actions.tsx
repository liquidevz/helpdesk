import React, {Fragment} from 'react';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {useOpenReplyEditor} from '@app/agent/agent-ticket-page/agent-reply-editor/use-open-reply-editor';
import {Reply} from '@app/agent/reply';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {useDeleteDraft} from '@app/agent/agent-ticket-page/reply-list/requests/use-delete-draft';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';

interface Props {
  draft: Reply;
}
export function ReplyListDraftActions({draft}: Props) {
  const openEditor = useOpenReplyEditor();
  return (
    <Fragment>
      <Button
        variant="outline"
        size="2xs"
        className="ml-14"
        onClick={() => openEditor()}
      >
        <Trans message="Edit" />
      </Button>
      <DeleteDraftButton draft={draft} />
    </Fragment>
  );
}

interface DeleteDraftButtonProps {
  draft: Reply;
}
function DeleteDraftButton({draft}: DeleteDraftButtonProps) {
  return (
    <DialogTrigger type="modal">
      <Button variant="outline" size="2xs" className="ml-6">
        <Trans message="Discard" />
      </Button>
      <DeleteDraftDialog draft={draft} />
    </DialogTrigger>
  );
}

interface DeleteDraftDialogProps {
  draft: Reply;
}
function DeleteDraftDialog({draft}: DeleteDraftDialogProps) {
  const deleteDraft = useDeleteDraft();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Discard draft" />}
      body={<Trans message="Are you sure you want to discard this draft?" />}
      confirm={<Trans message="Discard" />}
      onConfirm={() => deleteDraft.mutate({id: draft.id}, {onSuccess: close})}
      isLoading={deleteDraft.isPending}
    />
  );
}
