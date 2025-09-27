import {RouteObject, useRoutes} from 'react-router-dom';
import {ArticlePage} from '@app/help-center/articles/article-page/article-page';
import {CategoryPage} from '@app/help-center/categories/category-page';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import React from 'react';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {HcSearchPage} from '@app/help-center/search/hc-search-page';
import {LandingPage} from '@app/help-center/homepage/landing-page';

const TicketRoutes = React.lazy(
  () => import('@app/help-center/tickets/hc-ticket-routes'),
);

const RouteConfig: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/articles/:articleId/:articleSlug',
    element: <ArticlePage />,
  },
  {
    path: '/articles/:categoryId/:sectionId/:articleId/:articleSlug',
    element: <ArticlePage />,
  },
  {
    path: '/categories/:categoryId/:sectionId/:slug',
    element: <CategoryPage />,
  },
  {
    path: '/categories/:categoryId/:slug',
    element: <CategoryPage />,
  },
  {
    path: '/search/:query',
    element: <HcSearchPage />,
  },
  {
    path: 'tickets/*',
    element: (
      <AuthRoute>
        <React.Suspense fallback={<FullPageLoader screen />}>
          <TicketRoutes />
        </React.Suspense>
      </AuthRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default function HcRoutes() {
  return useRoutes(RouteConfig);
}
