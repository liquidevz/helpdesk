import {HcSearchBar} from '@app/help-center/search/hc-search-bar';
import React, {Fragment, useRef, useState} from 'react';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {Trans} from '@common/i18n/trans';
import {useTickets} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-tickets';
import {useAuth} from '@common/auth/use-auth';
import {Table} from '@common/ui/tables/table';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {SearchIcon} from '@common/icons/material/Search';
import {Link, useSearchParams} from 'react-router-dom';
import {Select} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {DataTablePaginationFooter} from '@common/datatable/data-table-pagination-footer';
import {Button} from '@common/ui/buttons/button';
import {CustomerTicketTableColumns} from '@app/help-center/tickets/customer-ticket-list-page/customer-ticket-table-columns';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {SortDescriptor} from '@common/ui/tables/types/sort-descriptor';

const defaultPage = '1';
const defaultPerPage = '20';

export function CustomerTicketListPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar menuPosition="header">
        <HcSearchBar />
      </Navbar>
      <main className="container mx-auto px-24 pb-48">
        <Breadcrumb size="sm" className="mb-48 mt-34">
          <BreadcrumbItem onSelected={() => navigate(`/hc`)}>
            <Trans message="Help center" />
          </BreadcrumbItem>
          <BreadcrumbItem onSelected={() => navigate(`/hc/tickets`)}>
            <Trans message="Requests" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="mb-34 flex items-start justify-between gap-12">
          <h1 className="text-3xl font-semibold">
            <Trans message="My requests" />
          </h1>
          <Button
            elementType={Link}
            to="/hc/tickets/new"
            size="sm"
            variant="outline"
          >
            <Trans message="New request" />
          </Button>
        </div>
        <TicketTable />
      </main>
    </div>
  );
}

function TicketTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {trans} = useTrans();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {user} = useAuth();
  const [sort, setSort] = useState<SortDescriptor>({});
  const query = useTickets({
    userId: user!.id,
    query: searchParams.get('query'),
    tagId: searchParams.get('tagId'),
    page: searchParams.get('page') || defaultPage,
    perPage: searchParams.get('perPage') || defaultPerPage,
    ...sort,
  });
  const data = query.data?.pagination?.data || [];
  const isFiltering =
    !!searchParams.get('query') || !!searchParams.get('tagId');

  const setSearchQuery = () => {
    setSearchParams(prev => {
      if (inputRef.current?.value) {
        prev.set('query', inputRef.current.value);
      } else {
        prev.delete('query');
      }
      return prev;
    });
  };

  const content = !data.length ? (
    <StateMessage isFiltering={isFiltering} />
  ) : (
    <Fragment>
      <Table
        columns={CustomerTicketTableColumns}
        data={data}
        sortDescriptor={sort}
        onSortChange={setSort}
        enableSelection={false}
        onAction={item => navigate(`/hc/tickets/${item.id}`)}
        cellHeight="h-60"
      />
      <DataTablePaginationFooter
        className="mt-12"
        query={query}
        onPageChange={page =>
          setSearchParams(prev => {
            prev.set('page', page.toString());
            return prev;
          })
        }
      />
    </Fragment>
  );

  return (
    <Fragment>
      <form
        className="mb-34 items-end justify-between gap-24 md:flex"
        onSubmit={e => {
          e.preventDefault();
          setSearchQuery();
        }}
      >
        <TextField
          className="flex-auto max-md:mb-24"
          inputRef={inputRef}
          defaultValue={searchParams.get('query') || ''}
          onBlur={() => setSearchQuery()}
          placeholder={trans(message('Search requests'))}
          startAdornment={<SearchIcon />}
        />
        <StatusSelect />
      </form>
      <AnimatePresence initial={false} mode="wait">
        {query.isLoading ? <Skeletons /> : content}
      </AnimatePresence>
    </Fragment>
  );
}

interface StateMessageProps {
  isFiltering: boolean;
}
function StateMessage({isFiltering}: StateMessageProps) {
  return (
    <DataTableEmptyStateMessage
      isFiltering={isFiltering}
      size="sm"
      className="mt-48"
      image={searchImage}
      title={<Trans message="You have not created any requests yet" />}
      filteringTitle={
        <Trans message="No requests match your search query or filters" />
      }
    />
  );
}

function StatusSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Select
      className="flex-shrink-0 md:min-w-172"
      selectionMode="single"
      selectedValue={searchParams.get('tagId') || ''}
      onSelectionChange={newValue => {
        setSearchParams(prev => {
          if (newValue) {
            prev.set('tagId', `${newValue}`);
          } else {
            prev.delete('tagId');
          }
          return prev;
        });
      }}
    >
      <Item value="">
        <Trans message="All requests" />
      </Item>
      <Item value="open">
        <Trans message="Open requests" />
      </Item>
      <Item value="closed">
        <Trans message="Closed requests" />
      </Item>
      <Item value="pending">
        <Trans message="Awaiting your reply" />
      </Item>
    </Select>
  );
}

function Skeletons() {
  return (
    <m.div key="skeletons" {...opacityAnimation}>
      <Skeleton size="h-36" variant="rect" className="mb-12" />
      <Skeleton size="h-54" variant="rect" className="mb-12" />
      <Skeleton size="h-54" variant="rect" />
    </m.div>
  );
}
