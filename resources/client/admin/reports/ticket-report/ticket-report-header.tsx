import {FetchTicketReportResponse} from '@app/admin/reports/ticket-report/use-ticket-report';
import {AdminHeaderReport} from '@common/admin/analytics/admin-header-report';
import {useMemo} from 'react';
import {HeaderDatum} from '@common/admin/analytics/use-admin-report';
import {CheckIcon} from '@common/icons/material/Check';
import {HelpOutlineIcon} from '@common/icons/material/HelpOutline';
import {SendIcon} from '@common/icons/material/Send';
import {EmojiEventsIcon} from '@common/icons/material/EmojiEvents';

interface Props {
  data?: FetchTicketReportResponse;
  isLoading?: boolean;
}
export function TicketReportHeader({data, isLoading}: Props) {
  const report: HeaderDatum[] = useMemo(() => {
    return [
      {
        name: 'New tickets',
        currentValue: data?.newTickets.datasets[0].total ?? 0,
        previousValue: data?.newTickets.datasets[1]?.total ?? undefined,
        icon: <SendIcon />,
      },
      {
        name: 'Solved tickets',
        currentValue: data?.newTickets.datasets[0].solvedTotal ?? 0,
        previousValue: data?.newTickets.datasets[1]?.solvedTotal ?? undefined,
        icon: <CheckIcon />,
      },
      {
        name: 'Unsolved tickets',
        currentValue: data?.newTickets.datasets[0].unsolvedTotal ?? 0,
        previousValue: data?.newTickets.datasets[1]?.unsolvedTotal ?? undefined,
        icon: <HelpOutlineIcon />,
      },
      {
        name: 'Solved on first reply',
        currentValue:
          data?.newTickets.datasets[0].solvedOnFirstReplyPercentage ?? 0,
        previousValue:
          data?.newTickets.datasets[1]?.solvedOnFirstReplyPercentage ??
          undefined,
        icon: <EmojiEventsIcon />,
        type: 'percentage',
      },
    ];
  }, [data]);
  return <AdminHeaderReport report={report} isLoading={isLoading} />;
}
