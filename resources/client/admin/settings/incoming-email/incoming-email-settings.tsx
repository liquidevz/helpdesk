import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {Trans} from '@common/i18n/trans';
import {Accordion, AccordionItem} from '@common/ui/accordion/accordion';
import {useFieldArray, useFormContext} from 'react-hook-form';
import React, {Fragment} from 'react';
import {AdminSettingsWithFiles} from '@common/admin/settings/requests/update-admin-settings';
import {AddIcon} from '@common/icons/material/Add';
import {Button} from '@common/ui/buttons/button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CrupdateImapConnectionDialog} from '@app/admin/settings/incoming-email/crupdate-imap-connection-dialog';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DeleteIcon} from '@common/icons/material/Delete';
import {SettingsIcon} from '@common/icons/material/Settings';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {useLocalStorage} from '@common/utils/hooks/local-storage';
import {useSettings} from '@common/core/settings/use-settings';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {ConnectGmailPanel} from '@common/admin/settings/pages/mail-settings/connect-gmail-panel';
import {SettingsErrorGroup} from '@common/admin/settings/settings-error-group';
import clsx from 'clsx';
import {LearnMoreLink} from '@common/admin/settings/learn-more-link';
import {MailNotSetupWarning} from '@common/admin/settings/pages/authentication-settings';
import {removeEmptyValuesFromObject} from '@common/utils/objects/remove-empty-values-from-object';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';

const clearEmptyValues = (values: AdminSettingsWithFiles) => {
  if (values.client?.incoming_email) {
    removeEmptyValuesFromObject(values.client.incoming_email, {
      copy: false,
      arrays: true,
      deep: true,
    });
  }
  if (
    values.client?.incoming_email &&
    Object.keys(values.client.incoming_email).length === 0
  ) {
    delete values.client.incoming_email;
  }
  return values;
};

export function IncomingEmailSettings() {
  const {
    branding: {site_name},
  } = useSettings();
  const [expandedValues, setExpandedValues] = useLocalStorage(
    'incoming-email-settings-expanded',
    [0, 1, 2],
  );
  return (
    <SettingsPanel
      title={<Trans message="Incoming email" />}
      transformValues={clearEmptyValues}
      description={
        <Fragment>
          <Trans
            message="Configure different handlers for turning incoming emails into tickets and replies. You can enable multiple handlers at the same time."
            values={{site: site_name}}
          />
          <LearnMoreLink
            className="mt-6 text-sm"
            link="https://support.vebto.com/hc/articles/42/44/155/incoming-emails"
          />
        </Fragment>
      }
    >
      <FormSwitch
        name="client.tickets.create_from_emails"
        className="mb-24"
        description={
          <Trans message="If email can't be matched to existing ticket, create a new ticket from it." />
        }
      >
        <Trans message="New ticket from emails" />
      </FormSwitch>
      <FormSwitch
        name="client.replies.create_from_emails"
        className="mb-24"
        description={
          <Trans message="If email can be matched to existing ticket, create a new reply for that ticket from the email." />
        }
      >
        <Trans message="Replies from emails" />
      </FormSwitch>
      <FormSwitch
        name="client.tickets.send_ticket_created_notification"
        className="mb-24"
        description={
          <Trans message="Send a notification to customer via email informing them that their ticket has been received." />
        }
      >
        <Trans message="Ticket received notification" />
      </FormSwitch>
      <TicketRejectedNotification />
      <SendRepliesSwitch />
      <FormTextField
        name="server.openai_api_key"
        className="mb-24"
        label={<Trans message="OpenAI API key" />}
        labelSuffix={
          <InfoDialogTrigger
            body={
              <Trans
                message="OpenAI API key is used to extract only relevant content from raw email. It will remove previous emails quoted by clients like gmail or outlook as well as signatures added by iPhone and other devices. :br This can be done by BeDesk without the API key, but it will be more consistent when using AI."
                values={{
                  br: (
                    <Fragment>
                      <br />
                      <br />
                    </Fragment>
                  ),
                }}
              />
            }
          />
        }
        labelSuffixPosition="inline"
      />
      <Accordion
        variant="outline"
        mode="multiple"
        expandedValues={expandedValues}
        onExpandedChange={values => setExpandedValues(values as number[])}
      >
        <AccordionItem label={<Trans message="IMAP" />}>
          <ImapPanel />
        </AccordionItem>
        <AccordionItem label={<Trans message="Pipe" />}>
          <PipePanel />
        </AccordionItem>
        <AccordionItem label={<Trans message="Rest API" />}>
          <ApiPanel />
        </AccordionItem>
        <AccordionItem label={<Trans message="Gmail API" />}>
          <GmailPanel />
        </AccordionItem>
        <AccordionItem label={<Trans message="Mailgun" />}>
          <MailgunPanel />
        </AccordionItem>
      </Accordion>
    </SettingsPanel>
  );
}

function ApiPanel() {
  const {
    base_url,
    branding: {site_name},
  } = useSettings();
  return (
    <div>
      <FormSwitch name="client.incoming_email.api.enabled">
        <Trans message="Enabled" />
      </FormSwitch>
      <p className="mt-10 text-xs text-muted">
        <Trans
          message="Send emails to :siteName from a 3rd party application or a different website using REST API."
          values={{siteName: site_name}}
        />
      </p>
      <LearnMoreLink
        className="mt-12 text-sm"
        link={`${base_url}/api-docs#Tickets-incomingEmail`}
      />
    </div>
  );
}

