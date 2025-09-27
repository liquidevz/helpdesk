import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import React, {Fragment, useRef, useState} from 'react';
import {Editor} from '@tiptap/react';
import {FileEntry} from '@common/uploads/file-entry';
import {getReplyBody} from '@app/reply-editor/get-reply-body';
import {Form} from '@common/ui/forms/form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import {CreateCannedReplyPayload} from '@app/agent/agent-ticket-page/canned-replies/requests/use-create-canned-reply';
import {UseFormReturn} from 'react-hook-form';
import {CannedReply} from '@app/agent/agent-ticket-page/canned-replies/canned-reply';

interface CannedReplyFormProps {
  onSubmit: (value: CreateCannedReplyPayload) => void;
  form: UseFormReturn<CreateCannedReplyPayload>;
  reply?: CannedReply;
}

export function CannedReplyForm({onSubmit, form, reply}: CannedReplyFormProps) {
  const {formId} = useDialogContext();
  const editorRef = useRef<Editor | null>(null);
  const [attachments, setAttachments] = useState<FileEntry[]>(
    reply?.attachments || []
  );
  const bodyError = form.formState.errors.body?.message;

  const handleSubmit = () => {
    onSubmit({
      ...form.getValues(),
      body: getReplyBody(editorRef),
      attachments: attachments.map(a => a.id),
    });
  };

  return (
    <Form
      id={formId}
      form={form}
      onSubmit={handleSubmit}
      onBeforeSubmit={() => form.clearErrors()}
    >
      <Fragment>
        <FileUploadProvider>
          <FormTextField
            autoFocus
            className="mb-24"
            label={<Trans message="Name" />}
            name="name"
          />
          <FormSwitch
            className="mb-24"
            name="shared"
            description={
              <Trans message="Shared replies will be visible to all agents, not just you." />
            }
          >
            <Trans message="Shared" />
          </FormSwitch>
          <ReplyEditor
            initialContent={reply?.body || ''}
            minHeight="min-h-[300px]"
            isLoading={false}
            editorRef={editorRef}
            attachments={attachments}
            onAttachmentsChange={attachments => setAttachments(attachments)}
            onSubmit={handleSubmit}
          />
          {bodyError && (
            <div className="pt-10 text-xs text-danger">{bodyError}</div>
          )}
        </FileUploadProvider>
      </Fragment>
    </Form>
  );
}
