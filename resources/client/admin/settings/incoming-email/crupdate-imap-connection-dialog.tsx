import {useForm} from 'react-hook-form';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import React from 'react';

import {ImapConnectionCredentials} from '@app/admin/settings/incoming-email/imap-connection-credentials';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {nanoid} from 'nanoid';

interface Props {
  connection?: ImapConnectionCredentials;
}

export function CrupdateImapConnectionDialog({connection}: Props) {
  const form = useForm<ImapConnectionCredentials>({
    defaultValues: connection
      ? connection
      : {
          id: nanoid(6).toLowerCase(),
          createTickets: true,
          createReplies: true,
        },
  });
  const {formId, close} = useDialogContext();

  return (
    <Dialog>
      <DialogHeader>
        {connection ? (
          <Trans message="Edit connection" />
        ) : (
          <Trans message="New connection" />
        )}
      </DialogHeader>
      <DialogBody>
        <Form form={form} id={formId} onSubmit={values => close(values)}>
          <FormTextField
            autoFocus
            required
            name="name"
            label={<Trans message="Name" />}
            className="mb-14"
          />
          <FormTextField
            required
            name="host"
            placeholder="imap.gmail.com"
            label={<Trans message="Host" />}
            className="mb-14"
          />
          <FormTextField
            required
            name="username"
            placeholder="username@gmail.com"
            type="email"
            label={<Trans message="Username" />}
            className="mb-14"
          />
          <FormTextField
            required
            type="password"
            name="password"
            label={<Trans message="Password" />}
            className="mb-14"
          />
          <FormTextField
            name="port"
            type="number"
            label={<Trans message="Port" />}
            placeholder="993"
            className="mb-14"
          />
          <FormTextField
            name="folder"
            label={<Trans message="Folder" />}
            className="mb-14"
            description={
              <Trans message="From which folder emails should be imported. Leave empty to import all emails in the inbox." />
            }
          />
          <FormSwitch
            name="createTickets"
            className="mb-14 mt-28"
            description={
              <Trans message="Create new tickets from emails received via this connection." />
            }
          >
            <Trans message="Create new tickets" />
          </FormSwitch>
          <FormSwitch
            name="createReplies"
            description={
              <Trans message="If email is in reply to existing ticket, create a new reply." />
            }
          >
            <Trans message="Create replies" />
          </FormSwitch>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button type="submit" form={formId} variant="flat" color="primary">
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
