import {User} from '@common/auth/user';
import {useSettings} from '@common/core/settings/use-settings';
import React, {Fragment, ReactElement, ReactNode} from 'react';
import {Trans} from '@common/i18n/trans';
import {EnvatoPurchaseList} from '@app/agent/agent-ticket-page/envato-purchase-list/envato-purchase-list';
import {useFieldArray, useForm} from 'react-hook-form';
import {getLocalTimeZone} from '@internationalized/date';
import {useValueLists} from '@common/http/value-lists';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Button} from '@common/ui/buttons/button';
import {TimezoneSelect} from '@common/auth/ui/account-settings/timezone-select';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {
  UpdateUserDetailsPayload,
  useUpdateUserDetails,
} from '@app/agent/customer-page/requests/use-update-user-details';
import {AddIcon} from '@common/icons/material/Add';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {FormSelect} from '@common/ui/forms/select/select';
import {Option} from '@common/ui/forms/combobox/combobox';
import {message} from '@common/i18n/message';
import {useTrans} from '@common/i18n/use-trans';
import {DashboardSidenavChildrenProps} from '@common/ui/layout/dashboard-sidenav';
import {FormattedDate} from '@common/i18n/formatted-date';

const borderColor = 'border border-fg-base/6 hover:border-divider';

interface Props extends DashboardSidenavChildrenProps {
  user?: User;
}
export function AgentCustomerPageSidebar({user, className}: Props) {
  const {envato} = useSettings();

  return (
    <aside className={className}>
      {user && <FormWrapper user={user} />}
      {envato?.enable && !!user?.purchase_codes && (
        <Fragment>
          <div className="mb-4 mt-24 text-lg font-semibold">
            <Trans message="Envato purchases" />
          </div>
          <EnvatoPurchaseList purchases={user.purchase_codes} />
        </Fragment>
      )}
    </aside>
  );
}

interface FormWrapperProps {
  user: User;
}
function FormWrapper({user}: FormWrapperProps) {
  const form = useForm<UpdateUserDetailsPayload>({
    defaultValues: {
      language: user.language || '',
      country: user.country || '',
      timezone: user.timezone || getLocalTimeZone(),
      notes: user.details?.notes || '',
      details: user.details?.details || '',
      emails: user.secondary_emails,
      tags: user.tags?.map(tag => tag.name),
    },
  });
  const updateDetails = useUpdateUserDetails(user.id, form);

  return (
    <Form form={form} onSubmit={values => updateDetails.mutate(values)}>
      <div className="space-y-12">
        <EmailsSection user={user} />
        <LocalizationFields user={user} />
        <Detail label={<Trans message="Tags" />}>
          <FormChipField
            name="tags"
            size="sm"
            chipSize="xs"
            valueKey="name"
            inputBorder={borderColor}
          />
        </Detail>
        <DetailsField />
        <NotesField />
        <Detail label={<Trans message="Last login" />}>
          {user.last_login ? (
            <FormattedDate date={user.last_login.created_at} />
          ) : (
            '-'
          )}
        </Detail>
        <Detail label={<Trans message="Created at" />}>
          {user.created_at ? <FormattedDate date={user.created_at} /> : '-'}
        </Detail>
      </div>
      {form.formState.isDirty && (
        <Button
          color="primary"
          variant="flat"
          type="submit"
          size="sm"
          display="block"
          className="mt-14 w-full"
          disabled={updateDetails.isPending}
        >
          <Trans message="Save" />
        </Button>
      )}
    </Form>
  );
}

interface EmailsSectionProps {
  user: User;
}
function EmailsSection({user}: EmailsSectionProps) {
  const {fields, append, remove} = useFieldArray<
    UpdateUserDetailsPayload,
    'emails',
    'key'
  >({
    name: 'emails',
    keyName: 'key',
  });
  return (
    <Detail
      label={
        <div className="mt-4">
          <Trans message="Emails" />
        </div>
      }
      align="items-start"
    >
      <div>
        <div className="flex items-center justify-between gap-12">
          <div className="min-w-0 flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap">
            {user.email}
          </div>
          <Tooltip label={<Trans message="Add email" />}>
            <IconButton
              size="xs"
              iconSize="sm"
              onClick={() => append({address: ''})}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="space-y-4 pt-6">
          {fields.map((field, index) => (
            <div key={field.key} className="flex items-center gap-8">
              <FormTextField
                name={`emails.${index}.address`}
                className="flex-auto"
                size="xs"
                type="email"
                inputBorder={borderColor}
              />
              <IconButton
                color="danger"
                size="xs"
                iconSize="sm"
                onClick={() => remove(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </Detail>
  );
}

interface LocalizationFieldsProps {
  user: User;
}
function LocalizationFields({user}: LocalizationFieldsProps) {
  const {trans} = useTrans();
  const {data} = useValueLists(['timezones', 'countries', 'localizations']);
  const countries = data?.countries || [];
  const localizations = data?.localizations || [];
  const timezones = data?.timezones || {};
  return (
    <Fragment>
      <Detail label={<Trans message="Timezone" />}>
        <TimezoneSelect
          name="timezone"
          timezones={timezones}
          size="sm"
          inputBorder={borderColor}
        />
      </Detail>
      <Detail label={<Trans message="Language" />}>
        <FormSelect
          selectionMode="single"
          name="language"
          size="sm"
          inputBorder={borderColor}
        >
          {localizations.map(localization => (
            <Option key={localization.language} value={localization.language}>
              {localization.name}
            </Option>
          ))}
        </FormSelect>
      </Detail>
      <Detail label={<Trans message="Country" />}>
        <FormSelect
          selectionMode="single"
          size="sm"
          name="country"
          showSearchField
          searchPlaceholder={trans(message('Search countries'))}
          inputBorder={borderColor}
        >
          {countries.map(country => (
            <Option key={country.code} value={country.code}>
              {country.name}
            </Option>
          ))}
        </FormSelect>
      </Detail>
    </Fragment>
  );
}

function DetailsField() {
  return (
    <Detail
      label={
        <div className="flex items-center gap-1">
          <div>
            <Trans message="Details" />
          </div>
          <InfoDialogTrigger
            dialogSize="xs"
            body={
              <Trans message="Optional information, like address. Only visible to agents, not end users." />
            }
          />
        </div>
      }
    >
      <FormTextField
        name="details"
        inputElementType="textarea"
        rows={1}
        inputBorder={borderColor}
      />
    </Detail>
  );
}

function NotesField() {
  return (
    <Detail
      label={
        <div className="flex items-center gap-1">
          <div>
            <Trans message="Notes" />
          </div>
          <InfoDialogTrigger
            dialogSize="xs"
            body={
              <Trans message="Optional notes. Only visible to agents, not end users." />
            }
          />
        </div>
      }
    >
      <FormTextField
        name="notes"
        inputElementType="textarea"
        rows={1}
        inputBorder={borderColor}
      />
    </Detail>
  );
}

interface DetailProps {
  label: ReactElement;
  children: ReactNode;
  align?: string;
}
function Detail({label, children, align = 'items-center'}: DetailProps) {
  return (
    <div className={`flex ${align} gap-12`}>
      <div className="w-80 flex-shrink-0 text-sm text-muted">{label}</div>
      <div className="min-w-0 flex-auto text-sm">{children}</div>
    </div>
  );
}
