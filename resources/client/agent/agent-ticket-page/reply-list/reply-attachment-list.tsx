import {Reply} from '@app/agent/reply';
import {useUpdateReply} from '@app/agent/agent-ticket-page/reply-list/requests/use-update-reply';
import React from 'react';
import {FileEntry} from '@common/uploads/file-entry';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {Trans} from '@common/i18n/trans';
import {
  AttachmentListLayout,
  FileEntryAttachmentLayout,
} from '@app/agent/ticket-layout/attachment-list-layout';
import {openDialog} from '@common/ui/overlays/store/dialog-store';

interface Props {
  reply: Reply;
}
export function ReplyAttachmentList({reply}: Props) {
  if (!reply.attachments?.length) return null;
  return (
    <AttachmentListLayout className="mt-30 w-max">
      {reply.attachments.map((attachment, index) => (
        <FileEntryAttachmentLayout
          key={attachment.id}
          attachments={reply.attachments!}
          index={index}
          onRemove={() => {
            openDialog(DeleteAttachmentDialog, {reply, attachment});
          }}
        />
      ))}
    </AttachmentListLayout>
  );
}

interface DeleteAttachmentDialogProps {
  reply: Reply;
  attachment: FileEntry;
}
function DeleteAttachmentDialog({
  reply,
  attachment,
}: DeleteAttachmentDialogProps) {
  const updateReply = useUpdateReply();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Delete attachment" />}
      body={
        <Trans message="Are you sure you want to delete this attachment?" />
      }
      confirm={<Trans message="Delete" />}
      onConfirm={() => {
        updateReply.mutate(
          {
            reply,
            attachments: reply
              .attachments!.filter(u => u.id !== attachment.id)
              .map(u => u.id),
          },
          {onSuccess: close},
        );
      }}
      isLoading={updateReply.isPending}
    />
  );
}
