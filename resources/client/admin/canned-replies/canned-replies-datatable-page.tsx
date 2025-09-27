import {Trans} from '@common/i18n/trans';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import onlineArticlesImg from '@app/admin/canned-replies/online-articles.svg';
import {CannedRepliesDatatableFilters} from '@app/admin/canned-replies/canned-replies-datatable-filters';
import {CannedRepliesDatatableColumns} from '@app/admin/canned-replies/canned-replies-datatable-columns';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CreateCannedReplyDialog} from '@app/agent/agent-ticket-page/canned-replies/create-canned-reply-dialog';
import {useMemo} from 'react';

interface Props {
  userId?: number;
}
export function CannedRepliesDatatablePage({userId}: Props) {
  const {columns, filters} = useMemo(() => {
    return {
      columns: CannedRepliesDatatableColumns.filter(
        c => c.key !== 'user_id' || !userId
      ),
      filters: CannedRepliesDatatableFilters.filter(
        f => f.key !== 'user_id' || !userId
      ),
    };
  }, [userId]);

  return (
    <DataTablePage
      endpoint="canned-replies"
      title={<Trans message="Saved replies" />}
      columns={columns}
      filters={filters}
      queryParams={{
        shared: 'true',
        with: !userId ? 'user' : undefined,
        user_id: userId,
      }}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      enableSelection={false}
      cellHeight="h-76"
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={onlineArticlesImg}
          title={<Trans message="No saved replies have been created yet" />}
          filteringTitle={<Trans message="No matching replies" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <DialogTrigger type="modal">
      <DataTableAddItemButton>
        <Trans message="Add reply" />
      </DataTableAddItemButton>
      <CreateCannedReplyDialog />
    </DialogTrigger>
  );
}
