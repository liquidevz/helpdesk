import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {message} from '@common/i18n/message';
import {useBedeskReportDateRangeState} from '@app/admin/reports/use-bedesk-report-date-range-state';
import {BedeskAdminReportLayout} from '@app/admin/reports/bedesk-admin-report-layout';
import {DateRangePresets} from '@common/ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';

const PageTabs = [
  {uri: 'failed', label: message('Failed searches'), key: 0},
  {uri: 'popular', label: message('Popular searches'), key: 1},
  {uri: 'articles', label: message('Popular articles'), key: 2},
];

export function AdminSearchReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState(
    DateRangePresets[8].getRangeValue(),
  );
  const {pathname} = useLocation();
  const tabName = pathname.split('/').pop();
  const selectedTab = PageTabs.find(tab => tab.uri === tabName) || PageTabs[0];

  return (
    <BedeskAdminReportLayout
      title={<Trans {...selectedTab.label} />}
      name="search"
      dateRange={dateRange}
      setDateRange={setDateRange}
      disableDateRange={selectedTab.key === 2}
    >
      <Tabs selectedTab={selectedTab.key}>
        <TabList>
          {PageTabs.map(tab => (
            <Tab
              key={tab.key}
              width="min-w-132"
              elementType={Link}
              to={`/admin/search/${tab.uri}`}
              replace
            >
              <Trans {...tab.label} />
            </Tab>
          ))}
        </TabList>
        <div className="pt-34">
          <Outlet context={{dateRange}} />
        </div>
      </Tabs>
    </BedeskAdminReportLayout>
  );
}
