import React, {useRef} from 'react';
import {m} from 'framer-motion';
import {AssignTicketsButton} from '@app/agent/ticket-actions/assign-tickets-button';
import {ChangeTicketStatusButton} from '@app/agent/ticket-actions/change-ticket-status-button';
import {AddTagToTicketsButton} from '@app/agent/ticket-actions/add-tag-to-tickets-button';
import {DeleteTicketsButton} from '@app/agent/ticket-actions/delete-tickets-button';
import {useAutoFocus} from '@common/ui/focus/use-auto-focus';

interface Props {
  ticketIds: number[];
  onActionCompleted: () => void;
}
export function TicketTableActions({ticketIds, onActionCompleted}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useAutoFocus({autoFocus: true}, ref);
  return (
    <m.div
      ref={ref}
      initial={{y: -30, opacity: 1}}
      animate={{y: 0, opacity: 1}}
      exit={{y: 30, opacity: 0}}
      tabIndex={-1}
      role="menu"
      className="fixed left-0 right-0 top-120 mx-auto flex w-max items-center justify-center gap-12 rounded border bg p-14 shadow-lg outline-none focus-visible:ring-2"
    >
      <AssignTicketsButton
        ticketIds={ticketIds}
        onSuccess={onActionCompleted}
      />
      <ChangeTicketStatusButton
        ticketIds={ticketIds}
        onSuccess={onActionCompleted}
      />
      <AddTagToTicketsButton
        ticketIds={ticketIds}
        onSuccess={onActionCompleted}
      />
      <DeleteTicketsButton
        ticketIds={ticketIds}
        onSuccess={onActionCompleted}
      />
    </m.div>
  );
}
