import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PurchaseCode} from '@app/agent/purchase-code';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response extends BackendResponse {
  purchases?: PurchaseCode[];
}

interface Payload {
  userId: number | string;
  purchaseCode: string;
}

export function useAddPurchaseUsingCode(
  form: UseFormReturn<{purchaseCode: string}>,
) {
  return useMutation({
    mutationFn: (payload: Payload) => addPurchase(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['purchases']});
      toast(message('Purchase added'));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function addPurchase(payload: Payload): Promise<Response> {
  return apiClient
    .post(`users/${payload.userId}/envato/add-purchase-using-code`, payload)
    .then(r => r.data);
}
