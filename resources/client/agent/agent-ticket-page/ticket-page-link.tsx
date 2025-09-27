import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {ReactNode, useMemo} from 'react';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Ticket} from '@app/agent/ticket';

interface Props extends Omit<LinkProps, 'to'> {
  ticket: Ticket;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
}
export function TicketPageLink({
  ticket,
  className,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const finalUri = useMemo(() => {
    return getTicketPageLink(ticket);
  }, [ticket]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        color === 'primary'
          ? 'text-primary hover:text-primary-dark'
          : 'text-inherit',
        'overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline',
        className
      )}
      to={finalUri}
    >
      {children ?? ticket.subject}
    </Link>
  );
}

export function getTicketPageLink(
  ticket: Ticket,
  {absolute, tagId}: {absolute?: boolean; tagId?: string | number} = {}
): string {
  let link = `/agent/tickets/${ticket.id}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  if (tagId) {
    link = `${link}?tagId=${tagId}`;
  }
  return link;
}
