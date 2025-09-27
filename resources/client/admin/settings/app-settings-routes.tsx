import {RouteObject} from 'react-router-dom';
import {SearchSettings} from '@common/admin/settings/pages/search-settings/search-settings';
import {EnvatoSettings} from '@app/admin/settings/envato-settings/envato-settings';
import {HcSettings} from '@app/admin/settings/hc-settings/hc-settings';
import {IncomingEmailSettings} from '@app/admin/settings/incoming-email/incoming-email-settings';

export const AppSettingsRoutes: RouteObject[] = [
  {
    path: 'search',
    element: <SearchSettings />,
  },
  {
    path: 'envato',
    element: <EnvatoSettings />,
  },
  {
    path: 'hc',
    element: <HcSettings />,
  },
  {
    path: 'incoming-email',
    element: <IncomingEmailSettings />,
  },
];
