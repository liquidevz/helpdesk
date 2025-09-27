import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import React from 'react';
import {
  CreateCannedReplyPayload,
  useCreateCannedReply,
} from '@app/agent/agent-ticket-page/canned-replies/requests/use-create-canned-reply';
import {useForm} from 'react-hook-form';
import {CannedReplyForm} from '@app/agent/agent-ticket-page/canned-replies/canned-reply-form';

export function CreateCannedReplyDialog() {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateCannedReplyPayload>({
    defaultValues: {
      shared: false,
    },
  });
  const createCannedReply = useCreateCannedReply(form);

  const handleSubmit = (value: CreateCannedReplyPayload) => {
    createCannedReply.mutate(value, {
      onSuccess: () => close(),
    });
  };

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="New saved reply" />
      </DialogHeader>
      <DialogBody>
        <CannedReplyForm form={form} onSubmit={handleSubmit} />
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          type="submit"
          form={formId}
          variant="flat"
          color="primary"
          disabled={createCannedReply.isPending}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
