import {Trans} from '@common/i18n/trans';
import {User} from '@common/auth/user';
import {AccountSettingsPanel} from '@common/auth/ui/account-settings/account-settings-panel';
import {useUserPurchases} from '@app/account-settings-purchases-panel/use-user-purchases';
import {UseQueryResult} from '@tanstack/react-query';
import {PurchaseCode} from '@app/agent/purchase-code';
import {ProgressCircle} from '@common/ui/progress/progress-circle';
import {PageErrorMessage} from '@common/errors/page-error-message';
import React, {Fragment} from 'react';
import clsx from 'clsx';
import {FormattedDate} from '@common/i18n/formatted-date';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {EnvatoIcon} from '@common/icons/social/envato';
import {Button} from '@common/ui/buttons/button';
import {useSyncEnvatoPurchases} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-sync-envato-purchases';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {AddPurchaseCodeDialog} from '@app/account-settings-purchases-panel/add-purchase-code-dialog';

interface Props {
  user: User;
}
export function AccountSettingsPurchasesPanel({}: Props) {
  const query = useUserPurchases('me');
  const syncPurchases = useSyncEnvatoPurchases();
  return (
    <AccountSettingsPanel
      id="purchases"
      title={<Trans message="Your purchases" />}
      actions={
        <Fragment>
          <DialogTrigger type="modal">
            <Button variant="outline" className="mr-12">
              <Trans message="Add purchase code" />
            </Button>
            <AddPurchaseCodeDialog userId="me" />
          </DialogTrigger>
          <Button
            variant="flat"
            color="primary"
            onClick={() => syncPurchases.mutate({userId: 'me'})}
            disabled={syncPurchases.isPending}
          >
            <Trans message="Import purchases from envato" />
          </Button>
        </Fragment>
      }
    >
      <Content query={query} />
    </AccountSettingsPanel>
  );
}

interface ContentProps {
  query: UseQueryResult<{purchases: PurchaseCode[]}>;
}
function Content({query}: ContentProps) {
  if (query.data) {
    if (!query.data.purchases.length) {
      return (
        <div>
          <IllustratedMessage
            size="sm"
            imageHeight="h-auto"
            title={<Trans message="Could not find any purchases" />}
            description={
              <Trans message="Try importing purchases from envato with the button below." />
            }
            imageMargin="mb-10"
            image={
              <div>
                <EnvatoIcon viewBox="0 0 50 50" className="text-envato" />
              </div>
            }
          />
        </div>
      );
    }
    return (
      <div>
        {query.data.purchases.map(purchase => (
          <div
            key={purchase.id}
            className="relative flex items-center gap-12 rounded py-10 hover:bg-hover"
          >
            <img src={purchase.image} alt="" className="h-64 w-64 rounded" />
            <div className="min-w-0 text-sm">
              <a
                href={purchase.url}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold"
              >
                <span className="absolute inset-0 rounded" />
                {purchase.item_name}
              </a>
              <div className="my-4 text-xs">
                <Trans
                  message="Purchase code: :code"
                  values={{code: purchase.code}}
                />
              </div>
              <div
                className={clsx(
                  'text-xs text-muted',
                  purchase.support_expired && 'line-through',
                )}
              >
                {purchase.supported_until ? (
                  <span>
                    <Trans message="Supported until:" />{' '}
                    <FormattedDate date={purchase.supported_until} />
                  </span>
                ) : (
                  <Trans message="Support expired" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (query.isLoading) {
    return (
      <div className="flex min-h-82 items-center justify-center">
        <ProgressCircle isIndeterminate />
      </div>
    );
  }

  return <PageErrorMessage />;
}
