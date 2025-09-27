import {toast} from '@common/ui/toast/toast';
import {useCallback} from 'react';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {UploadedFile} from '@common/uploads/uploaded-file';
import {useCallbackRef} from '@common/utils/hooks/use-callback-ref';
import {FileEntry} from '@common/uploads/file-entry';

const TwentyMB = 20 * 1024 * 1024;

interface Props {
  onSuccess: (entry: FileEntry) => void;
}
export function useUploadReplyAttachments(props: Props) {
  const onSuccess = useCallbackRef(props.onSuccess);
  const uploadMultiple = useFileUploadStore(s => s.uploadMultiple);
  return useCallback(
    (files: (File | UploadedFile)[]) => {
      uploadMultiple(files, {
        restrictions: {
          maxFileSize: TwentyMB,
        },
        onSuccess: entry => onSuccess(entry),
        onError: message => {
          if (message) {
            toast.danger(message);
          }
        },
      });
    },
    [uploadMultiple, onSuccess]
  );
}
