import React from 'react';
import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {Trigger} from '@app/admin/triggers/trigger';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {Link} from 'react-router-dom';

export const TriggersDatatableColumns: ColumnConfig<Trigger>[] = [
  {
    key: 'name',
    allowsSorting: true,
    visibleInMode: 'all',
    width: 'flex-3 min-w-200',
    header: () => <Trans message="Name" />,
    body: trigger => trigger.name,
  },
  {
    key: 'times_fired',
    allowsSorting: true,
    header: () => <Trans message="Times used" />,
    body: trigger => <FormattedNumber value={trigger.times_fired} />,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: trigger => <FormattedDate date={trigger.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: trigger => (
      <IconButton
        size="md"
        className="text-muted"
        elementType={Link}
        to={`/admin/triggers/${trigger.id}/edit`}
      >
        <EditIcon />
      </IconButton>
    ),
  },
];
