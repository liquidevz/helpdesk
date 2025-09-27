import {Reply} from '@app/agent/reply';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {getCustomerLink} from '@app/agent/customer-page/customer-link';
import {UserAvatar} from '@common/ui/images/user-avatar';
import {useAuth} from '@common/auth/use-auth';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {ReplyListDraftActions} from '@app/agent/agent-ticket-page/reply-list/reply-list-draft-actions';
import React, {ReactNode, useEffect, useRef} from 'react';
import {highlightAllCode} from '@common/text-editor/highlight/highlight-code';

const replyDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

interface Props {
  reply: Reply;
  isInitial?: boolean;
  actions?: ReactNode;
  attachments?: ReactNode;
  className?: string;
}
export function TicketReplyLayout({
  reply,
  isInitial,
  actions,
  attachments,
  className,
}: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bodyRef.current) {
      highlightAllCode(bodyRef.current);
    }
  }, []);

  return (
    <div
      className={clsx(
        'flex items-start gap-20 border-x-2 border-t border-x-transparent py-24',
        reply.type === 'drafts' && 'border-l-primary',
        reply.type === 'notes' && 'border-l-warning bg-warning/6',
        className,
      )}
    >
      {reply.user && (
        <Link
          to={getCustomerLink(reply.user.id)}
          className="flex-shrink-0 max-md:hidden"
          target="_blank"
        >
          <UserAvatar user={reply.user} size="w-50 h-50" circle />
        </Link>
      )}
      <div className="min-w-0 flex-auto">
        <ReplyHeader reply={reply} isInitial={isInitial} actions={actions} />
        <div
          ref={bodyRef}
          className="ticket-reply-body mr-24 text-sm"
          dangerouslySetInnerHTML={{__html: reply.body}}
        />
        {attachments}
      </div>
    </div>
  );
}

interface ReplyHeaderProps {
  reply: Reply;
  isInitial?: boolean;
  actions?: ReactNode;
}
function ReplyHeader({reply, isInitial, actions}: ReplyHeaderProps) {
  const {user: currentUser} = useAuth();
  return (
    <div className="mb-14 flex items-center">
      <div className="font-medium">
        {reply.user?.id === currentUser?.id ? (
          <Trans message="You" />
        ) : (
          reply.user?.display_name
        )}
      </div>
      <div className="ml-4">
        <ReplySuffix reply={reply} isInitial={isInitial} />
      </div>
      <div className="ml-auto mr-4 flex-shrink-0 text-xs text-muted">
        <FormattedDate date={reply.created_at} options={replyDateFormat} />
      </div>
      {actions}
    </div>
  );
}

function ReplySuffix({reply, isInitial}: ReplyHeaderProps) {
  switch (reply.type) {
    case 'drafts':
      return (
        <div className="flex items-center">
          <span className="text-primary">
            <Trans message="created a draft" />
          </span>
          <ReplyListDraftActions draft={reply} />
        </div>
      );
    case 'notes':
      return (
        <span className="text-warning">
          <Trans message="left a note" />
        </span>
      );
    case 'replies':
      if (isInitial) {
        return (
          <span className="text-muted max-md:hidden">
            <Trans message="started the conversaion" />
          </span>
        );
      }
      return (
        <span className="text-muted">
          <Trans message="replied" />
        </span>
      );
  }
}
