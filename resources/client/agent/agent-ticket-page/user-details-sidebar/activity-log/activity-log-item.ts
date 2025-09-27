import {Ticket} from '@app/agent/ticket';
import {SearchTerm} from '@app/agent/agent-search-page/search-term';
import {Article} from '@app/help-center/articles/article';

export interface ActivityLogItem {
  id: string;
  event: string;
  subject?: Ticket | SearchTerm | Article;
  created_at: string;
}

export interface TicketActivityLogItem extends ActivityLogItem {
  subject: Ticket;
  event: 'replied' | 'created' | 'articlesSuggested';
  properties?: {
    source?: 'email' | 'site';
    query?: string;
    articleIds?: number[];
  };
}
