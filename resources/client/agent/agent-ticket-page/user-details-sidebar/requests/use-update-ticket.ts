import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Ticket} from '@app/agent/ticket';

interface Response extends BackendResponse {
  ticket: Ticket;
}

export interface UpdateTicketPayload {
  user_id?: number;
  subject?: string;
  status?: string;
  category_id?: number;
}

export function useUpdateTicket(
  ticketId: number | string,
  form?: UseFormReturn<UpdateTicketPayload>,
) {
  return useMutation({
    mutationFn: (payload: UpdateTicketPayload) =>
      updateTicket(ticketId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tickets']});
    },
    onError: err =>
      form ? onFormQueryError(err, form) : showHttpErrorToast(err),
  });
}

function updateTicket(
  ticketId: number | string,
  payload: UpdateTicketPayload,
): Promise<Response> {
  return apiClient.put(`tickets/${ticketId}`, payload).then(r => r.data);
}
