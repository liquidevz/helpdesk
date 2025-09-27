import {useSearchParams} from 'react-router-dom';
import React from 'react';
import {Trans} from '@common/i18n/trans';
import {GlobalLoadingProgress} from '@app/agent/global-loading-progress';
import {Table} from '@common/ui/tables/table';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {useArticlesReport} from '@app/admin/reports/articles-report/use-articles-report';
import {ArticleReportTableColumns} from '@app/admin/reports/articles-report/article-report-table-columns';

export function ArticlesReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useArticlesReport({
    page: searchParams.get('page') || 1,
    perPage: searchParams.get('perPage') || 15,
  });
  const {data, fetchStatus, isLoading, isPlaceholderData} = query;
  const items = data?.pagination.data || [];
  const isEmpty =
    (fetchStatus === 'idle' && items.length === 0) ||
    (!isLoading && !isPlaceholderData && items.length === 0);

  return (
    <div className="relative max-md:overflow-x-auto">
      <GlobalLoadingProgress query={query} />
      <Table
        columns={ArticleReportTableColumns}
        data={items}
        enableSelection={false}
        collapseOnMobile={false}
        className="max-md:w-min"
      />
      {isEmpty && (
        <IllustratedMessage
          className="mt-48"
          image={<SvgImage src={searchImage} />}
          title={<Trans message="There are no articles to display" />}
        />
      )}
      <DataTablePaginationFooter
        query={query}
        onPageChange={page =>
          setSearchParams(prev => {
            prev.set('page', page.toString());
            return prev;
          })
        }
        onPerPageChange={perPage =>
          setSearchParams(prev => {
            prev.set('perPage', perPage.toString());
            return prev;
          })
        }
      />
    </div>
  );
}
