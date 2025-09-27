import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {Trigger} from '@app/admin/triggers/trigger';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';

export interface FetchTriggerResponse extends BackendResponse {
  trigger: Trigger;
}

export function useTrigger() {
  const {triggerId} = useParams();
  return useQuery({
    queryKey: ['triggers', `${triggerId}`],
    queryFn: () => fetchTrigger(triggerId!),
  });
}

async function fetchTrigger(triggerId: number | string) {
  const data = await apiClient
    .get<FetchTriggerResponse>(`triggers/${triggerId}`)
    .then(response => response.data);
  data.trigger['all_conditions'] = data.trigger.conditions!.filter(
    c => c.match_type === 'all',
  );
  data.trigger['any_conditions'] = data.trigger.conditions!.filter(
    c => c.match_type === 'any',
  );
  return data;
}
