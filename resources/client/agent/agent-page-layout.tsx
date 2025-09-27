import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {AgentNavbar} from '@app/agent/agent-navbar';
import {DashboardNavbar} from '@common/ui/layout/dashboard-navbar';
import {
  DashboardSidenav,
  SidenavProps,
} from '@common/ui/layout/dashboard-sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import React, {ReactElement} from 'react';
import {AgentTicketListSidenav} from '@app/agent/agent-ticket-list-page/agent-ticket-list-sidenav';

interface Props {
  children: ReactElement;
  rightSidenav?: ReactElement<SidenavProps>;
}
export function AgentPageLayout({children, rightSidenav}: Props) {
  return (
    <DashboardLayout name="mailbox">
      <AgentNavbar element={DashboardNavbar} />
      <DashboardSidenav position="left" className="bg-alt">
        <AgentTicketListSidenav />
      </DashboardSidenav>
      <DashboardContent>
        <main>{children}</main>
      </DashboardContent>
      {rightSidenav}
    </DashboardLayout>
  );
}
