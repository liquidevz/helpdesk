import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useAddPurchaseUsingCode} from '@app/account-settings-purchases-panel/use-add-purchase-using-code';

interface Props {
  userId: number | string;
}
export function AddPurchaseCodeDialog({userId}: Props) {
  const form = useForm<{purchaseCode: string}>();
  const addPurchase = useAddPurchaseUsingCode(form);
  const {close, formId} = useDialogContext();
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add purchase code" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values =>
            addPurchase.mutate(
              {userId, purchaseCode: values.purchaseCode},
              {onSuccess: () => close()},
            )
          }
        >
          <FormTextField
            name="purchaseCode"
            label={<Trans message="Purchase code" />}
            autoFocus
          />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => close()}>
          <Trans message="Close" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          form={formId}
          disabled={addPurchase.isPending}
        >
          <Trans message="Add" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
