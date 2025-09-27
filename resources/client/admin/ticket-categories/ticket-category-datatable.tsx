import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {UpdateTicketCategoryDialog} from '@app/admin/ticket-categories/update-ticket-category-dialog';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import softwareEngineerSvg from './software-engineer.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {CreateTicketCategoryDialog} from '@app/admin/ticket-categories/create-ticket-category-dialog';
import {TicketTag} from '@app/agent/ticket';

const columnConfig: ColumnConfig<TicketTag>[] = [
  {
    key: 'display_name',
    visibleInMode: 'all',
    header: () => <Trans message="Name" />,
    body: category => category.display_name,
  },
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Identifier" />,
    body: category => category.name,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: category => <FormattedDate date={category.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: category => (
      <DialogTrigger type="modal">
        <IconButton size="md" className="text-muted">
          <EditIcon />
        </IconButton>
        <UpdateTicketCategoryDialog tag={category} />
      </DialogTrigger>
    ),
  },
];

export function TicketCategoryDatatable() {
  return (
    <DataTablePage
      endpoint="ticket-categories"
      title={<Trans message="Ticket categories" />}
      columns={columnConfig}
      actions={<Actions />}
      queryParams={{
        with: 'categories',
      }}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={softwareEngineerSvg}
          title={<Trans message="No categories have been created yet" />}
          filteringTitle={<Trans message="No matching categories" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <>
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Add category" />
        </DataTableAddItemButton>
        <CreateTicketCategoryDialog />
      </DialogTrigger>
    </>
  );
}