function MailgunPanel() {
  const {
    branding: {site_name},
  } = useSettings();
  return (
    <div>
      <FormSwitch name="client.incoming_email.mailgun.enabled">
        <Trans message="Enabled" />
      </FormSwitch>
      <p className="mt-10 text-xs text-muted">
        <Trans
          message="Send emails to :siteName using Mailgun inbound routes functionality."
          values={{siteName: site_name}}
        />
      </p>
      <FormTextField
        size="sm"
        className="mt-20"
        name="server.mailgun_secret"
        label={<Trans message="Mailgun API key" />}
      />
      <FormSwitch
        className="mt-14"
        name="client.incoming_email.mailgun.verify"
        description={
          <Trans message="Verify that incoming request is really from mailgun. It's highly recommended to have this on, unless you are not able to receive emails from mailgun otherwise." />
        }
      >
        <Trans message="Verify" />
      </FormSwitch>
      <LearnMoreLink
        className="mt-12 text-sm"
        link="https://support.vebto.com/hc/articles/42/44/155/incoming-emails#mailgun"
      />
    </div>
  );
}

function GmailPanel() {
  const {
    branding: {site_name},
  } = useSettings();
  const {watch} = useFormContext<AdminSettingsWithFiles>();
  const isEnabled = watch('client.incoming_email.gmail.enabled');
  return (
    <SettingsErrorGroup
      name="gmail_group"
      separatorBottom={false}
      separatorTop={false}
    >
      {isInvalid => (
        <Fragment>
          <FormSwitch
            name="client.incoming_email.gmail.enabled"
            invalid={isInvalid}
          >
            <Trans message="Enabled" />
          </FormSwitch>
          <p className="mt-10 text-xs text-muted">
            <Trans
              message="Connect your existing gmail acocunt using gmail API."
              values={{siteName: site_name}}
            />
          </p>
          <FormTextField
            invalid={isInvalid}
            name="client.incoming_email.gmail.topicName"
            minLength={10}
            required={isEnabled}
            label={<Trans message="Gmail topic name" />}
            description={<Trans message="Google cloud Pub/Sub topic name." />}
            className="my-20"
            size="sm"
          />
          <ConnectGmailPanel />
        </Fragment>
      )}
    </SettingsErrorGroup>
  );
}

function PipePanel() {
  const {
    branding: {site_name},
  } = useSettings();
  return (
    <div>
      <FormSwitch name="client.incoming_email.pipe.enabled">
        <Trans message="Enabled" />
      </FormSwitch>
      <p className="mt-10 text-xs text-muted">
        <Trans
          message="Pipe emails to :siteName from cpanel or another control panel used by your hosting provider."
          values={{siteName: site_name}}
        />
      </p>
      <LearnMoreLink
        className="mt-12 text-sm"
        link="https://support.vebto.com/hc/articles/42/44/155/incoming-emails#piping"
      />
    </div>
  );
}

function ImapPanel() {
  const {
    branding: {site_name},
  } = useSettings();
  const {fields, append, remove, update} = useFieldArray<
    AdminSettingsWithFiles,
    'client.incoming_email.imap.connections',
    'key'
  >({
    name: 'client.incoming_email.imap.connections',
    keyName: 'key',
  });

  return (
    <SettingsErrorGroup
      name="imap_group"
      separatorBottom={false}
      separatorTop={false}
    >
      {isInvalid => (
        <Fragment>
          <p className="mb-10 text-xs text-muted">
            <Trans
              message="Connect your existing email accounts to :siteName using IMAP."
              values={{siteName: site_name}}
            />
          </p>
          <div className="mb-20 space-y-14">
            {fields.map((field, index) => (
              <div
                className={clsx(
                  'flex items-center',
                  isInvalid && 'text-danger',
                )}
                key={field.key}
              >
                <div className="mr-auto">
                  <div>{field.name}</div>
                  <div className="text-xs text-muted">{field.username}</div>
                </div>
                <DialogTrigger
                  type="modal"
                  onClose={updatedConnection => {
                    if (updatedConnection) {
                      update(index, updatedConnection);
                    }
                  }}
                >
                  <Tooltip label={<Trans message="Edit" />}>
                    <IconButton size="sm" className="text-muted">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  <CrupdateImapConnectionDialog connection={field} />
                </DialogTrigger>
                <Tooltip label={<Trans message="Delete" />}>
                  <IconButton
                    size="sm"
                    className="text-muted"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
          </div>
          <DialogTrigger
            type="modal"
            onClose={connection => {
              if (connection) {
                append(connection);
              }
            }}
          >
            <Button
              variant="outline"
              color="primary"
              startIcon={<AddIcon />}
              size="xs"
            >
              <Trans message="Add connection" />
            </Button>
            <CrupdateImapConnectionDialog />
          </DialogTrigger>
          <LearnMoreLink
            className="mt-20 text-sm"
            link="https://support.vebto.com/hc/articles/42/44/155/incoming-emails#imap"
          />
        </Fragment>
      )}
    </SettingsErrorGroup>
  );
}

function TicketRejectedNotification() {
  const {watch} = useFormContext<AdminSettingsWithFiles>();
  if (watch('client.tickets.create_from_emails')) return null;
  return (
    <FormSwitch
      name="client.tickets.send_ticket_rejected_notification"
      className="mb-24"
      description={
        <Trans message="Send a notification to customer, if their ticket has not been created, because ticket creation via email is disabled." />
      }
    >
      <Trans message="Ticket rejected notification" />
    </FormSwitch>
  );
}

function SendRepliesSwitch() {
  const {watch} = useFormContext<AdminSettingsWithFiles>();
  return (
    <FormSwitch
      name="client.replies.send_email"
      className="mb-24"
      disabled={!watch('server.mail_setup')}
      description={
        <Fragment>
          <Trans message="When agent replies to ticket, send email to customer who created the ticket." />
          <MailNotSetupWarning />
        </Fragment>
      }
    >
      <Trans message="Send replies via email" />
    </FormSwitch>
  );
}
