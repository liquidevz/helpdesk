import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';

export interface OriginalReplyEmailResponse {
  email: {
    headers: Record<string, string>;
    body: {
      html: string;
      plain: string;
    };
  };
}

export function useOriginalReplyEmail(replyId: number | string) {
  return useQuery({
    queryKey: ['original-email', `${replyId}`],
    queryFn: () => fetchEmail(replyId),
    staleTime: Infinity,
  });
}

function fetchEmail(replyId: string | number) {
  return apiClient
    .get<OriginalReplyEmailResponse>(`replies/${replyId}/original`)
    .then(response => response.data);
}
