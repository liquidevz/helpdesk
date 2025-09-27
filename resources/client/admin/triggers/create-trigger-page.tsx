import {useForm} from 'react-hook-form';
import React from 'react';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {CrupdateTriggerForm} from '@app/admin/triggers/form/crupdate-trigger-form';
import {
  FetchTriggerConfigResponse,
  useTriggerConfig,
} from '@app/admin/triggers/requests/use-trigger-config';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {PageErrorMessage} from '@common/errors/page-error-message';
import useSpinDelay from '@common/utils/hooks/use-spin-delay';
import {
  CreateTriggerPayload,
  useCreateTrigger,
} from '@app/admin/triggers/requests/use-create-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Link} from 'react-router-dom';
import {ArrowBackIcon} from '@common/icons/material/ArrowBack';

export function CreateTriggerPage() {
  const configQuery = useTriggerConfig();
  const showSpinner = useSpinDelay(configQuery.isLoading, {
    delay: 500,
    minDuration: 200,
  });

  if (configQuery.data) {
    return <PageContent config={configQuery.data} />;
  }

  if (configQuery.isLoading) {
    return showSpinner ? <FullPageLoader /> : null;
  }

  return <PageErrorMessage />;
}

interface PageContentProps {
  config: FetchTriggerConfigResponse;
}
function PageContent({config}: PageContentProps) {
  const form = useForm<CreateTriggerPayload>();
  const createTrigger = useCreateTrigger(form);
  return (
    <CrupdateResourceLayout
      onSubmit={values => createTrigger.mutate(values)}
      form={form}
      title={<Trans message="Create new trigger" />}
      isLoading={createTrigger.isPending}
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
