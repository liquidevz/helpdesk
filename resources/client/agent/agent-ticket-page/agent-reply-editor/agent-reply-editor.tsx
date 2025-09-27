import React, {
  Fragment,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {
  Menu,
  MenuItem,
  MenuTrigger,
} from '@common/ui/navigation/menu/menu-trigger';
import {useMailboxSidenavTags} from '@app/agent/use-mailbox-sidenav-tags';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {
  getFromLocalStorage,
  useLocalStorage,
} from '@common/utils/hooks/local-storage';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {
  AfterReplyAction,
  AfterReplyActions,
  useAfterReplyAction,
} from '@app/agent/agent-ticket-page/use-after-reply-action';
import {useSubmitAgentReply} from '@app/agent/agent-ticket-page/agent-reply-editor/use-submit-agent-reply';
import {Editor} from '@tiptap/react';
import {useGlobalListeners} from '@react-aria/utils';
import {AgentReplyEditorDraftButtons} from '@app/agent/agent-ticket-page/agent-reply-editor/agent-reply-editor-draft-buttons';
import {useBackgroundDraftSave} from '@app/agent/agent-ticket-page/agent-reply-editor/use-background-draft-save';
import {
  ticketPageStore,
  useTicketPageStore,
} from '@app/agent/agent-ticket-page/ticket-page-store';
import {
  ReplyEditor,
  ReplyEditorToolbarButtonsProps,
} from '@app/reply-editor/reply-editor';
import {SendReplyButton} from '@app/reply-editor/send-reply-button';
import {getReplyBody} from '@app/reply-editor/get-reply-body';
import {CannedReplySelector} from '@app/agent/agent-ticket-page/canned-replies/canned-reply-selector';
import {MenubarButtonProps} from '@common/text-editor/menubar/menubar-button-props';
import {TicketPageDocsSearchInput} from '@app/agent/agent-ticket-page/ticket-page-docs-search-input';
import {getArticleLink} from '@app/help-center/articles/article-link';
import {insertLinkIntoTextEditor} from '@common/text-editor/insert-link-into-text-editor';

export function AgentReplyEditor() {
  const {addGlobalListener} = useGlobalListeners();
  const submitReply = useSubmitAgentReply();
  const attachments = useTicketPageStore(s => s.activeDraft.attachments);
  const editorRef = useRef<Editor | null>(null);

  const handleSubmit = useCallback(() => {
    if (!editorRef.current) return;
    submitReply.mutate(
      {
        type: 'replies',
        status: getFromLocalStorage('ticket-page-status', 'pending'),
        attachments: ticketPageStore().activeDraft.attachments.map(u => u.id),
        body: getReplyBody(editorRef),
      },
      {
        onSuccess: () => {
          ticketPageStore().setEditorIsOpen(false);
        },
      },
    );
  }, [submitReply]);

  const handleBackgroundSave = useBackgroundDraftSave();

  useEffect(() => {
    addGlobalListener(document, 'visibilitychange', () => {
      if (document.hidden) {
        handleBackgroundSave();
      }
    });
  }, [addGlobalListener, handleBackgroundSave]);

  return (
    <div className="mb-24 px-20">
      <TicketPageDocsSearchInput
        onSelected={article => {
          if (editorRef.current) {
            insertLinkIntoTextEditor(editorRef.current, {
              href: getArticleLink(article),
              target: '_blank',
              text: article.title,
            });
          }
        }}
      />
      <ReplyEditor
        menubarButtons={<MenubarButtons editorRef={editorRef} />}
        footerButtons={<FooterButtons />}
        attachments={attachments}
        onAttachmentsChange={attachments => {
          ticketPageStore().updateActiveDraft({attachments});
        }}
        editorRef={editorRef}
        onSubmit={handleSubmit}
        isLoading={submitReply.isPending}
        initialContent={ticketPageStore().activeDraft?.body}
        onChange={() => {
          if (editorRef.current) {
            ticketPageStore().updateActiveDraft({
              body: editorRef.current.getHTML(),
            });
          }
        }}
      />
    </div>
  );
}

interface MenubarButtonsProps {
  size?: MenubarButtonProps['size'];
  editorRef: MutableRefObject<Editor | null>;
}
function MenubarButtons({size, editorRef}: MenubarButtonsProps) {
  return (
    <Fragment>
      <CannedReplySelector
        size={size}
        onSelected={reply => {
          ticketPageStore().updateActiveDraft({
            body: reply.body,
            attachments: reply.attachments,
          });
          editorRef.current?.commands.insertContent(reply.body);
        }}
      />
      <AgentReplyEditorDraftButtons size={size} />
    </Fragment>
  );
}

function FooterButtons({isLoading, onSubmit}: ReplyEditorToolbarButtonsProps) {
  return (
    <Fragment>
      <StatusSelector />
      <SendReplyButton isLoading={isLoading} onSubmit={onSubmit} />
      <AfterReplyActionSelector disabled={isLoading} />
    </Fragment>
  );
}

interface AfterReplyActionSelectorProps {
  disabled?: boolean;
}
function AfterReplyActionSelector({disabled}: AfterReplyActionSelectorProps) {
  const {action, setAction} = useAfterReplyAction();
  return (
    <MenuTrigger
      selectionMode="single"
      selectedValue={action}
      onItemSelected={newValue => setAction(newValue as AfterReplyAction)}
    >
      <IconButton
        border="border border-transparent border-l-primary-light/40"
        variant="flat"
        color="primary"
        radius="rounded-none"
        size="sm"
        disabled={disabled}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu>
        {Object.entries(AfterReplyActions).map(([key, label]) => (
          <MenuItem key={key} value={key} capitalizeFirst>
            <Trans {...label} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}

function StatusSelector() {
  const {data} = useMailboxSidenavTags();
  const [selectedStatus, setSelectedStatus] = useLocalStorage(
    'ticket-page-status',
    'pending',
  );
  if (!data?.statusTags.length) return null;
  const selectedTag = data.statusTags.find(t => t.name === selectedStatus);
  return (
    <MenuTrigger
      selectionMode="single"
      selectedValue={selectedStatus}
      onItemSelected={newValue => setSelectedStatus(newValue as string)}
    >
      <Button
        radius="rounded-none"
        endIcon={<KeyboardArrowDownIcon />}
        className="capitalize text-muted"
      >
        {selectedTag ? (
          <Trans message={selectedTag.display_name} />
        ) : (
          <Trans message="Select status" />
        )}
      </Button>
      <Menu>
        {data.statusTags.map(tag => (
          <MenuItem key={tag.id} value={tag.name} capitalizeFirst>
            <Trans message={tag.display_name} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
