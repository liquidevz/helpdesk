import {useTicket} from '@app/agent/agent-ticket-page/requests/use-ticket';
import {DashboardSidenav} from '@common/ui/layout/dashboard-sidenav';
import React, {Fragment, useEffect} from 'react';
import {PageStatus} from '@common/http/page-status';
import {TicketPageToolbar} from '@app/agent/agent-ticket-page/ticket-page-toolbar';
import {AgentTicketPageReplyList} from '@app/agent/agent-ticket-page/reply-list/agent-ticket-page-reply-list';
import {TicketPageHeader} from '@app/agent/agent-ticket-page/ticket-page-header';
import {UserDetailsSidebar} from '@app/agent/agent-ticket-page/user-details-sidebar/user-details-sidebar';
import {
  defaultDraftValues,
  ticketPageStore,
  useTicketPageStore,
} from '@app/agent/agent-ticket-page/ticket-page-store';
import {usePrevious} from '@common/utils/hooks/use-previous';
import {useBackgroundDraftSave} from '@app/agent/agent-ticket-page/agent-reply-editor/use-background-draft-save';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {AgentReplyEditor} from '@app/agent/agent-ticket-page/agent-reply-editor/agent-reply-editor';
import {AgentPageLayout} from '@app/agent/agent-page-layout';
import {Helmet} from '@common/seo/helmet';
import {useSettings} from '@common/core/settings/use-settings';

export function AgentTicketPage() {
  return (
    <AgentPageLayout
      rightSidenav={
        <DashboardSidenav position="right" className="bg-alt" size="w-264">
          <UserDetailsSidebar />
        </DashboardSidenav>
      }
    >
      <TicketContent />
    </AgentPageLayout>
  );
}

function TicketContent() {
  const {branding} = useSettings();
  const query = useTicket();
  const previousTicketId = usePrevious(query.data?.ticket.id);
  const saveDraft = useBackgroundDraftSave();

  useEffect(() => {
    const ticket = query.data?.ticket;
    if (ticket) {
      const draft = ticket.replies?.find(reply => reply.type === 'drafts');
      if (draft && previousTicketId !== ticket.id) {
        ticketPageStore().updateActiveDraft({
          ...defaultDraftValues,
          ...draft,
          isDirty: false,
        });
      }
    }
    return () => {
      if (previousTicketId) {
        saveDraft('manual', previousTicketId);
        ticketPageStore().setEditorIsOpen(false);
      }
    };
  }, [previousTicketId]);

  return (
    <Fragment>
      {query.data ? (
        <Fragment>
          <Helmet>
            <title>
              {query.data.ticket.subject} - {branding.site_name}
            </title>
          </Helmet>
          <TicketPageToolbar ticket={query.data.ticket} />
          <TicketPageHeader data={query.data} />
          <ReplyEditor />
          <AgentTicketPageReplyList data={query.data} />
        </Fragment>
      ) : (
        <PageStatus
          query={query}
          loaderClassName="absolute inset-0 m-auto"
          redirectOn404="/agent/tickets"
        />
      )}
    </Fragment>
  );
}

function ReplyEditor() {
  const editorIsOpen = useTicketPageStore(s => s.editorIsOpen);
  return (
    <FileUploadProvider>
      {editorIsOpen && <AgentReplyEditor />}
    </FileUploadProvider>
  );
}
