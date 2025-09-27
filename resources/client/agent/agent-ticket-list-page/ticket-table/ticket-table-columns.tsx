import {ColumnConfig} from '@common/datatable/column-config';
import {Ticket} from '@app/agent/ticket';
import {Trans} from '@common/i18n/trans';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import React from 'react';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';

export const TicketTableColumns: ColumnConfig<Ticket>[] = [
  {
    key: 'user_id',
    allowsSorting: true,
    header: () => <Trans message="Customer" />,
    visibleInMode: 'all',
    width: 'w-132',
    body: ticket => (ticket.user ? ticket.user.display_name : '-'),
  },
  {
    key: 'avatar',
    header: () => <Trans message="Avatar" />,
    hideHeader: true,
    width: 'w-100 flex-shrink-0',
    body: ticket =>
      ticket.user ? (
        <img
          className="m-auto h-38 w-38 rounded-full"
          src={ticket.user.avatar}
          alt=""
        />
      ) : (
        '-'
      ),
  },
  {
    key: 'summary',
    header: () => <Trans message="Ticket summary" />,
    body: ticket => <TicketSummary ticket={ticket} />,
    width: 'flex-3 min-w-200',
  },
  {
    key: 'replies_count',
    header: () => <Trans message="Replies count" />,
    hideHeader: true,
    width: 'w-50',
    body: ticket => (
      <div className="w-max rounded border bg-alt px-6 text-xs font-normal text-muted">
        {ticket.replies_count || 1}
      </div>
    ),
  },
  {
    key: 'assigned_to',
    allowsSorting: true,
    header: () => <Trans message="Assigned to" />,
    width: 'w-124',
    body: ticket => (ticket.assignee ? ticket.assignee.display_name : ''),
  },
  {
    key: 'id',
    allowsSorting: true,
    header: () => <Trans message="Number" />,
    width: 'w-90',
    body: ticket => ticket.id,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    visibleInMode: 'all',
    width: 'w-144',
    body: ticket => <FormattedRelativeTime date={ticket.updated_at} />,
  },
];

interface TicketSummaryProps {
  ticket: Ticket;
}
function TicketSummary({ticket}: TicketSummaryProps) {
  const body = ticket.latest_reply?.body
    ? ticket.latest_reply.body
    : ticket.replies?.[0]?.body;
  const tags = ticket.tags?.filter(t => t.type !== 'status');

  return (
    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap pr-12">
      <div className="flex items-center gap-10">
        <ChipList size="xs" wrap={false}>
          {tags?.map(tag => (
            <Chip key={tag.id}>{tag.display_name || tag.name}</Chip>
          ))}
        </ChipList>
        <div>{ticket.subject}</div>
      </div>
      {body && (
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap pt-4 font-normal text-muted">
          {body}
        </div>
      )}
    </div>
  );
}
