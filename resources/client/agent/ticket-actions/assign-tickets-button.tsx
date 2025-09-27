import {useAgents} from '@app/agent/ticket-actions/requests/use-agents';
import {useAssignTicketsToAgent} from '@app/agent/ticket-actions/requests/use-assign-tickets-to-aggent';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import {UserAvatar} from '@common/ui/images/user-avatar';
import React, {useState} from 'react';
import {TicketActionButton} from '@app/agent/ticket-actions/ticket-action-button';
import {AssignTicketIcon} from '@app/agent/ticket-actions/icons/assign-ticket-icon';
import {useKeybind} from '@common/utils/keybinds/use-keybind';

interface Props {
  ticketIds: number[];
  onSuccess?: () => void;
  isCompact?: boolean;
}
export function AssignTicketsButton({ticketIds, onSuccess, isCompact}: Props) {
  const {data} = useAgents();
  const assignTickets = useAssignTicketsToAgent();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind('window', 'a', () => setIsOpen(true));

  return (
    <MenuTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onItemSelected={userId =>
        assignTickets.mutate({ticketIds, userId}, {onSuccess})
      }
    >
      <TicketActionButton
        isCompact={isCompact}
        startIcon={<AssignTicketIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={assignTickets.isPending}
      >
        <Trans message="Assign (a)" />
      </TicketActionButton>
      <Menu>
        {data?.pagination.data.map(user => (
          <Item
            key={user.id}
            value={user.id}
            startIcon={<UserAvatar user={user} size="sm" />}
          >
            {user.display_name}
          </Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
