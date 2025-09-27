import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {Article} from '@app/help-center/articles/article';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Response extends BackendResponse {
  article: Article;
}

export interface UpdateUserDetailsPayload {
  language?: string;
  country?: string;
  timezone?: string;
  details?: string;
  notes?: string;
  emails?: {id?: number; address: string}[];
  tags?: string[];
}

export function useUpdateUserDetails(
  userId: string | number,
  form: UseFormReturn<UpdateUserDetailsPayload>,
) {
  return useMutation({
    mutationFn: (payload: UpdateUserDetailsPayload) =>
      updateDetails(userId!, payload),
    onSuccess: async () => {
      form.reset({}, {keepValues: true});
      await queryClient.invalidateQueries({queryKey: ['users']});
      toast(message('User details updated'));
    },
    onError: err =>
      form ? onFormQueryError(err, form) : showHttpErrorToast(err),
  });
}

function updateDetails(
  userId: string | number,
  payload: UpdateUserDetailsPayload,
): Promise<Response> {
  return apiClient.put(`users/${userId}/details`, payload).then(r => r.data);
}
