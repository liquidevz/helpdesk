import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {ReactNode, useMemo} from 'react';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {User} from '@common/auth/user';

interface Props extends Omit<LinkProps, 'to'> {
  customer: User;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
}
export function CustomerLink({
  customer,
  className,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const finalUri = useMemo(() => {
    return getCustomerLink(customer.id);
  }, [customer]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        color === 'primary'
          ? 'text-primary hover:text-primary-dark'
          : 'text-inherit',
        'overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline',
        className,
      )}
      to={finalUri}
    >
      {children ?? customer.display_name}
    </Link>
  );
}

export function getCustomerLink(
  userId: number | string,
  {absolute, tab}: {absolute?: boolean; tab?: string} = {},
): string {
  if (!tab) {
    tab = 'tickets';
  }
  let link = `/agent/users/${userId}/${tab}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
