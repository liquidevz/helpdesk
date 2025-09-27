import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CommentIcon} from '@common/icons/material/Comment';
import {Item} from '@common/ui/forms/listbox/item';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {useCannedReplies} from '@app/agent/agent-ticket-page/canned-replies/requests/use-canned-replies';
import {Trans} from '@common/i18n/trans';
import {CannedReply} from '@app/agent/agent-ticket-page/canned-replies/canned-reply';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {CreateCannedReplyDialog} from '@app/agent/agent-ticket-page/canned-replies/create-canned-reply-dialog';
import {ButtonSize} from '@common/ui/buttons/button-size';
import {useState} from 'react';

interface Props {
  onSelected: (reply: CannedReply) => void;
  size?: ButtonSize;
}
export function CannedReplySelector({onSelected, size}: Props) {
  const {trans} = useTrans();
  const [query, setQuery] = useState('');
  const {data, isFetching} = useCannedReplies(query);

  return (
    <MenuTrigger
      isAsync
      searchPlaceholder={trans(message('Search...'))}
      isLoading={isFetching}
      inputValue={query}
      onInputValueChange={setQuery}
      clearInputOnItemSelection
      blurReferenceOnItemSelection
      selectionMode="none"
      showSearchField
      floatingMaxHeight={440}
      floatingMinWidth="min-w-288"
      showEmptyMessage
    >
      <Tooltip label={<Trans message="Saved replies" />}>
        <IconButton size={size}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
      <Menu>
        <Item
          value="saveThisReply"
          className="font-semibold"
          onSelected={() => openDialog(CreateCannedReplyDialog)}
        >
          <Trans message="Save this reply..." />
        </Item>
        {data?.pagination.data.map(reply => (
          <Item
            value={reply.id}
            key={reply.id}
            onSelected={() => onSelected(reply)}
          >
            {reply.name}
          </Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
