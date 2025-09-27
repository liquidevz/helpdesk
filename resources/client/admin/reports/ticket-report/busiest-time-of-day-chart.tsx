import {useSelectedLocale} from '@common/i18n/selected-locale';
import {useDateFormatter} from '@common/i18n/use-date-formatter';
import {startOfWeek} from '@internationalized/date';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';
import {ChartLayout} from '@common/charts/chart-layout';
import {Trans} from '@common/i18n/trans';
import React, {Fragment} from 'react';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {FetchTicketReportResponse} from '@app/admin/reports/ticket-report/use-ticket-report';

const days = [0, 1, 2, 3, 4, 5, 6];

const hours = [
  '0-2',
  '2-4',
  '4-6',
  '6-8',
  '8-10',
  '10-12',
  '12-14',
  '14-16',
  '16-18',
  '18-20',
  '20-22',
  '22-24',
];

interface Props {
  report?: FetchTicketReportResponse['busiestTimeOfDay'];
}
export function BusiestTimeOfDayChart({report}: Props) {
  const locale = useSelectedLocale();
  const formatter = useDateFormatter({weekday: 'short'});
  const date = startOfWeek(useCurrentDateTime(), locale.localeCode);
  return (
    <ChartLayout title={<Trans message="Busiest time of day" />}>
      <div className="grid w-full grid-cols-[max-content,repeat(12,minmax(66px,1fr))] gap-1">
        <div className="spacer" />
        {hours.map(hour => (
          <div key={hour} className="py-6 text-center text-xs font-semibold">
            {hour}
          </div>
        ))}
        {days.map(day => (
          <Fragment key={day}>
            <div className="flex h-44 items-center pr-10 text-xs font-semibold">
              {formatter.format(date.add({days: day}).toDate())}
            </div>
            {hours.map(hour => {
              const count = report
                ? report.datasets[0].data[day].value[hour]
                : 0;
              return (
                <Tooltip
                  key={hour}
                  label={
                    <Trans message=":count new tickets" values={{count}} />
                  }
                >
                  <div
                    className="h-44 bg-primary opacity-10 transition-opacity"
                    style={{
                      opacity: report
                        ? getOpacity(count, report.datasets[0].max)
                        : 0.1,
                    }}
                  />
                </Tooltip>
              );
            })}
          </Fragment>
        ))}
      </div>
    </ChartLayout>
  );
}

function getOpacity(count: number, max: number) {
  if (count === 0) return 0.1;
  return Math.max(0.1, Math.min(1, count / max));
}
