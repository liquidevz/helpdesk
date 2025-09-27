import {
  MailboxTag,
  useMailboxSidenavTags,
} from '@app/agent/use-mailbox-sidenav-tags';
import {Trans} from '@common/i18n/trans';
import {Fragment, ReactNode} from 'react';
import {InboxIcon} from '@common/icons/material/Inbox';
import {NavLink} from 'react-router-dom';
import {FolderIcon} from '@common/icons/material/Folder';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import clsx from 'clsx';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {useMailboxParams} from '@app/agent/use-mailbox-params';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {Button} from '@common/ui/buttons/button';
import {Item} from '@common/ui/forms/listbox/item';
import {SettingsIcon} from '@common/icons/material/Settings';
import {KeyboardArrowUpIcon} from '@common/icons/material/KeyboardArrowUp';
import {useNavigate} from '@common/utils/hooks/use-navigate';

export function AgentTicketListSidenav() {
  const navigate = useNavigate();
  return (
    <aside className="compact-scrollbar flex w-full flex-col gap-24 overflow-y-auto border-r text-muted">
      <div className="flex-auto">
        <Heading icon={<InboxIcon />}>
          <Trans message="Inbox" />
        </Heading>
        <TagList type="viewTags" />
        <Heading icon={<FolderIcon />}>
          <Trans message="Folders" />
        </Heading>
        <TagList type="categoryTags" />
      </div>
      <div className="mt-auto p-14">
        <MenuTrigger placement="top">
          <Button
            className="min-h-34 w-full"
            variant="outline"
            startIcon={<SettingsIcon />}
            endIcon={<KeyboardArrowUpIcon />}
            size="xs"
          >
            <Trans message="Settings" />
          </Button>
          <Menu>
            <Item
              value="saved-replies"
              onSelected={() => navigate('/agent/saved-replies')}
            >
              <Trans message="Saved replies" />
            </Item>
            <Item
              value="new-ticket"
              onSelected={() => navigate('/agent/tickets/new')}
            >
              <Trans message="New ticket" />
            </Item>
            <Item
              value="notifications"
              onSelected={() => navigate('/notifications/settings')}
            >
              <Trans message="Notifications" />
            </Item>
          </Menu>
        </MenuTrigger>
      </div>
    </aside>
  );
}

interface HeadingProps {
  icon: ReactNode;
  children: ReactNode;
}
function Heading({icon, children}: HeadingProps) {
  return (
    <div className="mb-14 flex items-center gap-8 px-14 pt-20">
      {icon}
      <div className="text-sm font-semibold uppercase">{children}</div>
    </div>
  );
}

const listItemClassName =
  'flex h-40 items-center justify-between gap-8 pl-38 pr-8 mx-8 rounded-lg';

interface TagListProps {
  type: 'viewTags' | 'categoryTags';
}
function TagList({type}: TagListProps) {
  const {data, isLoading} = useMailboxSidenavTags();
  const tags = data?.[type];

  const skeletons = (
    <m.div key="skeletons" {...opacityAnimation}>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={clsx(listItemClassName, 'max-w-172 border-l-transparent')}
        >
          <Skeleton variant="text" />
        </div>
      ))}
    </m.div>
  );

  return (
    <AnimatePresence initial={false} mode="wait">
      {isLoading ? (
        skeletons
      ) : (
        <m.ul
          className="cursor-pointer text-sm"
          key="tag-list"
          {...opacityAnimation}
        >
          {tags?.map(tag => <TagListItem tag={tag} key={tag.id} />)}
        </m.ul>
      )}
    </AnimatePresence>
  );
}

interface TagListItemProps {
  tag: MailboxTag;
}
function TagListItem({tag}: TagListItemProps) {
  const isActive = `${tag.id}` === useMailboxParams().tagId;
  return (
    <li key={tag.id}>
      <NavLink
        className={clsx(
          listItemClassName,
          isActive
            ? 'border-l-primary bg-primary/6 hover:bg-primary/10'
            : 'border-l-transparent hover:bg-hover',
        )}
        to={`/agent/tickets?tagId=${tag.id}`}
        end={true}
      >
        {' '}
        <Fragment>
          <Trans message={tag.display_name || tag.name} />
          {tag.tickets_count ? (
            <div
              className={clsx(
                'flex h-18 w-30 items-center justify-center rounded-full text-[11px] font-semibold',
                isActive && 'bg-primary text-on-primary',
              )}
            >
              {tag.tickets_count}
            </div>
          ) : null}
        </Fragment>
      </NavLink>
    </li>
  );
}
