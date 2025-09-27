import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {Trigger} from '@app/admin/triggers/trigger';
import {useNavigate} from '@common/utils/hooks/use-navigate';

interface Response extends BackendResponse {
  trigger: Trigger;
}

export interface CreateTriggerPayload {
  name: string;
  description?: string;
  all_conditions: Trigger['all_conditions'];
  any_conditions: Trigger['any_conditions'];
  conditions: unknown; // for hook form error message only
  actions: Trigger['actions'];
}

export function useCreateTrigger(form: UseFormReturn<CreateTriggerPayload>) {
  const {trans} = useTrans();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props: CreateTriggerPayload) => createTrigger(props),
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('triggers'),
      });
      navigate(`/admin/triggers/${response.trigger.id}/edit`);
      toast(trans(message('Trigger created')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createTrigger(data: CreateTriggerPayload) {
  const payload = {
    ...data,
    conditions: data.all_conditions.concat(data.any_conditions),
  };
  return apiClient.post<Response>('triggers', payload).then(r => r.data);
}
