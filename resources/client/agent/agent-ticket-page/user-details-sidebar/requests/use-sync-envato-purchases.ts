import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {updateTicketQuery} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {PurchaseCode} from '@app/agent/purchase-code';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {useParams} from 'react-router-dom';

interface Response extends BackendResponse {
  purchases?: PurchaseCode[];
}

interface Payload {
  userId: number | string;
}

export function useSyncEnvatoPurchases() {
  const {ticketId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) => syncPurchases(payload),
    onSuccess: async response => {
      if (ticketId && response.purchases?.length) {
        updateTicketQuery(ticketId, old => {
          if (old.ticket.user) {
            old.ticket.user.purchase_codes = response.purchases;
          }
        });
      }
      await queryClient.invalidateQueries({queryKey: ['purchases']});
      toast(message('Imported purchases from envato'));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function syncPurchases(payload: Payload): Promise<Response> {
  return apiClient
    .post(`users/${payload.userId}/envato/sync-purchases`, payload)
    .then(r => r.data);
}
