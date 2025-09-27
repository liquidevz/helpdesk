import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {UploadedFile} from '@common/uploads/uploaded-file';

interface Payload {
  file: UploadedFile;
}

export function useImportHcDataFromZip() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: Payload) => importData(payload),
    onSuccess: () => {
      toast(trans(message('Help center data imported')));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importData(payload: Payload): Promise<Response> {
  const formData = new FormData();
  formData.append('file', payload.file.native);
  return apiClient.post('hc/actions/import', formData).then(r => r.data);
}
