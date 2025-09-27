import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {CreateTriggerPayload} from '@app/admin/triggers/requests/use-create-trigger';
import {Trigger} from '@app/admin/triggers/trigger';
import {useParams} from 'react-router-dom';
import {useNavigate} from '@common/utils/hooks/use-navigate';

interface Response extends BackendResponse {
  trigger: Trigger;
}

export interface UpdateTriggerPayload extends CreateTriggerPayload {}

export function useUpdateTrigger(form: UseFormReturn<UpdateTriggerPayload>) {
  const {trans} = useTrans();
  const {triggerId} = useParams();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props: UpdateTriggerPayload) =>
      updateTrigger(triggerId!, props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('triggers'),
      });
      navigate('/admin/triggers');
      toast(trans(message('Trigger updated')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateTrigger(triggerId: number | string, data: UpdateTriggerPayload) {
  const payload = {
    ...data,
    conditions: removeTempIds(data.all_conditions.concat(data.any_conditions)),
    actions: removeTempIds(data.actions || []),
  };
  return apiClient
    .put<Response>(`triggers/${triggerId}`, payload)
    .then(r => r.data);
}

function removeTempIds(items: {id?: number | string}[]) {
  return items.map(item => {
    if (item.id?.toString().startsWith('temp_')) {
      delete item.id;
    }
    return item;
  });
}
