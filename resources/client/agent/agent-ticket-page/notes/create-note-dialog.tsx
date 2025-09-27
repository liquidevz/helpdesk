import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import React, {useRef, useState} from 'react';
import {useCreateNote} from '@app/agent/agent-ticket-page/notes/use-create-note';
import {Editor} from '@tiptap/react';
import {FileEntry} from '@common/uploads/file-entry';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {getReplyBody} from '@app/reply-editor/get-reply-body';

export function CreateNoteDialog() {
  const editorRef = useRef<Editor | null>(null);
  const {close} = useDialogContext();
  const createNote = useCreateNote();
  const [attachments, setAttachments] = useState<FileEntry[]>([]);

  const handleSubmit = () => {
    createNote.mutate(
      {
        body: getReplyBody(editorRef),
        attachments: attachments.map(a => a.id),
      },
      {
        onSuccess: () => close(),
      },
    );
  };

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Add a note" />
      </DialogHeader>
      <DialogBody>
        <FileUploadProvider>
          <ReplyEditor
            minHeight="min-h-[300px]"
            isLoading={createNote.isPending}
            editorRef={editorRef}
            className="mb-24"
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
          disabled={createNote.isPending}
        >
          <Trans message="Add" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
