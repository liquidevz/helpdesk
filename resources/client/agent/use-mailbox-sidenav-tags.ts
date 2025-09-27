import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Tag} from '@common/tags/tag';

export interface MailboxTag extends Tag {
  tickets_count: number;
}

export interface GetMailboxSidenavTags extends BackendResponse {
  viewTags: MailboxTag[];
  categoryTags: MailboxTag[];
  statusTags: MailboxTag[];
}

export function useMailboxSidenavTags() {
  return useQuery({
    queryKey: ['mailbox', 'sidenav-tags'],
    queryFn: () => fetchTags(),
  });
}

function fetchTags() {
  return apiClient
    .get<GetMailboxSidenavTags>('tags/agent-mailbox')
    .then(response => response.data);
}
