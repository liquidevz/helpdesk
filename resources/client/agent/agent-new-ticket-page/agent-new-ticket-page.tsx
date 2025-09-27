import {useForm} from 'react-hook-form';
import {
  CreateTicketPayload,
  useCreateTicket,
} from '@app/agent/agent-new-ticket-page/use-create-ticket';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {
  GetMailboxSidenavTags,
  useMailboxSidenavTags,
} from '@app/agent/use-mailbox-sidenav-tags';
import React, {useRef, useState} from 'react';
import {PageStatus} from '@common/http/page-status';
import {AgentPageLayout} from '@app/agent/agent-page-layout';
import {Button} from '@common/ui/buttons/button';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import {Editor} from '@tiptap/react';
import {FileEntry} from '@common/uploads/file-entry';
import {getReplyBody} from '@app/reply-editor/get-reply-body';
import {getInputFieldClassNames} from '@common/ui/forms/input-field/get-input-field-class-names';
import {useSearchParams} from 'react-router-dom';

export function AgentNewTicketPage() {
  const query = useMailboxSidenavTags();
  return (
    <AgentPageLayout>
      <main className="container mx-auto p-12 md:p-24">
        <h1 className="mb-34 mt-14 text-3xl font-light">
          <Trans message="Create new ticket" />
        </h1>
        {query.data ? (
          <TicketForm tags={query.data} />
        ) : (
          <PageStatus query={query} show404={false} loaderIsScreen={false} />
        )}
      </main>
    </AgentPageLayout>
  );
}

interface TicketFormProps {
  tags: GetMailboxSidenavTags;
}
function TicketForm({tags: {statusTags, categoryTags}}: TicketFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customer_id');
  const form = useForm<CreateTicketPayload>({
    defaultValues: {
      category_id: categoryTags[0]?.id,
      status: statusTags[0]?.name,
      user_id: customerId ? parseInt(customerId) : undefined,
    },
  });
  const bodyError = form.formState.errors.body?.message;
  const createTicket = useCreateTicket(form);
  const editorRef = useRef<Editor | null>(null);
  const [attachments, setAttachments] = useState<FileEntry[]>([]);

  const handleSubmit = () => {
    createTicket.mutate(
      {
        ...form.getValues(),
        body: getReplyBody(editorRef) || '',
        attachments: attachments.map(a => a.id),
        created_by_agent: true,
      },
      {
        onSuccess: () => navigate('/agent/tickets'),
      },
    );
  };

  const inputFieldClassNames = getInputFieldClassNames();

  return (
    <Form
      form={form}
      onSubmit={() => handleSubmit()}
      onBeforeSubmit={() => form.clearErrors()}
    >
      <FormNormalizedModelField
        name="user_id"
        endpoint="normalized-models/user"
        label={<Trans message="Customer" />}
        className="mb-24"
        autoFocus
      />
      <FormTextField
        name="subject"
        label={<Trans message="Subject" />}
        className="mb-24"
      />
      <FormSelect
        name="category_id"
        label={<Trans message="Category" />}
        selectionMode="single"
        className="mb-24"
      >
        {categoryTags.map(category => (
          <Item key={category.id} value={category.id}>
            {category.display_name || category.name}
          </Item>
        ))}
      </FormSelect>
      <FormSelect
        name="status"
        label={<Trans message="Status" />}
        selectionMode="single"
        className="mb-24"
      >
        {statusTags.map(status => (
          <Item key={status.id} value={status.name}>
            {status.display_name || status.name}
          </Item>
        ))}
      </FormSelect>
      <div className="mb-24">
        <div className={inputFieldClassNames.label}>
          <Trans message="Reply body" />
        </div>
        <FileUploadProvider>
          <ReplyEditor
            autoFocus={false}
            minHeight="min-h-[300px]"
            isLoading={createTicket.isPending}
            editorRef={editorRef}
            attachments={attachments}
            onAttachmentsChange={attachments => setAttachments(attachments)}
            onSubmit={() => handleSubmit()}
          />
        </FileUploadProvider>
        {bodyError && (
          <div className={inputFieldClassNames.error}>{bodyError}</div>
        )}
      </div>
      <Button
        variant="flat"
        color="primary"
        type="submit"
        disabled={createTicket.isPending}
      >
        <Trans message="Create" />
      </Button>
    </Form>
  );
}
