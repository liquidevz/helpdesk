import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import React, {useRef, useState} from 'react';
import {Editor} from '@tiptap/react';
import {FileEntry} from '@common/uploads/file-entry';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {getReplyBody} from '@app/reply-editor/get-reply-body';
import {useUpdateReply} from '@app/agent/agent-ticket-page/reply-list/requests/use-update-reply';
import {Reply} from '@app/agent/reply';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Props {
  reply: Reply;
}
export function UpdateReplyDialog({reply}: Props) {
  const editorRef = useRef<Editor | null>(null);
  const {close} = useDialogContext();
  const updateReply = useUpdateReply();
  const [attachments, setAttachments] = useState<FileEntry[]>(
    reply.attachments || [],
  );
  const title =
    reply.type === 'notes' ? (
      <Trans message="Edit note" />
    ) : (
      <Trans message="Edit reply" />
    );

  const handleSubmit = () => {
    updateReply.mutate(
      {
        reply,
        body: getReplyBody(editorRef),
        attachments: attachments.map(a => a.id),
      },
      {
        onSuccess: () => {
          close();
          toast(
            reply.type === 'notes'
              ? message('Updated note')
              : message('Updated reply'),
          );
        },
      },
    );
  };

  return (
    <Dialog size="lg">
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <FileUploadProvider>
          <ReplyEditor
            minHeight="min-h-[300px]"
            isLoading={updateReply.isPending}
            initialContent={reply.body}
            editorRef={editorRef}
            attachments={attachments}
            onAttachmentsChange={attachments => setAttachments(attachments)}
            onSubmit={() => handleSubmit()}
          />
        </FileUploadProvider>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          onClick={() => handleSubmit()}
          disabled={updateReply.isPending}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
