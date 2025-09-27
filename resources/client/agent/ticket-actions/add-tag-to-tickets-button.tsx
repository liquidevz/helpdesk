import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import React, {useState} from 'react';
import {useTrans} from '@common/i18n/use-trans';
import {useTags} from '@common/tags/use-tags';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {ComboBox} from '@common/ui/forms/combobox/combobox';
import {message} from '@common/i18n/message';
import {Item} from '@common/ui/forms/listbox/item';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useAddTagToTickets} from '@app/agent/ticket-actions/requests/use-add-tag-to-tickets';
import {TicketActionButton} from '@app/agent/ticket-actions/ticket-action-button';
import {AddTagIcon} from '@app/agent/ticket-actions/icons/add-tag-icon';
import {useKeybind} from '@common/utils/keybinds/use-keybind';

interface Props {
  ticketIds: number[];
  onSuccess?: () => void;
  isCompact?: boolean;
}
export function AddTagToTicketsButton({
  ticketIds,
  onSuccess,
  isCompact,
}: Props) {
  const addTag = useAddTagToTickets();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind('window', 't', () => setIsOpen(true));

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      type="popover"
      onClose={tagName => {
        if (tagName) {
          addTag.mutate({tagName, ticketIds}, {onSuccess});
        }
      }}
    >
      <TicketActionButton
        startIcon={<AddTagIcon />}
        isCompact={isCompact}
        disabled={addTag.isPending}
      >
        <Trans message="Add tag (t)" />
      </TicketActionButton>
      <AddTagDialog />
    </DialogTrigger>
  );
}

function AddTagDialog() {
  const {trans} = useTrans();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const {data, isFetching} = useTags({query, perPage: 8, notType: 'status'});
  const {close, formId} = useDialogContext();

  return (
    <Dialog size="sm">
      <DialogHeader>
        <Trans message="Add tag" />
      </DialogHeader>
      <DialogBody>
        <form
          id={formId}
          onSubmit={e => {
            e.preventDefault();
            close(selectedTag);
          }}
        >
          <ComboBox
            isAsync
            isLoading={isFetching}
            inputValue={query}
            onInputValueChange={setQuery}
            selectedValue={selectedTag}
            onSelectionChange={value => setSelectedTag(value as string)}
            selectionMode="single"
            placeholder={trans(message('Enter tag name...'))}
            allowCustomValue
            autoFocus
          >
            {data?.pagination.data.map(result => (
              <Item
                key={result.id}
                value={result.name}
                textLabel={result.name}
                capitalizeFirst
                className="rounded"
              >
                {result.display_name || result.name}
              </Item>
            ))}
          </ComboBox>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button variant="flat" color="primary" type="submit" form={formId}>
          <Trans message="Add" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
