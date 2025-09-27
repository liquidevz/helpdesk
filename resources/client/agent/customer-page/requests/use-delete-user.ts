import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {useNavigate} from '@common/utils/hooks/use-navigate';

interface Payload {
  userId: number | string;
}

export function useDeleteUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      toast(message('User deleted'));
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
    onError: r => showHttpErrorToast(r),
  });
}

function deleteUser(payload: Payload): Promise<BackendResponse> {
  return apiClient
    .delete(`users/${payload.userId}`)
    .then(response => response.data);
}
