import {PurchaseCode} from '@app/agent/purchase-code';
import {Trans} from '@common/i18n/trans';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import clsx from 'clsx';
import {FormattedDate} from '@common/i18n/formatted-date';
import {PurchaseCodeDetailsDialog} from '@app/agent/agent-ticket-page/envato-purchase-list/purchase-code-details-dialog';
import React from 'react';

interface Props {
  purchases: PurchaseCode[];
  activePurchase?: PurchaseCode;
  itemClassName?: string;
}
export function EnvatoPurchaseList({
  purchases,
  itemClassName,
  activePurchase,
}: Props) {
  return (
    <div>
      {purchases.map(purchase => (
        <DialogTrigger type="modal" key={purchase.id}>
          <div
            className={clsx(
              'flex cursor-pointer items-center gap-8 rounded py-8 hover:bg-hover',
              itemClassName,
              activePurchase?.code === purchase.code && 'bg-primary-light/30',
            )}
          >
            <img src={purchase.image} alt="" className="h-30 w-30 rounded" />
            <div className="min-w-0 text-xs">
              <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {purchase.item_name}
              </div>
              <div
                className={clsx(
                  'text-muted',
                  purchase.support_expired && 'line-through',
                )}
              >
                {purchase.supported_until ? (
                  <FormattedDate date={purchase.supported_until} />
                ) : purchase.support_expired ? (
                  <Trans message="Support expired" />
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>
          <PurchaseCodeDetailsDialog purchaseCode={purchase} />
        </DialogTrigger>
      ))}
    </div>
  );
}
