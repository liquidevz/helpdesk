import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Tag} from '@common/tags/tag';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {CreateTicketCategoryPayload} from '@app/admin/ticket-categories/requests/use-create-ticket-category';

interface Response extends BackendResponse {
  tag: Tag;
}

export interface UpdateTicketCategoryPayload
  extends Partial<CreateTicketCategoryPayload> {}

export function useUpdateTicketCategory(
  categoryId: number | string,
  form: UseFormReturn<UpdateTicketCategoryPayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: UpdateTicketCategoryPayload) =>
      updateCategory(categoryId, props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('ticket-categories'),
      });
      toast(trans(message('Category updated')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateCategory(
  categoryId: number | string,
  formPayload: UpdateTicketCategoryPayload,
): Promise<Response> {
  const payload = {
    ...formPayload,
    categories: formPayload.categories?.map(c => c.id) ?? [],
  };
  return apiClient
    .put(`ticket-categories/${categoryId}`, payload)
    .then(r => r.data);
}
