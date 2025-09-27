import {GetTicketResponse} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {useRemoveTagFromTickets} from '@app/agent/ticket-actions/requests/use-remove-tag-from-tickets';
import {Tag} from '@common/tags/tag';
import {useOpenReplyEditor} from '@app/agent/agent-ticket-page/agent-reply-editor/use-open-reply-editor';
import {useTicketPageStore} from '@app/agent/agent-ticket-page/ticket-page-store';
import {TicketHeaderLayout} from '@app/agent/ticket-layout/ticket-header-layout';
import {TicketTagList} from '@app/agent/ticket-layout/ticket-tag-list';
import {useKeybind} from '@common/utils/keybinds/use-keybind';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {ReplyIcon} from '@common/icons/material/Reply';

interface Props {
  data: GetTicketResponse;
}
export function TicketPageHeader({data: {ticket}}: Props) {
  const removeTags = useRemoveTagFromTickets();
  const editorIsOpen = useTicketPageStore(s => s.editorIsOpen);
  const openEditor = useOpenReplyEditor();
  const handleRemoveTag = (tag: Tag) => {
    removeTags.mutate({
      ticketIds: [ticket.id],
      tagId: tag.id,
    });
  };

  useKeybind('window', 'r', () => {
    if (!editorIsOpen) {
      openEditor();
    }
  });

  return (
    <TicketHeaderLayout
      ticket={ticket}
      actions={
        ticket.status !== 'locked' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => openEditor()}
            startIcon={<ReplyIcon />}
            disabled={editorIsOpen}
          >
            <Trans message="Reply" />
          </Button>
        )
      }
    >
      <TicketTagList ticket={ticket} onRemoveTag={handleRemoveTag} />
    </TicketHeaderLayout>
  );
}
