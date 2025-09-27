import {useSettings} from '@common/core/settings/use-settings';
import {useLocalStorage} from '@common/utils/hooks/local-storage';
import {useCallback} from 'react';
import {
  useMailboxParams,
  useNavigateToMailboxTicketTable,
} from '@app/agent/use-mailbox-params';
import {message} from '@common/i18n/message';
import {apiClient} from '@common/http/query-client';
import {Ticket} from '@app/agent/ticket';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {getTicketPageLink} from '@app/agent/agent-ticket-page/ticket-page-link';
import {useParams} from 'react-router-dom';

export const AfterReplyActions = {
  stay_on_page: message('Send and stay on page'),
  next_active_ticket: message('Send and next ticket'),
  back_to_folder: message('Send and back to folder'),
};

export type AfterReplyAction = keyof typeof AfterReplyActions;

export function useAfterReplyAction() {
  const {tagId} = useMailboxParams();
  const {ticketId} = useParams();
  const backToTicketTable = useNavigateToMailboxTicketTable();
  const {replies} = useSettings();
  const navigate = useNavigate();
  const defaultAction: AfterReplyAction =
    replies?.after_reply_action || 'next_active_ticket';
  const [action, setAction] = useLocalStorage<AfterReplyAction>(
    'after_reply_action',
    defaultAction,
  );
  const perform = useCallback(async () => {
    if (action === 'next_active_ticket') {
      const response = await apiClient.get<{ticket: Ticket}>(
        `tickets/${tagId}/next-active-ticket`,
      );
      if (response?.data.ticket) {
        if (ticketId === `${response.data.ticket.id}`) {
          backToTicketTable();
        } else {
          navigate(getTicketPageLink(response.data.ticket, {tagId}));
        }
      }
    } else if (action === 'back_to_folder') {
      backToTicketTable();
    }
  }, [action, backToTicketTable, tagId, navigate]);

  return {action, setAction, perform};
}
