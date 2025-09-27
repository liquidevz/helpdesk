import {ColumnConfig} from '@common/datatable/column-config';
import {Ticket} from '@app/agent/ticket';
import {Trans} from '@common/i18n/trans';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import React from 'react';

export const CustomerTicketTableColumns: ColumnConfig<Ticket>[] = [
  {
    key: 'subject',
    visibleInMode: 'all',
    header: () => <Trans message="Subject" />,
    body: ticket => ticket.subject,
    width: 'flex-3 min-w-200',
  },
  {
    key: 'id',
    allowsSorting: true,
    header: () => <Trans message="Id" />,
    width: 'w-90',
    body: ticket => `#${ticket.id}`,
  },
  {
    key: 'created_at',
    allowsSorting: true,
    header: () => <Trans message="Created" />,
    width: 'w-144',
    body: ticket => <FormattedRelativeTime date={ticket.created_at} />,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    width: 'w-144',
    body: ticket => <FormattedRelativeTime date={ticket.updated_at} />,
  },
  {
    key: 'status',
    allowsSorting: true,
    header: () => <Trans message="Status" />,
    visibleInMode: 'all',
    width: 'w-80',
    body: ticket => (
      <div className="w-max">
        <Chip
          size="sm"
          color={!ticket.closed_at ? 'primary' : undefined}
          radius="rounded-md"
          className="font-medium capitalize"
        >
          <Trans message={ticket.status} />
        </Chip>
      </div>
    ),
  },
];
