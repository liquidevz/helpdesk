import {useMailboxSidenavTags} from '@app/agent/use-mailbox-sidenav-tags';
import {useChangeTicketStatus} from '@app/agent/ticket-actions/requests/use-change-ticket-status';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {TicketActionButton} from '@app/agent/ticket-actions/ticket-action-button';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import React, {useState} from 'react';
import {ChangeStatusIcon} from '@app/agent/ticket-actions/icons/change-status-icon';
import {useKeybind} from '@common/utils/keybinds/use-keybind';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';

interface Props {
  ticketIds: number[];
  onSuccess?: () => void;
  isCompact?: boolean;
}
export function ChangeTicketStatusButton({
  ticketIds,
  onSuccess,
  isCompact,
}: Props) {
  const {data} = useMailboxSidenavTags();
  const changeStatus = useChangeTicketStatus();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind('window', 's', () => setIsOpen(true));

  return (
    <MenuTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onItemSelected={newStatus =>
        changeStatus.mutate(
          {ids: ticketIds, status: newStatus as string},
          {
            onSuccess: () => {
              onSuccess?.();
              toast(message('Status changed'));
            },
          },
        )
      }
    >
      <TicketActionButton
        isCompact={isCompact}
        startIcon={<ChangeStatusIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={changeStatus.isPending}
      >
        <Trans message="Change status (s)" />
      </TicketActionButton>
      <Menu>
        {data?.statusTags.map(tag => (
          <Item key={tag.id} value={tag.name} capitalizeFirst>
            {tag.display_name || tag.name}
          </Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
