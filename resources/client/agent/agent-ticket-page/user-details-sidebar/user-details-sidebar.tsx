import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {getCustomerLink} from '@app/agent/customer-page/customer-link';
import {IconButton} from '@common/ui/buttons/icon-button';
import {SettingsIcon} from '@common/icons/material/Settings';
import {EmailIcon} from '@common/icons/material/Email';
import {useTicket} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {TicketPagePurchaseList} from '@app/agent/agent-ticket-page/user-details-sidebar/ticket-page-purchase-list';
import {useTickets} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {Fragment} from 'react';
import {Ticket} from '@app/agent/ticket';
import {UserDetailsSection} from '@app/agent/agent-ticket-page/user-details-sidebar/user-details-section';
import {Trans} from '@common/i18n/trans';
import {ActivityList} from '@app/agent/agent-ticket-page/user-details-sidebar/activity-list';
import {useSettings} from '@common/core/settings/use-settings';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {UserAvatar} from '@common/ui/images/user-avatar';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ButtonBase} from '@common/ui/buttons/button-base';
import {TicketPreviewDialog} from '@app/agent/agent-ticket-page/ticket-preview-dialog';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {Item} from '@common/ui/forms/listbox/item';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {ChangeCustomerDialog} from '@app/agent/agent-ticket-page/user-details-sidebar/change-customer-dialog';

interface Props {
  className?: string;
}
export function UserDetailsSidebar({className}: Props) {
  const {tickets} = useSettings();
  const {data} = useTicket();
  return (
    <div
      className={clsx(
        className,
        'compact-scrollbar stable-scrollbar overflow-y-auto border-l',
      )}
    >
      {data?.ticket.user && (
        <Fragment>
          <CustomerDetails ticket={data.ticket} />
          <OtherTickets ticket={data.ticket} />
          {tickets?.log_activity && <ActivityList ticket={data.ticket} />}
        </Fragment>
      )}
    </div>
  );
}

interface CustomerDetailsProps {
  ticket: Ticket;
}
function CustomerDetails({ticket}: CustomerDetailsProps) {
  const user = ticket.user!;
  const {envato} = useSettings();
  const editLink = getCustomerLink(user.id);
  return (
    <div className="py-14">
      <Link to={editLink} target="_blank">
        <UserAvatar user={user} size="xl" circle className="mx-auto" />
      </Link>
      <section className="mb-14 border-b px-14 pb-14 text-muted">
        <div className="mt-10 flex items-center justify-between gap-14 text-muted">
          <div>{user.display_name}</div>
          <MenuTrigger>
            <IconButton size="sm">
              <SettingsIcon />
            </IconButton>
            <Menu>
              <Item
                value="edit"
                elementType={Link}
                to={editLink}
                target="_blank"
              >
                <Trans message="Edit" />
              </Item>
              <Item
                value="changeCustomer"
                onSelected={() =>
                  openDialog(ChangeCustomerDialog, {ticketId: ticket.id})
                }
              >
                <Trans message="Change customer" />
              </Item>
            </Menu>
          </MenuTrigger>
        </div>
        <div className="flex items-center gap-4">
          <EmailIcon size="xs" />
          <div className="text-sm">{user.email}</div>
        </div>
        {!!user.tags?.length && (
          <ChipList size="xs" className="mt-14">
            {user.tags?.map(tag => (
              <Chip key={tag.id}>{tag.display_name}</Chip>
            ))}
          </ChipList>
        )}
      </section>
      {envato?.enable && <TicketPagePurchaseList user={user} ticket={ticket} />}
    </div>
  );
}

interface OtherTicketsProps {
  ticket: Ticket;
}
function OtherTickets({ticket}: OtherTicketsProps) {
  const user = ticket.user!;
  const {data, isLoading} = useTickets({
    userId: user.id,
    perPage: 6,
    paginate: 'simple',
  });

  const skeletons = (
    <m.div key="skeletons" {...opacityAnimation}>
      {Array.from({length: 5}).map((_, index) => (
        <Skeleton className="min-h-24" key={index} />
      ))}
    </m.div>
  );
  const tickets = (
    <m.div key="tickets" {...opacityAnimation}>
      {data?.pagination.data
        .filter(t => t.id !== ticket.id)
        .map(ticket => (
          <DialogTrigger type="modal" key={ticket.id}>
            <ButtonBase
              display="block"
              className={clsx(
                'block min-w-0 max-w-full overflow-hidden text-ellipsis pb-4 text-sm hover:underline',
                ticket.closed_at && 'text-muted',
              )}
            >
              {ticket.subject}
            </ButtonBase>
            <TicketPreviewDialog ticketId={ticket.id} />
          </DialogTrigger>
        ))}
    </m.div>
  );

  return (
    <UserDetailsSection
      label={<Trans message="Other tickets" />}
      name="other-tickets"
    >
      <AnimatePresence initial={false} mode="wait">
        <div className="space-y-10 px-14">
          {isLoading ? skeletons : tickets}
        </div>
      </AnimatePresence>
    </UserDetailsSection>
  );
}
