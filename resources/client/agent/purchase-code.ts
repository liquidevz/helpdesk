import {User} from '@common/auth/user';

export interface PurchaseCode {
  id: number;
  code: string;
  user_id: number;
  item_name: string;
  item_id: string;
  url?: string;
  image?: string;
  supported_until?: string;
  purchased_at?: string;
  support_expired?: boolean;
  created_at?: string;
  updated_at?: string;
  user?: Omit<User, 'purchase_codes'>;
  envato_username?: string;
}
