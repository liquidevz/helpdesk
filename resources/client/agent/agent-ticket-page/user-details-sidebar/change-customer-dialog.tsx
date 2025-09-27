import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Form} from '@common/ui/forms/form';
import {useForm} from 'react-hook-form';
import {
  UpdateTicketPayload,
  useUpdateTicket,
} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-update-ticket';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';

interface Props {
  ticketId: string | number;
}
export function ChangeCustomerDialog({ticketId}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateTicketPayload>();
  const updateTicket = useUpdateTicket(ticketId, form);
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Change customer" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            updateTicket.mutate(values, {onSuccess: () => close()});
          }}
        >
          <FormNormalizedModelField
            required
            name="user_id"
            endpoint="normalized-models/user"
            label={<Trans message="New customer" />}
          />
        </Form>
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
          disabled={updateTicket.isPending}
        >
          <Trans message="Change" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
