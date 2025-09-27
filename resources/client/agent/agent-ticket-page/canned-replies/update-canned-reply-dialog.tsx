import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import React from 'react';
import {CreateCannedReplyPayload} from '@app/agent/agent-ticket-page/canned-replies/requests/use-create-canned-reply';
import {useForm} from 'react-hook-form';
import {CannedReply} from '@app/agent/agent-ticket-page/canned-replies/canned-reply';
import {useUpdateCannedReply} from '@app/agent/agent-ticket-page/canned-replies/requests/use-update-canned-reply';
import {CannedReplyForm} from '@app/agent/agent-ticket-page/canned-replies/canned-reply-form';

interface Props {
  reply: CannedReply;
}
export function UpdateCannedReplyDialog({reply}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateCannedReplyPayload>({
    defaultValues: {
      name: reply.name,
      body: reply.body,
      shared: reply.shared,
      attachments: reply.attachments?.map(a => a.id),
    },
  });
  const updateCannedReply = useUpdateCannedReply(form, reply.id);

  const handleSubmit = (value: CreateCannedReplyPayload) => {
    updateCannedReply.mutate(value, {
      onSuccess: () => close(),
    });
  };

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Update saved reply" />
      </DialogHeader>
      <DialogBody>
        <CannedReplyForm form={form} onSubmit={handleSubmit} reply={reply} />
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
          disabled={updateCannedReply.isPending}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
