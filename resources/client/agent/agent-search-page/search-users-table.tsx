import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useSearchUsers} from '@app/agent/agent-search-page/requests/use-search-users';
import {ColumnConfig} from '@common/datatable/column-config';
import {User} from '@common/auth/user';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Table} from '@common/ui/tables/table';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {SearchTableLayout} from '@app/agent/agent-search-page/search-table-layout';

const columnConfig: ColumnConfig<User>[] = [
  {
    key: 'name',
    allowsSorting: true,
    sortingKey: 'email',
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="User" />,
    body: user => (
      <NameWithAvatar
        image={user.avatar}
        label={user.display_name}
        description={user.email}
      />
    ),
  },
  {
    key: 'roles',
    header: () => <Trans message="Roles" />,
    body: user => (
      <ChipList radius="rounded" size="xs">
        {user.roles?.map(role => (
          <Chip key={role.id} selectable className="capitalize">
            <Trans message={role.name} />
          </Chip>
        ))}
      </ChipList>
    ),
  },
  {
    key: 'createdAt',
    allowsSorting: true,
    width: 'w-96',
    header: () => <Trans message="Created at" />,
    body: user => (
      <time>
        <FormattedDate date={user.created_at} />
      </time>
    ),
  },
];

export function SearchUsersTable() {
  const navigate = useNavigate();
  const query = useSearchUsers();
  return (
    <SearchTableLayout query={query}>
      <Table
        headerCellHeight="h-36"
        cellHeight="h-64"
        columns={columnConfig}
        data={query.data?.pagination.data || []}
        enableSelection={false}
        onAction={user => navigate(`/agent/users/${user.id}`)}
      />
    </SearchTableLayout>
  );
}
