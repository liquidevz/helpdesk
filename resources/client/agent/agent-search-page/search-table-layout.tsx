import React, {Fragment, ReactNode} from 'react';
import {GlobalLoadingProgress} from '@app/agent/global-loading-progress';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {Trans} from '@common/i18n/trans';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {UseQueryResult} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';

interface Props {
  query: UseQueryResult<PaginatedBackendResponse<unknown>>;
  children: ReactNode;
}
export function SearchTableLayout({query, children}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {data, fetchStatus, isLoading, isPlaceholderData} = query;
  const items = data?.pagination.data || [];
  const isEmpty =
    (fetchStatus === 'idle' && items.length === 0) ||
    (!isLoading && !isPlaceholderData && items.length === 0);

  return (
    <Fragment>
      <GlobalLoadingProgress query={query} />
      {children}
      {isEmpty && (
        <DataTableEmptyStateMessage
          isFiltering={
            !!searchParams.get('query') || !!searchParams.get('filters')
          }
          className="mt-48"
          image={searchImage}
          title={
            <Trans message="Enter your query or filters to start searching" />
          }
          filteringTitle={
            <Trans message="No results match your query or filters" />
          }
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
    </Fragment>
  );
}
