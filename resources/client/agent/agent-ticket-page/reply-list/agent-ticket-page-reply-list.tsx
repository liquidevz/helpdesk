import {GetTicketResponse} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React from 'react';
import {useTicketPageStore} from '@app/agent/agent-ticket-page/ticket-page-store';
import {useTicketReplies} from '@app/agent/agent-ticket-page/reply-list/requests/use-ticket-replies';
import {Reply} from '@app/agent/reply';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {MoreVertIcon} from '@common/icons/material/MoreVert';
import {Item} from '@common/ui/forms/listbox/item';
import {Trans} from '@common/i18n/trans';
import {closeDialog, openDialog} from '@common/ui/overlays/store/dialog-store';
import {useDeleteReply} from '@app/agent/agent-ticket-page/reply-list/requests/use-delete-reply';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {TicketReplyLayout} from '@app/agent/ticket-layout/ticket-reply-layout';
import {ReplyAttachmentList} from '@app/agent/agent-ticket-page/reply-list/reply-attachment-list';
import {UpdateReplyDialog} from '@app/agent/agent-ticket-page/reply-list/update-reply-dialog';
import {OriginalEmailPreviewDialog} from '@app/agent/agent-ticket-page/reply-list/original-email-preview-dialog';

interface Props {
  data: GetTicketResponse;
}
export function AgentTicketPageReplyList({
  data: {ticket, replies, draft},
}: Props) {
  const editorIsOpen = useTicketPageStore(s => s.editorIsOpen);
  const showDraft = draft && !editorIsOpen;
  const query = useTicketReplies(ticket.id, replies);

  return (
    <div>
      {showDraft && (
        <TicketReplyLayout
          reply={draft}
          className="pl-20 pr-8"
          actions={<ReplyActionsButton reply={draft} />}
        />
      )}
      {query.items.map(reply => {
        const isInitial =
          !query.hasNextPage && reply.id === query.items.at(-1)?.id;
        return (
          <TicketReplyLayout
            className="pl-20 pr-8"
            key={reply.id}
            reply={reply}
            isInitial={isInitial}
            actions={<ReplyActionsButton reply={reply} />}
            attachments={<ReplyAttachmentList reply={reply} />}
          />
        );
      })}
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}

interface ReplyActionsButtonProps {
  reply: Reply;
}
function ReplyActionsButton({reply}: ReplyActionsButtonProps) {
  return (
    <MenuTrigger>
      <IconButton className="text-muted" size="sm">
        <MoreVertIcon />
      </IconButton>
      <Menu>
        <Item
          value="edit"
          onClick={() => openDialog(UpdateReplyDialog, {reply})}
        >
          <Trans message="Edit" />
        </Item>
        {reply.type === 'replies' && (
          <Item
            value="showOriginal"
            onClick={() =>
              openDialog(OriginalEmailPreviewDialog, {replyId: reply.id})
            }
          >
            <Trans message="Show original" />
          </Item>
        )}
        <Item
          value="delete"
          onClick={() => openDialog(ConfirmDeleteReplyDialog, {reply})}
        >
          <Trans message="Delete" />
        </Item>
      </Menu>
    </MenuTrigger>
  );
}

interface ConfirmDeleteReplyDialogProps {
  reply: Reply;
}
function ConfirmDeleteReplyDialog({reply}: ConfirmDeleteReplyDialogProps) {
  const deleteReply = useDeleteReply();
  let title = <Trans message="Delete reply" />;
  let body = <Trans message="Are you sure you want to delete this reply?" />;
  if (reply.type === 'notes') {
    title = <Trans message="Delete note" />;
    body = <Trans message="Are you sure you want to delete this note?" />;
  }
  return (
    <ConfirmationDialog
      isDanger
      title={title}
      body={body}
      confirm={<Trans message="Delete" />}
      onConfirm={() =>
        deleteReply.mutate(
          {reply},
          {
            onSuccess: () => closeDialog(),
          },
        )
      }
      isLoading={deleteReply.isPending}
    />
  );
}
