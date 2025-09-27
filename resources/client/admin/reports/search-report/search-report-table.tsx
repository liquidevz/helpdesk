import {useSearchParams} from 'react-router-dom';
import {GlobalLoadingProgress} from '@app/agent/global-loading-progress';
import React, {ReactNode, useMemo} from 'react';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {Trans} from '@common/i18n/trans';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {Table} from '@common/ui/tables/table';
import {getSearchReportTableColumns} from '@app/admin/reports/search-report/search-report-table-columns';
import {
  useSearchReport,
  UseSearchReportParams,
} from '@app/admin/reports/search-report/use-search-report';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';

interface Props {
  userId?: number | string;
  dateRange?: DateRangeValue;
  failedSearches?: boolean;
  description?: ReactNode;
  orderBy?: UseSearchReportParams['orderBy'];
}
export function SearchReportTable({
  userId,
  dateRange,
  failedSearches,
  description,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useSearchReport({
    dateRange,
    userId,
    failedSearches,
    page: searchParams.get('page') || 1,
    perPage: searchParams.get('perPage') || 15,
  });
  const {data, fetchStatus, isLoading, isPlaceholderData} = query;
  const items = data?.pagination.data || [];
  const isEmpty =
    (fetchStatus === 'idle' && items.length === 0) ||
    (!isLoading && !isPlaceholderData && items.length === 0);

  const columns = useMemo(() => {
    return getSearchReportTableColumns({
      skipCtr: failedSearches,
      description,
    });
  }, [description, failedSearches]);

  return (
    <div className="relative max-md:overflow-x-auto">
      <GlobalLoadingProgress query={query} />
      <Table
        columns={columns}
        data={items}
        enableSelection={false}
        collapseOnMobile={false}
        className="max-md:w-min"
      />
      {isEmpty && (
        <IllustratedMessage
          className="mt-48"
          image={<SvgImage src={searchImage} />}
          title={<Trans message="There are no searches to display" />}
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
