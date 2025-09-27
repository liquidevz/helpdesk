import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {TicketActionButton} from '@app/agent/ticket-actions/ticket-action-button';
import {DeleteIcon} from '@common/icons/material/Delete';
import {Trans} from '@common/i18n/trans';
import React, {useState} from 'react';
import {useDeleteTickets} from '@app/agent/ticket-actions/requests/use-delete-tickets';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {useKeybind} from '@common/utils/keybinds/use-keybind';

interface Props {
  ticketIds: number[];
  onSuccess?: () => void;
  isCompact?: boolean;
}
export function DeleteTicketsButton({ticketIds, onSuccess, isCompact}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useKeybind('window', 'd', () => setIsOpen(true));

  return (
    <DialogTrigger type="modal" isOpen={isOpen} onOpenChange={setIsOpen}>
      <TicketActionButton
        startIcon={<DeleteIcon />}
        color="danger"
        isCompact={isCompact}
      >
        <Trans message="Delete (d)" />
      </TicketActionButton>
      <DeleteTicketsDialog ticketIds={ticketIds} onDeleted={onSuccess} />
    </DialogTrigger>
  );
}

interface DeleteTicketsButtonProps {
  ticketIds: number[];
  onDeleted?: () => void;
}
function DeleteTicketsDialog({ticketIds, onDeleted}: DeleteTicketsButtonProps) {
  const deleteTickets = useDeleteTickets();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      isLoading={deleteTickets.isPending}
      onConfirm={() => {
        deleteTickets.mutate(
          {ids: ticketIds},
          {
            onSuccess: () => {
              close();
              onDeleted?.();
            },
          },
        );
      }}
      title={<Trans message="Delete tickets" />}
      body={
        <Trans message="Are you sure you want to delete selected tickets?" />
      }
      confirm={<Trans message="delete" />}
    />
  );
}
