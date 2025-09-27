import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {ColumnConfig} from '@common/datatable/column-config';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Table} from '@common/ui/tables/table';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {Article} from '@app/help-center/articles/article';
import {ArticleIcon} from '@common/icons/material/Article';
import {useSearchArticles} from '@app/help-center/search/use-search-articles';
import {getArticleLink} from '@app/help-center/articles/article-link';
import {ArticlePath} from '@app/help-center/articles/article-path';
import {SearchTableLayout} from '@app/agent/agent-search-page/search-table-layout';

const columnConfig: ColumnConfig<Article>[] = [
  {
    key: 'name',
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="Article" />,
    body: article => (
      <div className="flex items-center gap-12">
        <ArticleIcon />
        <div className="min-w-0 overflow-hidden">
          <div className="overflow-hidden overflow-ellipsis">
            {article.title}
          </div>
          <ArticlePath article={article} className="text-xs text-muted" />
        </div>
      </div>
    ),
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-96',
    header: () => <Trans message="Last updated" />,
    body: user => (
      <time>
        <FormattedDate date={user.updated_at} />
      </time>
    ),
  },
];

export function SearchArticlesTable() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = useSearchArticles(
    searchParams.get('query') || '',
    {
      page: searchParams.get('page') ?? '1',
      perPage: searchParams.get('perPage') ?? '20',
      paginate: 'lengthAware',
    },
    {disableDebounce: true},
  );
  return (
    <SearchTableLayout query={query}>
      <Table
        headerCellHeight="h-36"
        cellHeight="h-64"
        columns={columnConfig}
        data={query.data?.pagination.data || []}
        enableSelection={false}
        onAction={article => navigate(getArticleLink(article))}
      />
    </SearchTableLayout>
  );
}
