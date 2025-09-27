import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {Link} from 'react-router-dom';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';
import {ArticleReportItem} from '@app/admin/reports/articles-report/use-articles-report';
import {getArticleLink} from '@app/help-center/articles/article-link';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {ArticlePath} from '@app/help-center/articles/article-path';

export const ArticleReportTableColumns: ColumnConfig<ArticleReportItem>[] = [
  {
    key: 'article',
    header: () => (
      <div className="flex items-center gap-4">
        <div>
          <Trans message="Article" />
        </div>
        <InfoDialogTrigger
          body={
            <Trans message="Use the popular articles report to see which articles are most popular, and which articles are the most or least helpful." />
          }
        />
      </div>
    ),
    visibleInMode: 'all',
    body: item => (
      <Link to={getArticleLink(item)} className={LinkStyle} target="_blank">
        {item.title}
      </Link>
    ),
  },
  {
    key: 'views',
    header: () => <Trans message="Views" />,
    width: 'w-144',
    body: item => <FormattedNumber value={item.views} />,
  },
  {
    key: 'score',
    header: () => <Trans message="Score" />,
    width: 'w-144',
    body: item => <span>{item.score}%</span>,
  },
  {
    key: 'likes',
    header: () => <Trans message="Likes" />,
    width: 'w-144',
    body: item => <FormattedNumber value={item.positive_votes} />,
  },
  {
    key: 'dislikes',
    header: () => <Trans message="Dislikes" />,
    width: 'w-144',
    body: item => <FormattedNumber value={item.negative_votes} />,
  },
  {
    key: 'category',
    header: () => <Trans message="Category" />,
    visibleInMode: 'all',
    body: item => <ArticlePath article={item} />,
  },
];
