import React, {useMemo} from 'react';
import {Article} from '@app/help-center/articles/article';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Link} from 'react-router-dom';
import {slugifyString} from '@common/utils/string/slugify-string';
import {Section} from '@app/help-center/categories/category';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  article: Article;
  children?: React.ReactNode;
  section?: Section;
  className?: string;
  target?: string;
}
export function ArticleLink({
  article,
  children,
  section,
  className,
  target,
  ...linkProps
}: Props) {
  const link = useMemo(() => {
    return getArticleLink(article, {section});
  }, [article, section]);

  return (
    <Link
      className={clsx(
        'overflow-hidden overflow-ellipsis text-inherit outline-none transition-colors hover:underline focus-visible:underline',
        className,
      )}
      to={link}
      target={target}
      {...linkProps}
    >
      {children ?? article.title}
    </Link>
  );
}

interface Options {
  absolute?: boolean;
  section?: Section;
}
export function getArticleLink(
  article: {id: number; slug?: string; title: string; path?: Article['path']},
  {absolute, section}: Options = {},
): string {
  if (!section && article.path?.length) {
    section = article.path[1];
  }
  let link = `/hc/articles/${section?.parent_id}/${section?.id}/${article.id}/${
    article.slug ?? slugifyString(article.title)
  }`;

  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}

export function getEditArticleLink(article: Article) {
  if (article.path?.length === 2) {
    return `/admin/hc/arrange/sections/${article.path[1].id}/articles/${article.id}/edit`;
  }
  return `/admin/articles/${article.id}/edit`;
}
