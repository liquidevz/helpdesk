import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

export interface MergeUsersPayload {
  user_id: number | string;
  mergee_id: number | string;
}

export function useMergeUsers(form: UseFormReturn<MergeUsersPayload>) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: mergeUsers,
    onSuccess: async () => {
      toast(message('Users merged'));
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['users'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['tickets'],
        }),
      ]);
      navigate('/agent/tickets');
    },
    onError: r => onFormQueryError(r, form),
  });
}

function mergeUsers(payload: MergeUsersPayload): Promise<BackendResponse> {
  return apiClient.post(`merge-users`, payload).then(response => response.data);
}
