import {useActivityLog} from '@app/agent/agent-ticket-page/user-details-sidebar/activity-log/use-activity-log';
import {Ticket, TICKET_MODEL_TYPE} from '@app/agent/ticket';
import {UserDetailsSection} from '@app/agent/agent-ticket-page/user-details-sidebar/user-details-section';
import {Trans} from '@common/i18n/trans';
import {
  ActivityLogItem,
  TicketActivityLogItem,
} from '@app/agent/agent-ticket-page/user-details-sidebar/activity-log/activity-log-item';
import {Article, ARTICLE_MODEL} from '@app/help-center/articles/article';
import {ArticleLink} from '@app/help-center/articles/article-link';
import clsx from 'clsx';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {FormattedDate} from '@common/i18n/formatted-date';
import {TicketPageLink} from '@app/agent/agent-ticket-page/ticket-page-link';
import {
  SEARCH_TERM_MODEL,
  SearchTerm,
} from '@app/agent/agent-search-page/search-term';
import {Link} from 'react-router-dom';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {Timeline, TimelineItem} from '@common/ui/timeline';
import {Fragment} from 'react';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {Skeleton} from '@common/ui/skeleton/skeleton';

const timePreset: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

interface Props {
  ticket: Ticket;
}
export function ActivityList({ticket}: Props) {
  const userId = ticket.user!.id;
  const query = useActivityLog({userId});

  const skeletons = (
    <m.div key="skeletons" className="px-14 py-6" {...opacityAnimation}>
      {Array.from({length: 5}).map((_, index) => (
        <Skeleton className="min-h-48" key={index} />
      ))}
    </m.div>
  );

  const timeline = (
    <Fragment>
      <m.div key="timeline" {...opacityAnimation}>
        <Timeline>
          {query.items.map(activity => (
            <TimelineItem
              key={activity.id}
              className={clsx(
                'px-14 py-6',
                activity.event === 'created' &&
                  activity.subject?.id === ticket.id &&
                  'bg-primary/8',
              )}
            >
              <ListItem activity={activity} />
              <div className="flex items-center gap-4 text-xs text-muted">
                <FormattedRelativeTime date={activity.created_at} />
                <div>&bull;</div>
                <FormattedDate
                  date={activity.created_at}
                  options={timePreset}
                />
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </m.div>
      <InfiniteScrollSentinel query={query} size="sm" />
    </Fragment>
  );

  return (
    <UserDetailsSection
      label={<Trans message="Activity" />}
      name="activity-visible"
      className="mt-10"
    >
      <AnimatePresence initial={false} mode="wait">
        {query.isLoading ? skeletons : timeline}
      </AnimatePresence>
    </UserDetailsSection>
  );
}

interface ListItemProps {
  activity: ActivityLogItem;
}
function ListItem({activity}: ListItemProps) {
  switch (activity.subject?.model_type) {
    case ARTICLE_MODEL:
      return (
        <Trans
          message="Viewd article: :link"
          values={{
            link: (
              <ArticleLink
                target="_blank"
                className="font-semibold"
                article={activity.subject as Article}
              />
            ),
          }}
        />
      );
    case TICKET_MODEL_TYPE:
      return <TicketListItem activity={activity as TicketActivityLogItem} />;
    case SEARCH_TERM_MODEL:
      const term = (activity.subject as SearchTerm).term;
      return (
        <Trans
          message="Search for: :link"
          values={{
            link: (
              <Link
                target="_blank"
                className="font-semibold"
                to={`/hc/search?query=${term}`}
              >
                {term}
              </Link>
            ),
          }}
        />
      );
    default:
      return null;
  }
}

interface TicketListItemProps {
  activity: TicketActivityLogItem;
}
function TicketListItem({activity}: TicketListItemProps) {
  const link = (
    <TicketPageLink
      target="_blank"
      className="font-semibold"
      ticket={activity.subject as Ticket}
    />
  );
  if (activity.event === 'replied') {
    if (activity.properties?.source === 'email') {
      return <Trans message="Replied via email: :link" values={{link}} />;
    } else {
      return <Trans message="Replied via website: :link" values={{link}} />;
    }
  } else if (activity.event === 'created') {
    return <Trans message="Created ticket: :link" values={{link}} />;
  } else if (activity.event === 'articlesSuggested') {
    return (
      <Trans
        message={`Suggested :count articles for ":query"`}
        values={{
          count: activity.properties?.articleIds?.length || 1,
          query: activity.properties?.query,
        }}
      />
    );
  }
  return null;
}
