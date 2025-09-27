import {GetArticleResponse} from '@app/help-center/articles/use-article';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Trans} from '@common/i18n/trans';
import {getCategoryLink} from '@app/help-center/categories/category-link';
import React from 'react';
import {Section} from '@app/help-center/categories/category';

interface Props {
  data: GetArticleResponse;
  className?: string;
}

export function ArticlePageBreadcrumb({data: {article}, className}: Props) {
  const navigate = useNavigate();

  if (!article.path?.length) {
    return null;
  }

  return (
    <Breadcrumb size="sm" className={className}>
      <BreadcrumbItem onSelected={() => navigate(`/hc`)}>
        <Trans message="Help center" />
      </BreadcrumbItem>
      {article.path.map(category => (
        <BreadcrumbItem
          key={`${(category as Section).parent_id}-${category.id}`} // prevent duplicate keys
          onSelected={() => navigate(getCategoryLink(category))}
        >
          <Trans message={category.name} />
        </BreadcrumbItem>
      ))}
      <BreadcrumbItem>
        <Trans message="Article" />
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
