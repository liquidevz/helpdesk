import {SettingsNavItem} from '@common/admin/settings/settings-nav-config';
import {message} from '@common/i18n/message';

export const AppSettingsNavConfig: SettingsNavItem[] = [
  {label: message('Search'), to: 'search'},
  {label: message('Incoming email'), to: 'incoming-email'},
  {label: message('Help center'), to: 'hc'},
  {label: message('Envato'), to: 'envato'},
];
