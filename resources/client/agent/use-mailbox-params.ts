import {useSearchParams} from 'react-router-dom';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {PaginateTicketsParams} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {useCallback} from 'react';

const defaultPage = '1';
const defaultPerPage = '20';

export function useMailboxParams() {
  const [searchParams] = useSearchParams();
  const tagId = searchParams.get('tagId') || 'unassigned';
  return {
    tagId,
    page: searchParams.get('page') || defaultPage,
    perPage: searchParams.get('perPage') || defaultPerPage,
    orderBy: searchParams.get('orderBy') || '',
    orderDir: searchParams.get('orderDir') || '',
  };
}

export function useNavigateToMailboxTicketTable() {
  const navigate = useNavigate();
  const urlParams = useMailboxParams();
  return useCallback(
    (userParams: PaginateTicketsParams = {}) => {
      const link = getMailboxTicketTableLink(urlParams, userParams);
      navigate(link);
    },
    [urlParams, navigate],
  );
}

export function useMailboxTicketTableLink(
  userParams: PaginateTicketsParams = {},
) {
  const urlParams = useMailboxParams();
  return getMailboxTicketTableLink(urlParams, userParams);
}

function getMailboxTicketTableLink(
  urlParams: Record<string, string>,
  userParams: PaginateTicketsParams = {},
) {
  const tagId = userParams.tagId || urlParams.tagId;
  const page = `${userParams.page || urlParams.page}`;
  const perPage = `${userParams.perPage || urlParams.perPage}`;

  // if orderBy/orderDir is set as undefined in user params, it means sorting
  // was reset on the table, and we should clear all sorting params from url
  const orderBy =
    'orderBy' in userParams ? userParams.orderBy : urlParams.orderBy;
  const orderDir =
    'orderDir' in userParams ? userParams.orderDir : urlParams.orderDir;
  let link = `/agent/tickets?tagId=${tagId}`;
  if (page !== defaultPage) {
    link += `&page=${page}`;
  }
  if (perPage !== defaultPerPage) {
    link += `&perPage=${perPage}`;
  }
  if (orderBy) {
    link += `&orderBy=${orderBy}`;
  }
  if (orderDir) {
    link += `&orderDir=${orderDir}`;
  }
  return link;
}
