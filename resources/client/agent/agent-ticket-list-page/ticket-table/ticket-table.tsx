import {Table} from '@common/ui/tables/table';
import {TicketTableColumns} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-columns';
import React from 'react';
import {RowElementProps} from '@common/ui/tables/table-row';
import {Ticket} from '@app/agent/ticket';
import clsx from 'clsx';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useMailboxParams} from '@app/agent/use-mailbox-params';
import {UseQueryResult} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {getTicketPageLink} from '@app/agent/agent-ticket-page/ticket-page-link';
import {SortDescriptor} from '@common/ui/tables/types/sort-descriptor';

interface Props {
  query: UseQueryResult<PaginatedBackendResponse<Ticket>>;
  selectedTickets?: number[];
  onSelectionChange?: (ticketIds: number[]) => void;
  sortDescriptor?: SortDescriptor;
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
}
export function TicketTable({
  query,
  selectedTickets,
  onSelectionChange,
  sortDescriptor,
  onSortChange,
}: Props) {
  const navigate = useNavigate();
  const {tagId} = useMailboxParams();
  return (
    <Table
      headerCellHeight="h-36"
      cellHeight="h-64"
      selectedRows={selectedTickets}
      onSelectionChange={values => onSelectionChange?.(values as number[])}
      columns={TicketTableColumns}
      data={query.data?.pagination.data || []}
      renderRowAs={TicketTableRow}
      onAction={ticket => navigate(getTicketPageLink(ticket, {tagId}))}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    />
  );
}

function TicketTableRow({
  children,
  item,
  className,
  ...domProps
}: RowElementProps<Ticket>) {
  return (
    <div
      className={clsx(
        className,
        item.status === 'open' && 'font-semibold',
        item.closed_at && 'bg-alt',
      )}
      {...domProps}
    >
      {children}
    </div>
  );
}
