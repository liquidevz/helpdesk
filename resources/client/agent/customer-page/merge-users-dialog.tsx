import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {User} from '@common/auth/user';
import {Trans} from '@common/i18n/trans';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {
  MergeUsersPayload,
  useMergeUsers,
} from '@app/agent/customer-page/requests/use-merge-users';
import {message} from '@common/i18n/message';

interface Props {
  mergee: User;
}

export function MergeUsersDialog({mergee}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<MergeUsersPayload>({
    defaultValues: {
      mergee_id: mergee.id,
    },
  });
  const mergeUsers = useMergeUsers(form);
  const selectedUserId = form.watch('user_id');

  return (
    <Dialog>
      <DialogHeader>
        <Trans
          message="Merge ':name' into another user"
          values={{name: mergee.display_name}}
        />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            mergeUsers.mutate(values, {onSuccess: () => close()});
          }}
        >
          <FormNormalizedModelField
            name="user_id"
            endpoint="normalized-models/user"
            label={<Trans message="User to merge into" />}
            placeholder={message('Select user')}
            description={
              <Trans
                message="':name' will be deleted and all data belonging to them will be merged into selected user."
                values={{name: mergee.display_name}}
              />
            }
          />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          type="submit"
          variant="flat"
          color="primary"
          form={formId}
          disabled={!selectedUserId || mergeUsers.isPending}
        >
          <Trans message="Merge" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
