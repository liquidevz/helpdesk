import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import React from 'react';
import {ReplyEditorToolbarButtonsProps} from '@app/reply-editor/reply-editor';

export function SendReplyButton({
  isLoading,
  onSubmit,
}: ReplyEditorToolbarButtonsProps) {
  return (
    <Button
      variant="flat"
      color="primary"
      radius="rounded-none"
      disabled={isLoading}
      onClick={() => onSubmit?.()}
    >
      <Trans message="Send reply" />
    </Button>
  );
}
