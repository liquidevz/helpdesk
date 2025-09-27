import {StaticPageTitle} from '@common/seo/static-page-title';
import {ButtonGroup} from '@common/ui/buttons/button-group';
import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {Trans} from '@common/i18n/trans';
import React, {Fragment, ReactElement, ReactNode} from 'react';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {useSettings} from '@common/core/settings/use-settings';
import {ReportDateSelector} from '@common/admin/analytics/report-date-selector';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {message} from '@common/i18n/message';
import {
  Menu,
  MenuItem,
  MenuTrigger,
} from '@common/ui/navigation/menu/menu-trigger';
import {TrendingUpIcon} from '@common/icons/material/TrendingUp';
import {Granularity} from '@common/ui/forms/input-field/date/date-picker/use-date-picker-state';

type ReportName = 'tickets' | 'search' | 'envato' | 'visitors';

const NavigationItems = [
  {name: 'tickets', to: '/admin/tickets', label: message('Tickets')},
  {name: 'search', to: '/admin/search/failed', label: message('Search')},
  {name: 'envato', to: '/admin/envato', label: message('Envato')},
  {name: 'visitors', to: '/admin/visitors', label: message('Visitors')},
];

interface Props {
  title: ReactElement<MessageDescriptor>;
  name: ReportName;
  children: ReactNode;
  dateRange: DateRangeValue;
  setDateRange: (dateRange: DateRangeValue) => void;
  disableDateRange?: boolean;
  enableCompare?: boolean;
  granularity?: Granularity;
}
export function BedeskAdminReportLayout({
  title,
  name,
  children,
  dateRange,
  setDateRange,
  disableDateRange,
  enableCompare,
  granularity,
}: Props) {
  return (
    <div className="min-h-full overflow-x-hidden p-12 md:p-24">
      <div className="mb-24 items-center justify-between gap-24 md:flex">
        <StaticPageTitle>{title}</StaticPageTitle>
        <h1 className="mb-24 text-3xl font-light md:mb-0">{title}</h1>
        <div className="flex flex-shrink-0 items-center justify-between gap-10 md:gap-24">
          <ReportSelector value={name} />
          <ReportDateSelector
            disabled={disableDateRange}
            value={dateRange}
            onChange={setDateRange}
            enableCompare={enableCompare}
            granularity={granularity}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

interface ReportSelectorProps {
  value: ReportName;
}
function ReportSelector({value}: ReportSelectorProps) {
  const {envato} = useSettings();
  const items = NavigationItems.filter(
    item => item.name !== 'envato' || envato?.enable,
  );
  const activeItem = NavigationItems.find(item => item.name === value);
  return (
    <Fragment>
      <ButtonGroup variant="outline" value={value} className="max-md:hidden">
        {items.map(item => (
          <Button
            key={item.name}
            value={item.name}
            elementType={Link}
            to={item.to}
          >
            <Trans {...item.label} />
          </Button>
        ))}
      </ButtonGroup>
      <MenuTrigger>
        <Button
          variant="outline"
          className="md:hidden"
          startIcon={<TrendingUpIcon />}
        >
          <Trans {...activeItem!.label} />
        </Button>
        <Menu>
          {items.map(item => (
            <MenuItem
              key={item.name}
              value={item.name}
              elementType={Link}
              to={item.to}
            >
              <Trans {...item.label} />
            </MenuItem>
          ))}
        </Menu>
      </MenuTrigger>
    </Fragment>
  );
}
