import {FileEntry} from '@common/uploads/file-entry';
import type {Ticket} from '@app/agent/ticket';
import {User} from '@common/auth/user';

export interface Reply {
  id: number;
  body: string;
  user_id: number;
  ticket_id: number;
  uuid?: string;
  type: 'replies' | 'drafts' | 'notes';
  created_at?: string;
  updated_at?: string;
  attachments?: FileEntry[];
  ticket?: Omit<
    Ticket,
    'latest_reply' | 'replies' | 'latest_replies' | 'notes'
  >;
  user?: User;
}
