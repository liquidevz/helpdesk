import {RoleSelector} from '@app/admin/help-center/role-selector';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import React, {ReactNode} from 'react';

interface Props {
  className?: string;
  description?: ReactNode;
}
export function VisibleToField({className, description}: Props) {
  return (
    <RoleSelector
      className={className}
      name="visible_to_role"
      label={<Trans message="Visible to" />}
      description={description}
      defaultItem={
        <Item key="everyone-default" value={null}>
          <Trans message="Everyone" />
        </Item>
      }
    />
  );
}
