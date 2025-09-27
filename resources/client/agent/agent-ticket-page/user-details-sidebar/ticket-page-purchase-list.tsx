import {useMemo} from 'react';
import {PurchaseCode} from '@app/agent/purchase-code';
import {Trans} from '@common/i18n/trans';
import {PersonIcon} from '@common/icons/material/Person';
import {User} from '@common/auth/user';
import {Ticket} from '@app/agent/ticket';
import {UserDetailsSection} from '@app/agent/agent-ticket-page/user-details-sidebar/user-details-section';
import {EnvatoPurchaseList} from '@app/agent/agent-ticket-page/envato-purchase-list/envato-purchase-list';

interface Props {
  user: User;
  ticket: Ticket;
}
export function TicketPagePurchaseList({user, ticket}: Props) {
  const currentPurchase = useMemo(() => {
    const category = ticket.tags?.find(tag => tag.type !== 'status')
      ?.categories[0];
    let bestMatch: PurchaseCode | undefined;
    if (category) {
      const categoryName = category.name.toLowerCase();
      bestMatch = user.purchase_codes?.find(code => {
        return code.item_name.toLowerCase().indexOf(categoryName) > -1;
      });
    }
    return bestMatch || user.purchase_codes?.[0];
  }, [user, ticket]);

  return (
    <UserDetailsSection
      label={<Trans message="Envato" />}
      name="purchase-list-visible"
    >
      <div className="overflow-hidden">
        {currentPurchase && (
          <div className="mb-8 flex items-center gap-4 px-14 text-sm">
            <PersonIcon size="sm" />
            <a
              href={`https://codecanyon.net/user/${currentPurchase.envato_username}`}
              target="_blank"
              rel="noreferrer"
            >
              {currentPurchase.envato_username}
            </a>
          </div>
        )}
        <EnvatoPurchaseList
          purchases={user.purchase_codes || []}
          itemClassName="px-14"
          activePurchase={currentPurchase}
        />
      </div>
    </UserDetailsSection>
  );
}
