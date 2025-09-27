import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  createdAtFilter,
  timestampFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {useMailboxSidenavTags} from '@app/agent/use-mailbox-sidenav-tags';
import {useMemo} from 'react';
import {USER_MODEL} from '@common/auth/user';

export function useSearchTicketsFilters(): BackendFilter[] | null {
  const {data} = useMailboxSidenavTags();

  return useMemo(() => {
    if (!data) return null;
    return [
      {
        key: 'status',
        label: message('Status'),
        description: message('Ticket status'),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.Select,
          defaultValue: '01',
          options: data.statusTags.map(tag => ({
            key: tag.id,
            label: message(tag.display_name || tag.name),
            value: tag.name,
          })),
        },
      },
      {
        key: 'tag',
        label: message('Folder'),
        description: message('Folder ticket is assigned to'),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.Select,
          defaultValue: '01',
          options: data.categoryTags.map(tag => ({
            key: tag.id,
            label: message(tag.display_name || tag.name),
            value: tag.name,
          })),
        },
      },
      createdAtFilter({
        description: message('Date ticket was created'),
      }),
      updatedAtFilter({
        description: message('Date ticket was last updated'),
      }),
      timestampFilter({
        key: 'closed_at',
        label: message('Closed at'),
        description: message('Date ticket was closed'),
      }),
      {
        key: 'user_id',
        label: message('Customer'),
        description: message('Customer that created the ticket'),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.SelectModel,
          model: USER_MODEL,
        },
      },
      {
        key: 'assigned_to',
        label: message('Assignee'),
        description: message('Agent assigned to the ticket'),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.SelectModel,
          model: USER_MODEL,
        },
      },
    ];
  }, [data]);
}
