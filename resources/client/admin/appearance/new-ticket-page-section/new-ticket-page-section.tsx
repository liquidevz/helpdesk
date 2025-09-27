import {Fragment} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {AppearanceButton} from '@common/admin/appearance/appearance-button';
import {Link} from 'react-router-dom';

export function NewTicketPageSection() {
  return (
    <Fragment>
      <FormTextField
        label={<Trans message="Title" />}
        className="mb-20"
        name="settings.hc.newTicket.appearance.title"
        inputElementType="textarea"
        rows={2}
      />
      <FormTextField
        label={<Trans message="Category label" />}
        className="mb-20"
        name="settings.hc.newTicket.appearance.categoryLabel"
        inputElementType="textarea"
        rows={2}
      />
      <FormTextField
        label={<Trans message="Subject label" />}
        className="mb-20"
        name="settings.hc.newTicket.appearance.subjectLabel"
        inputElementType="textarea"
        rows={2}
      />
      <FormTextField
        label={<Trans message="Description label" />}
        className="mb-20"
        name="settings.hc.newTicket.appearance.descriptionLabel"
        inputElementType="textarea"
        rows={2}
      />
      <FormTextField
        label={<Trans message="Submit button text" />}
        className="mb-20"
        name="settings.hc.newTicket.appearance.submitButtonText"
        inputElementType="textarea"
        rows={2}
      />
      <div className="mt-24 border-t pt-24">
        <FormTextField
          label={<Trans message="Sidebar title" />}
          className="mb-20"
          name="settings.hc.newTicket.appearance.sidebarTitle"
          inputElementType="textarea"
          rows={2}
        />
        <AppearanceButton to="sidebar" elementType={Link}>
          <Trans message="Sidebar tips" />
        </AppearanceButton>
      </div>
    </Fragment>
  );
}
