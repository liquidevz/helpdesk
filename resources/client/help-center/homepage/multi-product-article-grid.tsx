import React, {Fragment} from 'react';
import {LandingPageData} from '@app/help-center/homepage/use-landing-page';
import {Category, Section} from '@app/help-center/categories/category';
import clsx from 'clsx';
import {
  ArticleLink,
  getArticleLink,
} from '@app/help-center/articles/article-link';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {Article} from '@app/help-center/articles/article';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {
  CategoryLink,
  getCategoryLink,
} from '@app/help-center/categories/category-link';

interface Props {
  data: LandingPageData;
}
export function MultiProductArticleGrid({data}: Props) {
  return (
    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
      {data.categories.map(category => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  );
}

interface CategoryRowProps {
  category: Category;
}

function CategoryRow({category}: CategoryRowProps) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        className="cursor-pointer rounded-xl border p-24 transition-shadow hover:shadow"
        onClick={() => navigate(getCategoryLink(category))}
      >
        <div className="flex items-center gap-10">
          {category.image && (
            <img
              className="h-40 w-40 flex-shrink-0 rounded"
              src={category.image}
              alt=""
            />
          )}
          <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[21px] font-medium">
            <CategoryLink
              category={category}
              onClick={e => e.stopPropagation()}
            />
          </h2>
        </div>
        {category.description && (
          <p className="mt-10 text-sm">{category.description}</p>
        )}
      </div>
      <div className="rounded-xl border">
        {category.sections
          ?.slice(0, 3)
          .map((section, index) =>
            section.articles?.[0] ? (
              <ArticleRow
                key={section.id}
                article={section.articles[0]}
                section={section}
                className={index !== 2 ? 'border-b' : undefined}
              />
            ) : null,
          )}
      </div>
    </Fragment>
  );
}

interface ArticleRowProps {
  article: Article;
  className?: string;
  section: Section;
}
function ArticleRow({article, className, section}: ArticleRowProps) {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center gap-12 p-12',
        className,
      )}
      onClick={() => navigate(getArticleLink(article, {section}))}
    >
      <ArticleLink
        className="block flex-auto text-sm"
        article={article}
        section={section}
        onClick={e => e.stopPropagation()}
      />
      <KeyboardArrowRightIcon className="ml-auto flex-shrink-0 text-muted" />
    </div>
  );
}
