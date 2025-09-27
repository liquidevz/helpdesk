import {Navigate, RouteObject, useRoutes} from 'react-router-dom';
import {AgentTicketListPage} from '@app/agent/agent-ticket-list-page/agent-ticket-list-page';
import {AgentSearchPage} from '@app/agent/agent-search-page/agent-search-page';
import {SearchTicketsTable} from '@app/agent/agent-search-page/search-tickets/search-tickets-table';
import {SearchUsersTable} from '@app/agent/agent-search-page/search-users-table';
import {SearchArticlesTable} from '@app/agent/agent-search-page/search-articles-table';
import {AgentTicketPage} from '@app/agent/agent-ticket-page/agent-ticket-page';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {AgentCannedRepliesPage} from '@app/agent/agent-canned-replies-page';
import {AgentNewTicketPage} from '@app/agent/agent-new-ticket-page/agent-new-ticket-page';
import {AgentCustomerPage} from '@app/agent/customer-page/agent-customer-page';
import {AgentCustomerPageTicketTable} from '@app/agent/customer-page/agent-customer-page-ticket-table';
import {CustomerSearchesTable} from '@app/agent/customer-page/customer-searches-table';

const RouteConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/agent/tickets" replace />,
  },
  {
    path: '/tickets',
    element: <AgentTicketListPage />,
  },
  {
    path: '/tickets/new',
    element: <AgentNewTicketPage />,
  },
  {
    path: '/tickets/:ticketId',
    element: <AgentTicketPage />,
  },
  {
    path: '/users/:userId',
    element: <AgentCustomerPage />,
    children: [
      {path: '', element: <Navigate to="tickets" replace />},
      {
        path: 'tickets',
        element: <AgentCustomerPageTicketTable />,
      },
      {
        path: 'searches',
        element: <CustomerSearchesTable />,
      },
    ],
  },
  {
    path: '/search',
    element: <AgentSearchPage />,
    children: [
      {
        path: '',
        element: <SearchTicketsTable />,
      },
      {
        path: 'tickets',
        element: <SearchTicketsTable />,
      },
      {
        path: 'users',
        element: <SearchUsersTable />,
      },
      {
        path: 'articles',
        element: <SearchArticlesTable />,
      },
    ],
  },
  {
    path: 'saved-replies',
    element: <AgentCannedRepliesPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default function AgentRoutes() {
  return useRoutes(RouteConfig);
}
