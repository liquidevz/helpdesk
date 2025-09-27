import {useSearchTickets} from '@app/agent/agent-search-page/requests/use-search-tickets';
import {TicketTable} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table';
import React, {useState} from 'react';
import {SearchTableLayout} from '@app/agent/agent-search-page/search-table-layout';
import {AnimatePresence} from 'framer-motion';
import {TicketTableActions} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-actions';

export function SearchTicketsTable() {
  const query = useSearchTickets();
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  return (
    <SearchTableLayout query={query}>
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
    </SearchTableLayout>
  );
}
