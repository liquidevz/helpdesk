import {useParams, useSearchParams} from 'react-router-dom';
import {useTickets} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {TicketTable} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table';
import React, {useState} from 'react';
import {GlobalLoadingProgress} from '@app/agent/global-loading-progress';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {Trans} from '@common/i18n/trans';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {AnimatePresence} from 'framer-motion';
import {TicketTableActions} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-actions';

export function AgentCustomerPageTicketTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {userId} = useParams();
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const query = useTickets({
    userId,
    page: searchParams.get('page') || 1,
    perPage: searchParams.get('perPage') ?? '',
    loader: 'ticketTable',
  });

  const {data, fetchStatus, isLoading, isPlaceholderData} = query;
  const items = data?.pagination.data || [];
  const isEmpty =
    (fetchStatus === 'idle' && items.length === 0) ||
    (!isLoading && !isPlaceholderData && items.length === 0);

  return (
    <div className="relative">
      <GlobalLoadingProgress query={query} />
      <TicketTable
        query={query}
        selectedTickets={selectedTickets}
        onSelectionChange={setSelectedTickets}
      />
      <AnimatePresence>
        {selectedTickets.length && (
          <TicketTableActions
            ticketIds={selectedTickets}
            onActionCompleted={() => setSelectedTickets([])}
          />
        )}
      </AnimatePresence>
      {isEmpty && (
        <IllustratedMessage
          className="mt-48"
          image={<SvgImage src={searchImage} />}
          title={<Trans message="User has not created any tickets yet" />}
        />
      )}
      <DataTablePaginationFooter
        query={query}
        onPageChange={page =>
          setSearchParams(prev => {
            prev.set('page', page.toString());
            return prev;
          })
        }
        onPerPageChange={perPage =>
          setSearchParams(prev => {
            prev.set('perPage', perPage.toString());
            return prev;
          })
        }
      />
    </div>
  );
}
