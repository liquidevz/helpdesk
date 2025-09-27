import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Ticket} from '@app/agent/ticket';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {SearchSessionItem} from '@app/help-center/search/use-search-term-logger';

interface Response {
  ticket: Ticket;
}

export interface CreateTicketPayload {
  user_id: number;
  subject: string;
  category_id: number;
  status: string;
  body: string;
  attachments?: number[];
  created_by_agent?: boolean;
  suggestionLog?: SearchSessionItem[];
}

export function useCreateTicket(form: UseFormReturn<CreateTicketPayload>) {
  return useMutation({
    mutationFn: (payload: CreateTicketPayload) => createTicket(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tickets']});
      toast(message('Ticket created'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createTicket(payload: CreateTicketPayload) {
  return apiClient.post<Response>(`tickets`, payload).then(r => r.data);
}
