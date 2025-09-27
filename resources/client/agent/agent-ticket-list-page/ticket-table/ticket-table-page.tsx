import {useTickets} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {Trans} from '@common/i18n/trans';
import React, {Fragment, useMemo, useState} from 'react';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import openedImage from './opened.svg';
import {
  useMailboxParams,
  useNavigateToMailboxTicketTable,
} from '@app/agent/use-mailbox-params';
import {TicketTableFooter} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-footer';
import {TicketTable} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table';
import {GlobalLoadingProgress} from '@app/agent/global-loading-progress';
import {TicketTableActions} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-actions';
import {AnimatePresence} from 'framer-motion';
import {SortDescriptor} from '@common/ui/tables/types/sort-descriptor';
import {useSearchParams} from 'react-router-dom';

export function TicketTablePage() {
  const [searchParams] = useSearchParams();
  const orderBy = searchParams.get('orderBy') || '';
  const orderDir = searchParams.get('orderDir') || '';
  const sortDescriptor = useMemo(() => {
    return {orderBy, orderDir: orderDir as SortDescriptor['orderDir']};
  }, [orderBy, orderDir]);
  const query = useTickets({
    ...useMailboxParams(),
    loader: 'ticketTable',
  });
  const {data, isLoading, isPlaceholderData} = query;
  const items = data?.pagination.data || [];
  const isEmpty = !isLoading && !isPlaceholderData && items.length === 0;
  const navigateToTicketTable = useNavigateToMailboxTicketTable();
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);

  return (
    <Fragment>
      <GlobalLoadingProgress query={query} />
      <div className="flex min-h-full min-w-0 flex-col">
        <div className="flex-auto">
          <TicketTable
            query={query}
            selectedTickets={selectedTickets}
            onSelectionChange={setSelectedTickets}
            sortDescriptor={sortDescriptor}
            onSortChange={value => {
              navigateToTicketTable({
                orderBy: value.orderBy,
                orderDir: value.orderDir,
              });
            }}
          />
          {isEmpty && (
            <IllustratedMessage
              className="mt-40"
              size="sm"
              image={<SvgImage src={openedImage} />}
              title={
                <Trans message="There are no tickets in this category yet." />
              }
            />
          )}
        </div>
        <TicketTableFooter
          query={query}
          onPageChange={page => navigateToTicketTable({page})}
          onPerPageChange={perPage => navigateToTicketTable({perPage})}
        />
        <AnimatePresence>
          {selectedTickets.length && (
            <TicketTableActions
              ticketIds={selectedTickets}
              onActionCompleted={() => setSelectedTickets([])}
            />
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}
