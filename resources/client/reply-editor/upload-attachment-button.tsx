import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {IconButton} from '@common/ui/buttons/icon-button';
import {AttachmentIcon} from '@common/icons/material/Attachment';
import React from 'react';
import {openUploadWindow} from '@common/uploads/utils/open-upload-window';
import {useUploadReplyAttachments} from '@app/reply-editor/use-upload-reply-attachments';
import {FileEntry} from '@common/uploads/file-entry';

interface Props {
  size: 'sm' | 'md';
  onSuccess: (entry: FileEntry) => void;
}
export function UploadAttachmentButton({size, onSuccess}: Props) {
  const uploadAttachments = useUploadReplyAttachments({
    onSuccess,
  });
  const handleUpload = async () => {
    const files = await openUploadWindow({
      multiple: true,
    });
    if (files.length) {
      uploadAttachments(files);
    }
  };
  return (
    <Tooltip label={<Trans message="Upload attachments" />}>
      <IconButton size={size} onClick={() => handleUpload()}>
        <AttachmentIcon />
      </IconButton>
    </Tooltip>
  );
}
