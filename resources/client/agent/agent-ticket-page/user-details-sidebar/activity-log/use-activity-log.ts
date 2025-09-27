import {ActivityLogItem} from '@app/agent/agent-ticket-page/user-details-sidebar/activity-log/activity-log-item';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';

interface Params {
  userId: number | string;
}

export function useActivityLog(params: Params) {
  return useInfiniteData<ActivityLogItem>({
    queryKey: ['activity-log'],
    endpoint: 'activity-log',
    paginate: 'simple',
    queryParams: params as any,
  });
}
