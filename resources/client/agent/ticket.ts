import {User} from '@common/auth/user';
import {Tag} from '@common/tags/tag';
import {Reply} from '@app/agent/reply';
import {Category} from '@app/help-center/categories/category';

export const AGENT_PERMISSION = 'tickets.update';
export const TICKET_MODEL_TYPE = 'ticket';

export interface TicketTag extends Tag {
  categories: Category[];
  support_expired?: boolean;
}

export interface Ticket {
  id: number;
  subject: string;
  user_id: number;
  closed_at?: string;
  closed_by?: number;
  status: string;
  assigned_to?: number;
  created_at?: string;
  updated_at?: string;
  updated_at_formatted: string;
  user?: User;
  assignee?: User;
  tags?: TicketTag[];
  categories?: Tag[];
  replies?: Reply[];
  replies_count?: number;
  latest_replies?: Reply[];
  latest_reply?: Reply;
  notes?: Reply[];
  animated?: boolean;
  model_type: typeof TICKET_MODEL_TYPE;
}
