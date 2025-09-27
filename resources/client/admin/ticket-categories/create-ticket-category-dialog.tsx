import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdateTicketCategoryForm} from '@app/admin/ticket-categories/crupdate-ticket-category-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {
  CreateTicketCategoryPayload,
  useCreateTicketCategory,
} from '@app/admin/ticket-categories/requests/use-create-ticket-category';

export function CreateTicketCategoryDialog() {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateTicketCategoryPayload>();
  const createCategory = useCreateTicketCategory(form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add ticket category" />
      </DialogHeader>
      <DialogBody>
        <CrupdateTicketCategoryForm
          formId={formId}
          form={form}
          onSubmit={values => {
            createCategory.mutate(values, {
              onSuccess: () => close(),
            });
          }}
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={createCategory.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
