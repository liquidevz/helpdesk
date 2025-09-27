import {RoleSelector} from '@app/admin/help-center/role-selector';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import React, {ReactNode} from 'react';

interface Props {
  className?: string;
  description?: ReactNode;
}
export function ManagedByField({className, description}: Props) {
  return (
    <RoleSelector
      className={className}
      name="managed_by_role"
      label={<Trans message="Managed by" />}
      description={description}
      defaultItem={
        <Item key="admins-default" value={undefined}>
          <Trans message="Admins" />
        </Item>
      }
    />
  );
}
