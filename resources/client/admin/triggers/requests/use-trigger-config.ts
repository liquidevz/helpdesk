import {useQuery} from '@tanstack/react-query';
import {
  TriggerAction,
  TriggerActionInputConfig,
  TriggerCondition,
  TriggerOperator,
} from '@app/admin/triggers/trigger';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {groupArrayBy} from '@common/utils/array/group-array-by';

export interface FetchTriggerConfigResponse extends BackendResponse {
  actions: TriggerAction[];
  conditions: TriggerCondition[];
  operators: TriggerOperator[];
  groupedConditions: Record<string, TriggerCondition[]>;
  actionOptions: Record<
    NonNullable<TriggerActionInputConfig['select_options']>,
    {name: string; value: string; description?: string; image?: string}[]
  >;
}

export function useTriggerConfig() {
  return useQuery({
    queryKey: ['triggers', `config`],
    queryFn: () => fetchConfig(),
  });
}

async function fetchConfig() {
  const data = await apiClient
    .get<FetchTriggerConfigResponse>(`triggers/config`)
    .then(response => response.data);
  return {
    groupedConditions: groupArrayBy(
      data.conditions,
      item => {
        const [group] = item.name.split(':');
        return group.trim();
      },
      {
        map: item => {
          item.name = item.name.split(':')[1].trim();
          return item;
        },
      },
    ),
    conditions: data.conditions,
    operators: data.operators,
    actions: data.actions,
    actionOptions: data.actionOptions,
  };
}
