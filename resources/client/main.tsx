import './app.css';
import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {CommonProvider} from '@common/core/common-provider';
import * as Sentry from '@sentry/react';
import {rootEl} from '@common/core/root-el';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {ignoredSentryErrors} from '@common/errors/ignored-sentry-errors';
import type {GetArticleResponse} from '@app/help-center/articles/use-article';
import {AppRoutes} from '@app/app-routes';
import {BrowserRouter} from 'react-router-dom';
import {PurchaseCode} from '@app/agent/purchase-code';
import type {AfterReplyAction} from '@app/agent/agent-ticket-page/use-after-reply-action';
import {CustomerNewTicketPageConfig} from '@app/help-center/tickets/customer-new-ticket-page/customer-new-ticket-page-config';
import {GetCategoryResponse} from '@app/help-center/categories/use-category';
import {initSearchTermLogger} from '@app/help-center/search/use-search-term-logger';
import {FetchCustomPageResponse} from '@common/custom-page/use-custom-page';
import {SearchArticlesResponse} from '@app/help-center/search/use-search-articles';
import {Tag} from '@common/tags/tag';

import {ImapConnectionCredentials} from '@app/admin/settings/incoming-email/imap-connection-credentials';

declare module '@common/http/value-lists' {
  interface FetchValueListsResponse {
    //
  }
}

declare module '@common/core/bootstrap-data/bootstrap-data' {
  interface BootstrapData {
    loaders?: {
      landingPage?: any;
      articlePage?: GetArticleResponse;
      updateArticle?: GetArticleResponse;
      categoryPage?: GetCategoryResponse;
      updateCategory?: GetCategoryResponse;
      customPage?: FetchCustomPageResponse;
      searchArticles?: SearchArticlesResponse;
    };
  }
}

declare module '@common/core/settings/settings' {
  interface Settings {
    homepage?: {
      type?: string;
      value?: string;
    };
    ads?: {
      disable?: boolean;
    };
    landing?: {
      show_footer?: boolean;
      hide_small_categories?: boolean;
      header?: {
        variant?: 'simple' | 'colorful';
        title?: string;
        subtitle?: string;
        placeholder?: string;
        background?: string;
        backgroundRepeat?: string;
        backgroundPosition?: string;
        backgroundSize?: string;
      };
      content?: {
        variant?: 'articleGrid' | 'multiProduct';
      };
    };
    hc?: {
      newTicket?: {
        appearance?: CustomerNewTicketPageConfig;
      };
    };
    article?: {
      hide_new_ticket_link?: boolean;
    };
    replies?: {
      after_reply_action?: AfterReplyAction;
      create_from_emails?: boolean;
    };
    envato?: {
      enable: boolean;
      require_purchase_code: boolean;
      active_support: boolean;
      filter_search: boolean;
    };
    tickets?: {
      log_activity?: boolean;
      create_from_emails?: boolean;
    };
    incoming_email?: {
      imap?: {
        connections?: ImapConnectionCredentials[];
      };
      gmail?: {
        enabled?: boolean;
      };
      api?: {
        enabled?: boolean;
      };
    };
  }
}

declare module '@common/auth/user' {
  interface User {
    purchase_codes?: PurchaseCode[];
    tags?: Tag[];
    secondary_emails?: {address: string}[];
    details?: {
      details?: string;
      notes?: string;
    };
  }
}

const data = getBootstrapData();
const sentryDsn = data.settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
    ignoreErrors: ignoredSentryErrors,
    release: data.sentry_release,
  });
}

const app = (
  <BrowserRouter basename={data.settings.html_base_uri}>
    <CommonProvider>
      <AppRoutes />
    </CommonProvider>
  </BrowserRouter>
);

if (data.rendered_ssr) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
  initSearchTermLogger();
}
