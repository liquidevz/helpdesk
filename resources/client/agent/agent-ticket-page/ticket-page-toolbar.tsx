import {Ticket} from '@app/agent/ticket';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {useMailboxTicketTableLink} from '@app/agent/use-mailbox-params';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {AssignTicketsButton} from '@app/agent/ticket-actions/assign-tickets-button';
import {ChangeTicketStatusButton} from '@app/agent/ticket-actions/change-ticket-status-button';
import {AddTagToTicketsButton} from '@app/agent/ticket-actions/add-tag-to-tickets-button';
import {AddNoteIcon} from '@app/agent/ticket-actions/icons/add-note-icon';
import {BackToTicketsIcon} from '@app/agent/ticket-actions/icons/back-to-tickets-icon';
import {TicketActionButton} from '@app/agent/ticket-actions/ticket-action-button';
import {useAfterReplyAction} from '@app/agent/agent-ticket-page/use-after-reply-action';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CreateNoteDialog} from '@app/agent/agent-ticket-page/notes/create-note-dialog';
import {useKeybind} from '@common/utils/keybinds/use-keybind';

interface Props {
  ticket: Ticket;
}
export function TicketPageToolbar({ticket}: Props) {
  const backLink = useMailboxTicketTableLink();
  const {perform: afterReplyAction} = useAfterReplyAction();
  return (
    <div className="flex items-center gap-14 border-b py-4 pl-14 pr-20">
      <TicketActionButton
        startIcon={<BackToTicketsIcon />}
        isCompact={true}
        elementType={Link}
        to={backLink}
      >
        <Trans message="Back (b)" />
      </TicketActionButton>
      <AssignTicketsButton ticketIds={[ticket.id]} isCompact />
      <AddNoteButton />
      <AddTagToTicketsButton ticketIds={[ticket.id]} isCompact />
      <ChangeTicketStatusButton
        ticketIds={[ticket.id]}
        isCompact
        onSuccess={() => afterReplyAction()}
      />
      <div className="ml-auto text-2xl">#{ticket.id}</div>
      {ticket.status && (
        <Chip
          size="sm"
          radius="rounded"
          className="font-bold capitalize"
          color={ticket.status === 'open' ? 'primary' : 'chip'}
        >
          <Trans message={ticket.status} />
        </Chip>
      )}
    </div>
  );
}

function AddNoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  useKeybind('window', 'n', () => setIsOpen(true));
  return (
    <DialogTrigger type="modal" isOpen={isOpen} onOpenChange={setIsOpen}>
      <TicketActionButton startIcon={<AddNoteIcon />} isCompact>
        <Trans message="Note (n)" />
      </TicketActionButton>
      <CreateNoteDialog />
    </DialogTrigger>
  );
}
