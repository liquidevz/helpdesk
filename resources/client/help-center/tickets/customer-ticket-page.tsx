import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {HcSearchBar} from '@app/help-center/search/hc-search-bar';
import React, {Fragment, useRef, useState} from 'react';
import {PageStatus} from '@common/http/page-status';
import {
  GetTicketResponse,
  useTicket,
} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {TicketHeaderDateFormat} from '@app/agent/ticket-layout/ticket-header-layout';
import {useTicketReplies} from '@app/agent/agent-ticket-page/reply-list/requests/use-ticket-replies';
import {TicketReplyLayout} from '@app/agent/ticket-layout/ticket-reply-layout';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {FileEntry} from '@common/uploads/file-entry';
import {
  AttachmentListLayout,
  FileEntryAttachmentLayout,
} from '@app/agent/ticket-layout/attachment-list-layout';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Trans} from '@common/i18n/trans';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {ReplyEditor} from '@app/reply-editor/reply-editor';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {useSubmitCustomerReply} from '@app/help-center/tickets/use-submit-customer-reply';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {Button} from '@common/ui/buttons/button';
import {ReplyIcon} from '@common/icons/material/Reply';
import {TicketTagList} from '@app/agent/ticket-layout/ticket-tag-list';
import {Ticket} from '@app/agent/ticket';
import {Editor} from '@tiptap/react';
import {SendReplyButton} from '@app/reply-editor/send-reply-button';
import {useKeybind} from '@common/utils/keybinds/use-keybind';
import {SectionHelper} from '@common/ui/section-helper';
import {CheckIcon} from '@common/icons/material/Check';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {useChangeTicketStatus} from '@app/agent/ticket-actions/requests/use-change-ticket-status';
import {useParams} from 'react-router-dom';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

export function CustomerTicketPage() {
  const navigate = useNavigate();
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
            <Trans message="Current ticket" />
          </BreadcrumbItem>
        </Breadcrumb>
        <main>
          <Content />
        </main>
      </div>
    </div>
  );
}

function Content() {
  const query = useTicket();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  useKeybind('window', 'r', () => setEditorIsOpen(true));

  return (
    <Fragment>
      {query.data ? (
        <Fragment>
          {query.data.ticket.status === 'locked' && (
            <SectionHelper
              className="mb-44 text-center"
              color="danger"
              title={
                <Trans message="This ticket was locked due to inactivity. To reply, create a new ticket." />
              }
            />
          )}
          <Header
            ticket={query.data.ticket}
            editorIsOpen={editorIsOpen}
            onOpenEditor={() => setEditorIsOpen(true)}
          />
          <FileUploadProvider>
            {editorIsOpen && (
              <CustomerReplyEditor onClose={() => setEditorIsOpen(false)} />
            )}
          </FileUploadProvider>
          <ReplyList data={query.data} />
        </Fragment>
      ) : (
        <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
      )}
    </Fragment>
  );
}

interface CustomerReplyEditorProps {
  onClose: () => void;
}
function CustomerReplyEditor({onClose}: CustomerReplyEditorProps) {
  const editorRef = useRef<Editor | null>(null);
  const submitReply = useSubmitCustomerReply();
  const [attachments, setAttachments] = useState<FileEntry[]>([]);

  return (
    <ReplyEditor
      isLoading={submitReply.isPending}
      footerButtons={<SendReplyButton />}
      editorRef={editorRef}
      className="mb-24"
      attachments={attachments}
      onAttachmentsChange={attachments => setAttachments(attachments)}
      onSubmit={reply =>
        submitReply.mutate(reply, {
          onSuccess: () => onClose(),
        })
      }
    />
  );
}

interface HeaderProps {
  ticket: Ticket;
  editorIsOpen: boolean;
  onOpenEditor: () => void;
}
function Header({ticket, onOpenEditor, editorIsOpen}: HeaderProps) {
  return (
    <div className="mb-44">
      <div className="flex items-center gap-24">
        <div className="whitespace-nowrap text-muted max-md:hidden">
          <FormattedRelativeTime date={ticket.created_at} /> (
          <FormattedDate
            date={ticket.created_at}
            options={TicketHeaderDateFormat}
          />
          )
        </div>
        <div className="text-2xl md:ml-auto">#{ticket.id}</div>
        <Chip
          size="sm"
          color={!ticket.closed_at ? 'primary' : undefined}
          radius="rounded"
          className="min-w-60 font-bold capitalize"
        >
          {ticket.status}
        </Chip>
      </div>
      <h1 className="my-12 text-2xl">{ticket.subject}</h1>
      <div className="flex items-center gap-12">
        <TicketTagList
          ticket={ticket}
          tagType="category"
          size="sm"
          radius="rounded"
          className="mr-auto font-semibold max-md:hidden"
        />
        {!ticket.closed_at && <MarkAsSolvedButton />}
        <Button
          size="sm"
          variant="outline"
          startIcon={<ReplyIcon />}
          disabled={editorIsOpen}
          onClick={() => onOpenEditor()}
        >
          <Trans message="Add a reply" />
        </Button>
      </div>
    </div>
  );
}

interface ReplyListProps {
  data: GetTicketResponse;
}
function ReplyList({data: {ticket, replies}}: ReplyListProps) {
  const query = useTicketReplies(ticket.id, replies);
  return (
    <Fragment>
      {query.items.map(reply => {
        const isInitial =
          !query.hasNextPage && reply.id === query.items.at(-1)?.id;
        return (
          <TicketReplyLayout
            className="px-12"
            key={reply.id}
            reply={reply}
            isInitial={isInitial}
            attachments={
              reply.attachments?.length ? (
                <AttachmentList attachments={reply.attachments} />
              ) : null
            }
          />
        );
      })}
      <InfiniteScrollSentinel query={query} />
    </Fragment>
  );
}

interface AttachmentListProps {
  attachments: FileEntry[];
}
function AttachmentList({attachments}: AttachmentListProps) {
  return (
    <AttachmentListLayout className="mt-30 w-max">
      {attachments.map((attachment, index) => (
        <FileEntryAttachmentLayout
          key={attachment.id}
          attachments={attachments}
          index={index}
        />
      ))}
    </AttachmentListLayout>
  );
}

function MarkAsSolvedButton() {
  const changeStatus = useChangeTicketStatus();
  const {ticketId} = useParams();
  const navigate = useNavigate();
  return (
    <DialogTrigger type="modal">
      <Button size="sm" variant="outline" startIcon={<CheckIcon />}>
        <Trans message="Mark as solved" />
      </Button>
      {({close}) => (
        <ConfirmationDialog
          onConfirm={() => {
            changeStatus.mutate(
              {
                ids: [ticketId!],
                status: 'closed',
              },
              {
                onSuccess: () => {
                  close();
                  toast(message('Ticked marked as solved'));
                  navigate(`/hc/tickets`);
                },
              },
            );
          }}
          isLoading={changeStatus.isPending}
          title={<Trans message="Mark as solved" />}
          body={
            <Trans message="Are you sure you want to mark this ticket as solved?" />
          }
          confirm={<Trans message="Confirm" />}
        />
      )}
    </DialogTrigger>
  );
}
