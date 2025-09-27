import React, {cloneElement, ReactElement} from 'react';
import clsx from 'clsx';
import {Divider} from '@common/text-editor/menubar/divider';
import {FontStyleButtons} from '@common/text-editor/menubar/font-style-buttons';
import {ListButtons} from '@common/text-editor/menubar/list-buttons';
import {LinkButton} from '@common/text-editor/menubar/link-button';
import {ImageButton} from '@common/text-editor/menubar/image-button';
import {ClearFormatButton} from '@common/text-editor/menubar/clear-format-button';
import {IndentButtons} from '@common/text-editor/menubar/indent-buttons';
import {CodeBlockMenuTrigger} from '@common/text-editor/menubar/code-block-menu-trigger';
import {MenubarButtonProps} from '@common/text-editor/menubar/menubar-button-props';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {openUploadWindow} from '@common/uploads/utils/open-upload-window';
import {AttachmentIcon} from '@common/icons/material/Attachment';
import {FileEntry} from '@common/uploads/file-entry';
import {useUploadReplyAttachments} from '@app/reply-editor/use-upload-reply-attachments';

const MenubarRowClassName =
  'flex items-center px-4 h-42 text-muted border-b overflow-hidden';

interface Props extends MenubarButtonProps {
  justify?: string;
  onAttachmentUploaded: (entry: FileEntry) => void;
  endButtons?: ReactElement;
}
export function ReplyEditorMenubar({
  editor,
  size = 'sm',
  justify = 'justify-start',
  onAttachmentUploaded,
  endButtons,
}: Props) {
  const uploadAttachments = useUploadReplyAttachments({
    onSuccess: onAttachmentUploaded,
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
    <div className="h-42">
      <div className={clsx(MenubarRowClassName, justify, 'relative z-20')}>
        <Tooltip label={<Trans message="Upload attachments" />}>
          <IconButton size={size} onClick={() => handleUpload()}>
            <AttachmentIcon />
          </IconButton>
        </Tooltip>
        <Divider />
        <FontStyleButtons editor={editor} size={size} />
        <Divider />
        <ListButtons editor={editor} size={size} />
        <IndentButtons editor={editor} size={size} />
        <Divider />
        <LinkButton editor={editor} size={size} />
        <ImageButton editor={editor} size={size} diskPrefix="ticket_images" />
        <Divider />
        <CodeBlockMenuTrigger editor={editor} size={size} />
        <ClearFormatButton editor={editor} size={size} />
        {endButtons ? cloneElement(endButtons, {size}) : null}
      </div>
    </div>
  );
}
