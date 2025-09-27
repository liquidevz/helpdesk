import {
  SearchArticlesResponse,
  useSearchArticles,
} from '@app/help-center/search/use-search-articles';
import {AnimatePresence, m} from 'framer-motion';
import {Trans} from '@common/i18n/trans';
import {ArticleLink} from '@app/help-center/articles/article-link';
import {AccordionAnimation} from '@common/ui/accordion/accordtion-animation';
import {MutableRefObject} from 'react';
import {SearchSessionItem} from '@app/help-center/search/use-search-term-logger';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';

interface Props {
  query: string;
  suggestionLog: MutableRefObject<SearchSessionItem[]>;
  hcCategoryIds?: number[];
}
export function SuggestedArticlesDrawer({
  query,
  suggestionLog,
  hcCategoryIds,
}: Props) {
  const now = useCurrentDateTime();
  const handleSearch = (r: SearchArticlesResponse) => {
    if (r.pagination.data.length) {
      suggestionLog.current.push({
        term: r.query,
        results: r.pagination.data.map(a => a.id),
        date: now.toAbsoluteString(),
      });
    }
  };

  const {data} = useSearchArticles(
    query,
    {perPage: 5, categoryIds: hcCategoryIds},
    {onSearch: handleSearch},
  );
  const results = data?.pagination.data;
  const isVisible = !!results?.length;

  return (
    <AnimatePresence>
      <m.div
        key="drawer"
        variants={AccordionAnimation.variants}
        transition={AccordionAnimation.transition}
        initial={false}
        animate={isVisible ? 'open' : 'closed'}
      >
        <div className="mb-10 mt-24 text-xl font-semibold">
          <Trans message="Were you looking for" />:
        </div>
        {results?.map(article => (
          <ArticleLink
            key={article.id}
            article={article}
            className="block py-10 text-sm text-primary"
            target="_blank"
          />
        ))}
      </m.div>
    </AnimatePresence>
  );
}
