import React from 'react';
import {CannedRepliesDatatablePage} from '@app/admin/canned-replies/canned-replies-datatable-page';
import {useAuth} from '@common/auth/use-auth';
import {AgentPageLayout} from '@app/agent/agent-page-layout';

export function AgentCannedRepliesPage() {
  const {user} = useAuth();
  return (
    <AgentPageLayout>
      <CannedRepliesDatatablePage userId={user?.id} />
    </AgentPageLayout>
  );
}
