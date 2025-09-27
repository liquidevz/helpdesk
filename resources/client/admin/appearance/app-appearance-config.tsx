import {
  IAppearanceConfig,
  MenuSectionConfig,
  SeoSettingsSectionConfig,
} from '@common/admin/appearance/types/appearance-editor-config';
import {message} from '@common/i18n/message';
import {LandingPageSection} from '@app/admin/appearance/landing-page-section';
import {NewTicketPageSection} from '@app/admin/appearance/new-ticket-page-section/new-ticket-page-section';
import {SidebarTipSection} from '@app/admin/appearance/new-ticket-page-section/sidebar-tips-section';
import {AppearanceEditorBreadcrumbItem} from '@common/admin/appearance/types/appearance-editor-section';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: '/',
    navigationRoutes: ['/'],
  },
  sections: {
    'landing-page': {
      label: message('Landing page'),
      position: 0,
      previewRoute: '/',
      routes: [{path: 'landing-page', element: <LandingPageSection />}],
      buildBreadcrumb: () => [
        {
          label: message('Landing page'),
          location: 'landing-page',
        },
      ],
    },
    'new-ticket': {
      label: message('New ticket page'),
      position: 1,
      previewRoute: '/hc/tickets/new',
      routes: [
        {path: 'new-ticket', element: <NewTicketPageSection />},
        {
          path: 'new-ticket/sidebar',
          element: <SidebarTipSection />,
        },
      ],
      buildBreadcrumb: sectionName => {
        const breadcrumb: AppearanceEditorBreadcrumbItem[] = [
          {
            label: message('New ticket page'),
            location: 'new-ticket',
          },
        ];
        if (sectionName.endsWith('sidebar')) {
          breadcrumb.push({
            label: message('Sidebar'),
            location: 'landing-page/sidebar',
          });
        }
        return breadcrumb;
      },
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'header',
          'agent-mailbox',
          'landing-page-navbar',
          'landing-page-footer',
        ],
        availableRoutes: [
          '/hc',
          '/hc/tickets',
          '/hc/tickets/new',
          '/agent/tickets',
          '/admin/hc/arrange',
          '/admin/hc/articles',
          '/admin/triggers',
        ],
      } as MenuSectionConfig,
    },
    // @ts-ignore
    'seo-settings': {
      config: {
        pages: [
          {
            key: 'landing-page',
            label: message('Landing page'),
          },
          {
            key: 'article-page',
            label: message('Article page'),
          },
          {
            key: 'category-page',
            label: message('Category page'),
          },
          {
            key: 'search-page',
            label: message('Search page'),
          },
        ],
      } as SeoSettingsSectionConfig,
    },
  },
};
