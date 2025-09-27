import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {TriggerConditionSelector} from '@app/admin/triggers/form/trigger-condition-selector';
import {FetchTriggerConfigResponse} from '@app/admin/triggers/requests/use-trigger-config';
import {TriggerActionSelector} from '@app/admin/triggers/form/trigger-action-selector';

interface Props {
  config: FetchTriggerConfigResponse;
}
export function CrupdateTriggerForm({config}: Props) {
  return (
    <div>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        className="mb-24"
      />
      <FormTextField
        name="description"
        label={<Trans message="Description" />}
        inputElementType="textarea"
        rows={3}
        className="mb-44"
      />
      <TriggerConditionSelector
        matchType="all_conditions"
        className="mb-44"
        config={config}
      />
      <TriggerConditionSelector
        matchType="any_conditions"
        config={config}
        className="mb-44"
      />
      <TriggerActionSelector config={config} />
    </div>
  );
}
