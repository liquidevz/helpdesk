import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdateTicketCategoryForm} from '@app/admin/ticket-categories/crupdate-ticket-category-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {TicketTag} from '@app/agent/ticket';
import {
  UpdateTicketCategoryPayload,
  useUpdateTicketCategory,
} from '@app/admin/ticket-categories/requests/use-update-ticket-category';

interface Props {
  tag: TicketTag;
}
export function UpdateTicketCategoryDialog({tag}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateTicketCategoryPayload>({
    defaultValues: {
      name: tag.name,
      display_name: tag.display_name,
      categories: tag.categories,
    },
  });
  const updateCategory = useUpdateTicketCategory(tag.id, form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update ticket category" />
      </DialogHeader>
      <DialogBody>
        <CrupdateTicketCategoryForm
          formId={formId}
          form={form as any}
          onSubmit={values => {
            updateCategory.mutate(values, {
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
          disabled={updateCategory.isPending}
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
