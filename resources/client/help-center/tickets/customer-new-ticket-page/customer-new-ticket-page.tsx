import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {HcSearchBar} from '@app/help-center/search/hc-search-bar';
import React, {ReactNode, useRef, useState} from 'react';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Trans} from '@common/i18n/trans';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useCustomerTicketCategories} from '@app/help-center/tickets/customer-new-ticket-page/use-customer-ticket-categories';
import {useForm} from 'react-hook-form';
import {
  CreateTicketPayload,
  useCreateTicket,
} from '@app/agent/agent-new-ticket-page/use-create-ticket';
import {Editor} from '@tiptap/react';
import {FileEntry} from '@common/uploads/file-entry';
import {getReplyBody} from '@app/reply-editor/get-reply-body';
import {getInputFieldClassNames} from '@common/ui/forms/input-field/get-input-field-class-names';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import {Button} from '@common/ui/buttons/button';
import {TicketTag} from '@app/agent/ticket';
import {useCustomerNewTicketConfig} from '@app/help-center/tickets/customer-new-ticket-page/use-customer-new-ticket-config';
import {SuggestedArticlesDrawer} from '@app/help-center/tickets/customer-new-ticket-page/suggested-articles-drawer';
import {
  SearchSessionItem,
  useSearchTermLogger,
} from '@app/help-center/search/use-search-term-logger';
import {useSettings} from '@common/core/settings/use-settings';

export function CustomerNewTicketPage() {
  const navigate = useNavigate();
  const config = useCustomerNewTicketConfig();
  const query = useCustomerTicketCategories();
  const {envato} = useSettings();
  return (
    <div>
      <Navbar menuPosition="header">
        <HcSearchBar />
      </Navbar>
      <div className="container mx-auto px-12 pb-48 md:px-24">
        <Breadcrumb size="sm" className="mb-34 mt-34 md:mb-48">
          <BreadcrumbItem onSelected={() => navigate(`/hc`)}>
            <Trans message="Help center" />
          </BreadcrumbItem>
          <BreadcrumbItem onSelected={() => navigate(`/hc/tickets`)}>
            <Trans message="Requests" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Trans message="New request" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="flex items-stretch gap-44">
          <main className="flex-auto">
            <h1 className="mb-34 mt-14 text-3xl font-light">
              <Trans message={config!.title} />
            </h1>
            {query.error && envato?.enable && envato.require_purchase_code && (
              <EnvatoError />
            )}
            {query.data ? (
              <TicketForm ticketCategories={query.data.pagination.data} />
            ) : null}
          </main>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

interface TicketFormProps {
  ticketCategories: TicketTag[];
}
function TicketForm({ticketCategories}: TicketFormProps) {
  const config = useCustomerNewTicketConfig();
  const navigate = useNavigate();
  const form = useForm<CreateTicketPayload>({
    defaultValues: {
      category_id: ticketCategories[0]?.id,
    },
  });
  const bodyError = form.formState.errors.body?.message;
  const createTicket = useCreateTicket(form);
  const editorRef = useRef<Editor | null>(null);
  const [attachments, setAttachments] = useState<FileEntry[]>([]);
  const searchQuery = form.watch('subject');
  const hcCategoryIds = ticketCategories
    .find(tc => form.watch('category_id') == tc.id)
    ?.categories.map(hc => hc.id);
  const searchTermLogger = useSearchTermLogger();
  const suggestionLog = useRef<SearchSessionItem[]>([]);

  const selectedCategoryId = form.watch('category_id');
  const selectedCategory = ticketCategories.find(
    c => c.id == selectedCategoryId,
  );

  const handleSubmit = () => {
    createTicket.mutate(
      {
        ...form.getValues(),
        body: getReplyBody(editorRef) || '',
        attachments: attachments.map(a => a.id),
        suggestionLog: suggestionLog.current,
      },
      {
        onSuccess: () => {
          searchTermLogger.updateLastSearch({createdTicket: true});
          navigate('/hc/tickets');
        },
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
      <FormSelect
        name="category_id"
        label={<Trans message={config!.categoryLabel} />}
        selectionMode="single"
        className="mb-24"
        errorMessage={
          selectedCategory &&
          selectedCategory.support_expired && (
            <Trans
              message="Your support for this item has expired. <a>Click here to renew</a>"
              values={{
                a: content => (
                  <a
                    href="https://codecanyon.net/downloads"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline"
                  >
                    {content}
                  </a>
                ),
              }}
            />
          )
        }
      >
        {ticketCategories.map(category => (
          <Item key={category.id} value={category.id}>
            {category.display_name || category.name}
          </Item>
        ))}
      </FormSelect>
      <FormTextField
        name="subject"
        label={<Trans message={config!.subjectLabel} />}
      />
      <SuggestedArticlesDrawer
        query={searchQuery}
        suggestionLog={suggestionLog}
        hcCategoryIds={hcCategoryIds}
      />
      <div className="my-24">
        <div className={inputFieldClassNames.label}>
          <Trans message={config!.descriptionLabel} />
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
        <Trans message={config!.submitButtonText} />
      </Button>
    </Form>
  );
}

function Sidebar() {
  const config = useCustomerNewTicketConfig();
  return (
    <aside className="w-500 border-l px-40 max-md:hidden">
      <h2 className="mb-34 text-xl font-medium">
        <Trans message={config.sidebarTitle} />
      </h2>
      {config.sidebarTips?.map((tip, index) => (
        <SidebarTip key={index} title={<Trans message={tip.title} />}>
          <Trans message={tip.content} />
        </SidebarTip>
      ))}
    </aside>
  );
}

interface SidebarTipProps {
  title: ReactNode;
  children: ReactNode;
}
function SidebarTip({title, children}: SidebarTipProps) {
  return (
    <div className="mb-30">
      <h3 className="text-lg font-medium">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function EnvatoError() {
  return (
    <div className="text-sm text-danger">
      <Trans message="There was an issue fetching your purchase codes from envato. Try to logout and use 'login with envato' button." />
    </div>
  );
}
