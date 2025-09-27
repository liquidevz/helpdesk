import {
  GetTicketResponse,
  useTicket,
} from '@app/agent/agent-ticket-page/requests/use-ticket';
import React, {Fragment} from 'react';
import {PageStatus} from '@common/http/page-status';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {TicketHeaderLayout} from '@app/agent/ticket-layout/ticket-header-layout';
import {TicketTagList} from '@app/agent/ticket-layout/ticket-tag-list';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {TicketReplyLayout} from '@app/agent/ticket-layout/ticket-reply-layout';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useTicketReplies} from '@app/agent/agent-ticket-page/reply-list/requests/use-ticket-replies';
import {FileEntry} from '@common/uploads/file-entry';
import {
  AttachmentListLayout,
  FileEntryAttachmentLayout,
} from '@app/agent/ticket-layout/attachment-list-layout';
import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {getTicketPageLink} from '@app/agent/agent-ticket-page/ticket-page-link';
import {Ticket} from '@app/agent/ticket';
import {useMergeTickets} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-merge-tickets';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';

interface Props {
  ticketId: number;
}
export function TicketPreviewDialog({ticketId}: Props) {
  const query = useTicket(ticketId);
  return (
    <Dialog size="fullscreen" className="h-dialog">
      <DialogHeader
        showDivider
        padding="px-24 py-12"
        titleFontWeight="font-normal"
        titleTextSize="text-base"
        justify="justify-start"
        actions={
          query.data?.ticket ? <Actions ticket={query.data?.ticket} /> : null
        }
      >
        <Trans message="Ticket preview" />
      </DialogHeader>
      <DialogBody className="bg" padding="p-0">
        {query.data ? (
          <Content data={query.data} />
        ) : (
          <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
        )}
      </DialogBody>
    </Dialog>
  );
}

interface ActionsProps {
  ticket: Ticket;
}
function Actions({ticket}: ActionsProps) {
  const {close} = useDialogContext();

  return (
    <Fragment>
      <Button
        elementType={Link}
        to={getTicketPageLink(ticket)}
        variant="outline"
        size="xs"
      >
        <Trans message="Open ticket" />
      </Button>
      <DialogTrigger
        type="modal"
        onClose={newTicket => {
          if (newTicket) {
            close();
          }
        }}
      >
        <Button variant="outline" size="xs" className="mr-48">
          <Trans message="Merge" />
        </Button>
        <ConfirmMergeDialog ticket={ticket} />
      </DialogTrigger>
    </Fragment>
  );
}

interface ConfirmMergeDialogProps {
  ticket: Ticket;
}
function ConfirmMergeDialog({ticket}: ConfirmMergeDialogProps) {
  const mergeTickets = useMergeTickets();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      title={<Trans message="Merge tickets" />}
      isLoading={mergeTickets.isPending}
      onConfirm={() => {
        mergeTickets.mutate(
          {mergeeId: ticket.id},
          {onSuccess: response => close(response.ticket)},
        );
      }}
      body={
        <div>
          <Trans message="Please confirm you'd like to merge this ticket with the original one behind the popup." />
          <p className="mt-12 font-semibold">
            <Trans message="Merged tickets cannot be unmerged." />
          </p>
        </div>
      }
      confirm={<Trans message="Merge" />}
    />
  );
}

interface ContentProps {
  data: GetTicketResponse;
}
function Content({data}: ContentProps) {
  return (
    <div>
      <TicketHeaderLayout ticket={data.ticket}>
        <TicketTagList ticket={data.ticket} />
      </TicketHeaderLayout>
      <ReplyList data={data} />
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
            key={reply.id}
            reply={reply}
            isInitial={isInitial}
            className="px-20"
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
