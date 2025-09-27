import {ChartLayout} from '@common/charts/chart-layout';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {FetchTicketReportResponse} from '@app/admin/reports/ticket-report/use-ticket-report';
import clsx from 'clsx';

interface Props {
  report?: FetchTicketReportResponse['agents'];
}
export function AgentPerformanceTable({report}: Props) {
  const data = report?.datasets[0].data;
  const cmpData = report?.datasets[1]?.data;
  return (
    <ChartLayout
      title={<Trans message="Agent performance" />}
      contentIsFlex={false}
      minHeight="min-h-0"
    >
      <table className="w-full">
        <thead className="text-xs font-medium text-muted">
          <tr className="h-40">
            <th className="border-b text-left">
              <Trans message="Agent" />
            </th>
            <th className="border-b text-left">
              <Trans message="Reply count" />
            </th>
            <th className="border-b text-left">
              <Trans message="Tickets solved" />
            </th>
            <th className="border-b text-left">
              <Trans message="Avg response time" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((agent, i) => {
            const isLast = i === data.length - 1;
            return (
              <tr className="h-40 text-sm" key={i}>
                <td className={!isLast ? 'border-b' : undefined}>
                  {agent.email}
                </td>
                <td className={!isLast ? 'border-b' : undefined}>
                  {agent.replyCount}
                  {cmpData && (
                    <CompareValue
                      currentValue={agent.replyCount}
                      previousValue={cmpData[i].replyCount}
                    />
                  )}
                </td>
                <td className={!isLast ? 'border-b' : undefined}>
                  {agent.ticketsSolved}
                  {cmpData && (
                    <CompareValue
                      currentValue={agent.ticketsSolved}
                      previousValue={cmpData[i].ticketsSolved}
                    />
                  )}
                </td>
                <td className={!isLast ? 'border-b' : undefined}>
                  {agent.averageResponseTime}h
                  {cmpData && (
                    <CompareValue
                      currentValue={agent.averageResponseTime}
                      previousValue={cmpData[i].averageResponseTime}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ChartLayout>
  );
}

interface CompareValueProps {
  currentValue: number;
  previousValue: number;
}
function CompareValue({currentValue, previousValue}: CompareValueProps) {
  const percent = calculatePercentage(currentValue, previousValue);
  return (
    <span
      className={clsx('pl-6', percent > 0 ? 'text-positive' : 'text-danger')}
    >
      {percent}%
    </span>
  );
}

function calculatePercentage(currentValue: number, previousValue: number) {
  if (previousValue == null || currentValue == null) {
    return 0;
  }

  if (previousValue === 0) {
    return 100;
  }

  return Math.round(((currentValue - previousValue) / previousValue) * 100);
}
