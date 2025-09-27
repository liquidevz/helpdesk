import {useForm} from 'react-hook-form';
import React from 'react';
import {useTrigger} from '@app/admin/triggers/requests/use-trigger';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {Trigger} from '@app/admin/triggers/trigger';
import {
  UpdateTriggerPayload,
  useUpdateTrigger,
} from '@app/admin/triggers/requests/use-update-trigger';
import {CrupdateTriggerForm} from '@app/admin/triggers/form/crupdate-trigger-form';
import {
  FetchTriggerConfigResponse,
  useTriggerConfig,
} from '@app/admin/triggers/requests/use-trigger-config';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {PageErrorMessage} from '@common/errors/page-error-message';
import useSpinDelay from '@common/utils/hooks/use-spin-delay';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ArrowBackIcon} from '@common/icons/material/ArrowBack';
import {Link} from 'react-router-dom';

export function UpdateTriggerPage() {
  const triggerQuery = useTrigger();
  const configQuery = useTriggerConfig();
  const isLoading = triggerQuery.isPending || configQuery.isPending;
  const showSpinner = useSpinDelay(isLoading, {
    delay: 500,
    minDuration: 200,
  });

  if (triggerQuery.data && configQuery.data) {
    return (
      <PageContent
        trigger={triggerQuery.data.trigger}
        config={configQuery.data}
      />
    );
  }

  if (isLoading) {
    return showSpinner ? <FullPageLoader /> : null;
  }

  return <PageErrorMessage />;
}

interface PageContentProps {
  trigger: Trigger;
  config: FetchTriggerConfigResponse;
}
function PageContent({trigger, config}: PageContentProps) {
  const form = useForm<UpdateTriggerPayload>({
    defaultValues: {
      name: trigger.name,
      description: trigger.description,
      all_conditions: trigger.all_conditions,
      any_conditions: trigger.any_conditions,
      actions: trigger.actions,
    },
  });
  const updateTrigger = useUpdateTrigger(form);
  return (
    <CrupdateResourceLayout
      onSubmit={values => updateTrigger.mutate(values)}
      form={form}
      title={
        <Trans message="Edit “:name“ trigger" values={{name: trigger.name}} />
      }
      isLoading={updateTrigger.isPending}
      backButton={
        <IconButton
          elementType={Link}
          to="/admin/triggers"
          className="max-md:hidden"
        >
          <ArrowBackIcon />
        </IconButton>
      }
      wrapInContainer
    >
      <CrupdateTriggerForm config={config} />
    </CrupdateResourceLayout>
  );
}
