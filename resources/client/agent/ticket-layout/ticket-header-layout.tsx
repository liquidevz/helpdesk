import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {FormattedDate} from '@common/i18n/formatted-date';
import React, {Fragment, ReactNode, useEffect, useRef, useState} from 'react';
import {Ticket} from '@app/agent/ticket';
import {useTrans} from '@common/i18n/use-trans';
import {useForm} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import clsx from 'clsx';
import {Form} from '@common/ui/forms/form';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {
  UpdateTicketPayload,
  useUpdateTicket,
} from '@app/agent/agent-ticket-page/user-details-sidebar/requests/use-update-ticket';
import {toast} from '@common/ui/toast/toast';

export const TicketHeaderDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

interface Props {
  ticket: Ticket;
  children?: ReactNode;
  actions?: ReactNode;
}
export function TicketHeaderLayout({ticket, actions, children}: Props) {
  return (
    <Fragment>
      <div className="flex items-start gap-12 px-20 py-14 max-md:flex-col md:items-center">
        <EditableSubject ticket={ticket} />
        {children}
        <div className="mr-24 max-md:hidden" />
        <div className="whitespace-nowrap text-muted md:ml-auto">
          <FormattedRelativeTime date={ticket.created_at} /> (
          <FormattedDate
            date={ticket.created_at}
            options={TicketHeaderDateFormat}
          />
          )
        </div>
        {actions}
      </div>
    </Fragment>
  );
}

interface EditableSubjectProps {
  ticket: Ticket;
}
function EditableSubject({ticket}: EditableSubjectProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [subjectSize, setSubjectSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const {trans} = useTrans();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const form = useForm<UpdateTicketPayload>({
    defaultValues: {subject: ticket.subject},
  });
  const updateTicket = useUpdateTicket(ticket.id, form);
  const watchedSubject = form.watch('subject');

  const titlePlaceholder = trans({message: 'Subject'});

  // watch h1 for width changes and match input field width
  useEffect(() => {
    if (h1Ref.current) {
      const observer = new ResizeObserver(entries => {
        if (entries[0].contentRect.width > 0) {
          setSubjectSize({
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height,
          });
        }
      });
      observer.observe(h1Ref.current);
      return () => observer.disconnect();
    }
  }, []);

  const onSubmit = () => {
    setIsEditing(false);
    if (form.getValues('subject') === ticket.subject) {
      return;
    }
    updateTicket.mutate(
      {subject: form.getValues('subject')},
      {onSuccess: () => toast(trans({message: 'Subject updated'}))},
    );
  };

  if (isEditing) {
    return (
      <Form form={form} onSubmit={() => onSubmit()}>
        <FormTextField
          placeholder={titlePlaceholder}
          autoFocus
          onBlur={() => onSubmit()}
          name="subject"
          size="sm"
          style={{
            width: subjectSize ? `${subjectSize.width}px` : undefined,
            height: subjectSize ? `${subjectSize.height}px` : undefined,
          }}
          required
        />
      </Form>
    );
  }
  return (
    <h1
      ref={h1Ref}
      tabIndex={0}
      onClick={() => setIsEditing(true)}
      onFocus={() => setIsEditing(true)}
      className={clsx(
        'cursor-pointer rounded text-2xl hover:bg-primary/focus',
        !watchedSubject && 'text-muted',
      )}
    >
      <Tooltip label={<Trans message="Edit subject" />}>
        <span>{watchedSubject || titlePlaceholder}</span>
      </Tooltip>
    </h1>
  );
}
