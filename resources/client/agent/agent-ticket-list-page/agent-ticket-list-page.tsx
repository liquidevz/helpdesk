import React from 'react';
import {TicketTablePage} from '@app/agent/agent-ticket-list-page/ticket-table/ticket-table-page';
import {AgentPageLayout} from '@app/agent/agent-page-layout';

export function AgentTicketListPage() {
  return (
    <AgentPageLayout>
      <TicketTablePage />
    </AgentPageLayout>
  );
}
