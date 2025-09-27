import {RouteObject, useRoutes} from 'react-router-dom';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import React from 'react';
import {CustomerTicketListPage} from '@app/help-center/tickets/customer-ticket-list-page/customer-ticket-list-page';
import {CustomerTicketPage} from '@app/help-center/tickets/customer-ticket-page';
import {CustomerNewTicketPage} from '@app/help-center/tickets/customer-new-ticket-page/customer-new-ticket-page';

const RouteConfig: RouteObject[] = [
  {
    path: '/',
    element: <CustomerTicketListPage />,
  },
  {
    path: '/new',
    element: <CustomerNewTicketPage />,
  },
  {
    path: ':ticketId',
    element: <CustomerTicketPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default function HcTicketRoutes() {
  return useRoutes(RouteConfig);
}
