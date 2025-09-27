import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

export function useImportEnvatoItems() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: () => importItems(),
    onSuccess: () => {
      toast(trans(message('Envato items imported')));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importItems(): Promise<Response> {
  return apiClient.post('envato/items/import').then(r => r.data);
}
