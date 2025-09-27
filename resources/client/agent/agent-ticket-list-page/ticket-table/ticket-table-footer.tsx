import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import React from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {Ticket} from '@app/agent/ticket';

interface Props {
  onPerPageChange: (perPage: number) => void;
  onPageChange: (page: number) => void;
  query: UseQueryResult<PaginatedBackendResponse<Ticket>>;
}
export function TicketTableFooter({
  onPageChange,
  onPerPageChange,
  query,
}: Props) {
  return (
    <DataTablePaginationFooter
      className="flex-shrink-0"
      onPerPageChange={onPerPageChange}
      onPageChange={onPageChange}
      query={query}
    />
  );
}
