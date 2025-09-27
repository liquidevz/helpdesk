import {AgentNavbar} from '@app/agent/agent-navbar';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {Tabs} from '@common/ui/tabs/tabs';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {Link, Outlet, useLocation, useSearchParams} from 'react-router-dom';
import {TabList} from '@common/ui/tabs/tab-list';
import {message} from '@common/i18n/message';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SearchIcon} from '@common/icons/material/Search';
import {useDebouncedCallback} from 'use-debounce';
import {FilterList} from '@common/datatable/filters/filter-list/filter-list';
import {AddFilterButton} from '@common/datatable/filters/add-filter-button';
import {useSearchTicketsFilters} from '@app/agent/agent-search-page/search-tickets/use-search-tickets-filters';
import {useStableScrollbar} from '@common/utils/hooks/use-stable-scrollbar';

const PageTabs = [
  {uri: 'tickets', label: message('Tickets'), key: 0},
  {uri: 'users', label: message('Users'), key: 1},
  {uri: 'articles', label: message('Articles'), key: 2},
];

export function AgentSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsQuery = searchParams.get('query') || '';
  const {pathname} = useLocation();
  const tabName = pathname.split('/').pop();
  const selectedTab = PageTabs.find(tab => tab.uri === tabName)?.key ?? 0;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, _setSearchQuery] = useState(searchParamsQuery);

  useStableScrollbar();

  useEffect(() => {
    _setSearchQuery(searchParamsQuery);
  }, [searchParamsQuery]);

  const updateQueryParams = (value: string) => {
    setSearchParams(prev => {
      prev.delete('page');
      prev.set('query', value);
      return prev;
    });
  };
  const debouncedUpdateQueryParams = useDebouncedCallback(value => {
    updateQueryParams(value);
  }, 400);

  const setSearchQuery = (value: string) => {
    _setSearchQuery(value);
    debouncedUpdateQueryParams(value);
  };

  const focusSearchInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const filters = useSearchTicketsFilters();
  const showFilters = filters && selectedTab === 0;

  return (
    <div>
      <AgentNavbar element={Navbar} onOpenSearchPage={focusSearchInput} />
      <main className="container mx-auto p-14 md:p-24">
        <div className="mb-34 flex items-center gap-24 pt-6">
          <form
            className="flex-auto"
            onSubmit={e => {
              e.preventDefault();
              updateQueryParams(searchQuery);
            }}
          >
            <TextField
              onBlur={() => updateQueryParams(searchQuery)}
              inputRef={searchInputRef}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
              startAdornment={<SearchIcon />}
              autoFocus
            />
          </form>
          {showFilters && (
            <AddFilterButton className="min-h-42 min-w-42" filters={filters} />
          )}
        </div>
        {showFilters && <FilterList filters={filters} />}
        <Tabs selectedTab={selectedTab}>
          <TabList>
            {PageTabs.map(tab => (
              <Tab
                key={tab.key}
                width="min-w-132"
                elementType={Link}
                to={`/agent/search/${tab.uri}?query=${searchQuery}`}
                relative="path"
                replace
              >
                <Trans {...tab.label} />
              </Tab>
            ))}
          </TabList>
          <div className="pt-34">
            <Outlet />
          </div>
        </Tabs>
      </main>
    </div>
  );
}
