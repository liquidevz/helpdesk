import {User} from '@common/auth/user';
import {FileEntry} from '@common/uploads/file-entry';

export interface CannedReply {
  id: number;
  name: string;
  body: string;
  user_id: number;
  shared: boolean;
  created_at?: string;
  updated_at?: string;
  attachments?: FileEntry[];
  user?: User;
}
