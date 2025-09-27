import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {Category} from '@app/help-center/categories/category';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {
  DateRangeValue,
  dateRangeValueToPayload,
} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {Article} from '@app/help-center/articles/article';

export interface UseArticleReportResponse
  extends PaginatedBackendResponse<ArticleReportItem> {}

export interface ArticleReportItem {
  id: number;
  views: number;
  slug: string;
  title: string;
  score: number;
  positive_votes: number;
  negative_votes: number;
  path: Article['path'];
  category?: Category;
}

export interface UseArticleReportParams {
  page?: string | number;
  perPage?: string | number;
  dateRange?: DateRangeValue;
}

export function useArticlesReport(params: UseArticleReportParams) {
  return useQuery({
    queryKey: ['reports', 'articles', params],
    queryFn: () => fetchArticleReport(params),
  });
}

function fetchArticleReport(params: UseArticleReportParams) {
  return apiClient
    .get<UseArticleReportResponse>(`reports/popular-articles`, {
      params: dateRangeValueToPayload(params),
    })
    .then(response => response.data);
}
