import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import React, {ReactNode} from 'react';
import {CheckIcon} from '@common/icons/material/Check';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {CloseIcon} from '@common/icons/material/Close';
import {CategoryLink} from '@app/help-center/categories/category-link';
import {Link} from 'react-router-dom';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {SearchTermReport} from '@app/admin/reports/search-report/use-search-report';

interface Options {
  skipCtr?: boolean;
  description?: ReactNode;
}

export function getSearchReportTableColumns({
  skipCtr,
  description,
}: Options): ColumnConfig<SearchTermReport>[] {
  const cols: (ColumnConfig<SearchTermReport> | null)[] = [
    {
      key: 'normalized_term',
      header: () => (
        <div className="flex items-center gap-4">
          <div>
            <Trans message="Term" />
          </div>
          {!!description && <InfoDialogTrigger body={description} />}
        </div>
      ),
      visibleInMode: 'all',
      body: item => (
        <Link
          to={`/hc/search/${item.term}`}
          className={LinkStyle}
          target="_blank"
        >
          {item.term}
        </Link>
      ),
    },
    {
      key: 'count',
      header: () => <Trans message="Count" />,
      width: 'w-144',
      body: item => <span>{item.count || 1}</span>,
    },
    skipCtr
      ? null
      : {
          key: 'ctr',
          header: () => <Trans message="CTR" />,
          width: 'w-144',
          body: item => <span>{item.ctr}%</span>,
        },
    {
      key: 'resulted_in_ticket',
      header: () => <Trans message="Resulted in ticket" />,
      width: 'w-144',
      body: item => (
        <span className="text-muted">
          {item.resulted_in_ticket ? <CheckIcon /> : <CloseIcon />}
        </span>
      ),
    },
    {
      key: 'last_seen',
      header: () => <Trans message="Last seen" />,
      visibleInMode: 'all',
      width: 'w-144',
      body: item => <FormattedRelativeTime date={item.last_seen} />,
    },
    {
      key: 'category',
      header: () => <Trans message="Category" />,
      visibleInMode: 'all',
      body: item =>
        item.category ? (
          <NameWithAvatar
            image={item.category.image}
            label={<CategoryLink category={item.category} target="_blank" />}
            description={item.category.description}
          />
        ) : null,
    },
  ];
  return cols.filter(Boolean) as ColumnConfig<SearchTermReport>[];
}
