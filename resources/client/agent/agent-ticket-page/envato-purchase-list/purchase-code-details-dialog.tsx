import {PurchaseCode} from '@app/agent/purchase-code';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {Trans} from '@common/i18n/trans';
import {ReactNode} from 'react';
import {FormattedDate} from '@common/i18n/formatted-date';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Button} from '@common/ui/buttons/button';
import {useSyncEnvatoPurchases} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-sync-envato-purchases';

interface Props {
  purchaseCode: PurchaseCode;
}
export function PurchaseCodeDetailsDialog({purchaseCode}: Props) {
  const {close} = useDialogContext();
  const syncPurchases = useSyncEnvatoPurchases();
  return (
    <Dialog size="md">
      <DialogBody>
        <div className="flex items-start gap-14 text-sm">
          <img
            src={purchaseCode.image}
            alt=""
            className="h-80 w-80 flex-shrink-0 rounded"
          />
          <div className="flex-auto">
            <a
              href={purchaseCode.url}
              target="_blank"
              rel="noreferrer"
              className={LinkStyle}
            >
              {purchaseCode.item_name}
            </a>
            <div className="mt-4 text-sm text-muted">{purchaseCode.code}</div>
            <div className="mt-12">
              <Detail
                label={<Trans message="Customer" />}
                value={purchaseCode.envato_username}
              />
              <Detail
                label={<Trans message="Purchased" />}
                value={<FormattedDate date={purchaseCode.purchased_at} />}
              />
              <Detail
                label={<Trans message="Supported until" />}
                value={<FormattedDate date={purchaseCode.supported_until} />}
              />
              <Detail
                label={<Trans message="Last synced" />}
                value={<FormattedDate date={purchaseCode.updated_at} />}
              />
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          disabled={syncPurchases.isPending}
          onClick={() => syncPurchases.mutate({userId: purchaseCode.user_id})}
        >
          <Trans message="Sync purchases" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface DetailProps {
  label: ReactNode;
  value: ReactNode;
}
function Detail({label, value}: DetailProps) {
  return (
    <div className="mb-6 flex items-center gap-14">
      <div>{label}:</div>
      <div className="text-muted">{value}</div>
    </div>
  );
}
