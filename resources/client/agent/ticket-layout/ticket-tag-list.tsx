import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {
  ChipList,
  ChipListProps,
} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Ticket, TicketTag} from '@app/agent/ticket';

interface Props extends ChipListProps {
  ticket: Ticket;
  onRemoveTag?: (tag: TicketTag) => void;
  tagType?: string;
}
export function TicketTagList({
  ticket,
  onRemoveTag,
  tagType,
  size = 'xs',
  ...chipListProps
}: Props) {
  if (!ticket.tags?.length) return null;

  return (
    <ChipList {...chipListProps} size={size} selectable={!!onRemoveTag}>
      {ticket.tags
        ?.filter(t => t.type !== 'status' && (!tagType || t.type === tagType))
        .map(tag => (
          <Chip
            key={tag.id}
            onRemove={onRemoveTag ? () => onRemoveTag(tag) : undefined}
          >
            {tag.display_name}
          </Chip>
        ))}
    </ChipList>
  );
}
