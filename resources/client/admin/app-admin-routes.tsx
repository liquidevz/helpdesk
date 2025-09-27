import {Navigate, RouteObject} from 'react-router-dom';
import {HcCategoryManager} from '@app/admin/help-center/manager/hc-category-manager';
import {HcArticleManager} from '@app/admin/help-center/manager/hc-article-manager';
import {UpdateArticlePage} from '@app/admin/help-center/article-editor/update-article-page';
import {CreateArticlePage} from '@app/admin/help-center/article-editor/create-article-page';
import {CannedRepliesDatatablePage} from '@app/admin/canned-replies/canned-replies-datatable-page';
import {AdminTicketReport} from '@app/admin/reports/ticket-report/admin-ticket-report';
import {AdminVisitorsReport} from '@app/admin/reports/admin-visitors-report';
import React from 'react';
import {AdminSearchReport} from '@app/admin/reports/search-report/admin-search-report';
import {FailedSearchesReport} from '@app/admin/reports/search-report/failed-searches-report';
import {PopularSearchesReport} from '@app/admin/reports/search-report/popular-searches-report';
import {ArticlesReport} from '@app/admin/reports/articles-report/articles-report';
import {EnvatoReport} from '@app/admin/reports/envato-report/envato-report';
import {TriggersDatatablePage} from '@app/admin/triggers/triggers-datatable-page';
import {UpdateTriggerPage} from '@app/admin/triggers/update-trigger-page';
import {CreateTriggerPage} from '@app/admin/triggers/create-trigger-page';
import {ArticleDatatablePage} from '@app/admin/article-datatable/article-datatable-page';
import {TicketCategoryDatatable} from '@app/admin/ticket-categories/ticket-category-datatable';

export const AppAdminRoutes: RouteObject[] = [
  {
    path: '/',
    children: [
      {path: 'tickets', element: <AdminTicketReport />},
      {path: 'envato', element: <EnvatoReport />},
      {
        path: 'search',
        element: <AdminSearchReport />,
        children: [
          {
            index: true,
            element: <Navigate to="failed" replace />,
          },
          {
            path: 'failed',
            element: <FailedSearchesReport />,
          },
          {
            path: 'popular',
            element: <PopularSearchesReport />,
          },
          {
            path: 'articles',
            element: <ArticlesReport />,
          },
        ],
      },
      {path: 'visitors', element: <AdminVisitorsReport />},
      {index: true, element: <Navigate to="tickets" replace />},
    ],
  },
  // help center
  {
    path: '/hc',
    element: <Navigate to="/hc/arrange" replace />,
  },
  {
    path: '/hc/arrange',
    element: <HcCategoryManager />,
  },
  {
    path: '/hc/arrange/categories/:categoryId',
    element: <HcCategoryManager />,
  },
  {
    path: '/hc/arrange/sections/:sectionId',
    element: <HcArticleManager />,
  },
  {
    path: 'articles',
    element: <ArticleDatatablePage />,
  },
  {
    path: 'articles/new',
    element: <CreateArticlePage />,
  },
  {
    path: 'articles/:articleId/edit',
    element: <UpdateArticlePage />,
  },
  // edit article
  {
    path: '/hc/arrange/sections/:sectionId/articles/:articleId/edit',
    element: <UpdateArticlePage />,
  },
  {
    path: '/hc/arrange/categories/:categoryId/articles/:articleId/edit',
    element: <UpdateArticlePage />,
  },
  {
    path: '/hc/articles/:articleId/edit',
    element: <UpdateArticlePage />,
  },
  // create article
  {
    path: '/hc/arrange/sections/:sectionId/articles/new',
    element: <CreateArticlePage />,
  },
  {
    path: '/hc/arrange/categories/:categoryId/articles/new',
    element: <CreateArticlePage />,
  },
  {
    path: '/hc/articles/new',
    element: <CreateArticlePage />,
  },
  // tickets
  {
    path: '/ticket-categories',
    element: <TicketCategoryDatatable />,
  },
  // canned replies
  {
    path: '/saved-replies',
    element: <CannedRepliesDatatablePage />,
  },
  // triggers
  {
    path: '/triggers',
    element: <TriggersDatatablePage />,
  },
  {
    path: '/triggers/new',
    element: <CreateTriggerPage />,
  },
  {
    path: '/triggers/:triggerId/edit',
    element: <UpdateTriggerPage />,
  },
];
