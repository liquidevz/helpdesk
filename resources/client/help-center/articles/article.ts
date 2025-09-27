import {Category, Section} from '@app/help-center/categories/category';
import {Tag} from '@common/tags/tag';
import {User} from '@common/auth/user';

export const ARTICLE_MODEL = 'article';

export interface Article {
  id: number;
  title: string;
  body: string;
  slug?: string;
  draft: boolean;
  visibility: 'public' | 'private';
  views: number;
  position: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  categories?: Category[];
  tags?: Tag[];
  attachments?: ArticleAttachment[];
  feedback?: ArticleFeedback[];
  author?: User;
  author_id?: number;
  path?: [Category, Section];
  score?: number;
  positive_votes?: number;
  negative_votes?: number;
  model_type: typeof ARTICLE_MODEL;
  visible_to_role?: number;
  managed_by_role?: number;
  sections?: Section[];
}

export interface ArticleAttachment {
  id: number;
  name: string;
  file_size: number;
  mime: string;
  hash: string;
}

export interface ArticleFeedback {
  id: number;
  was_helpful: boolean;
  comment?: string;
  article_id: number;
  user_id?: number;
  ip?: string;
  created_at?: string;
  updated_at?: string;
  article?: Article;
}
