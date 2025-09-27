import {SiteConfigContextValue} from '@common/core/settings/site-config-context';
import {RegisterPageFields} from '@app/register-page-fields';
import {message} from '@common/i18n/message';
import {EnvatoIcon} from '@common/icons/social/envato';
import {AccountSettingsPurchasesPanel} from '@app/account-settings-purchases-panel/account-settings-purchases-panel';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

const accountSettingsPanels = [];
if (getBootstrapData().settings.envato?.enable) {
  accountSettingsPanels.push({
    icon: EnvatoIcon,
    label: message('Your purchases'),
    component: AccountSettingsPurchasesPanel,
    id: 'purchases',
  });
}

export const SiteConfig: Partial<SiteConfigContextValue> = {
  auth: {
    redirectUri: '/',
    secondaryRedirectUri: '/hc',
    adminRedirectUri: '/admin',
    registerFields: RegisterPageFields,
    accountSettingsPanels,
  },
  homepage: {
    options: [
      {
        label: message('Landing page'),
        value: 'landingPage',
      },
    ],
  },
  admin: {
    ads: [],
  },
  tags: {
    types: [{name: 'category'}, {name: 'status'}],
  },
  demo: {
    loginPageDefaults: 'singleAccount',
    email: 'admin@demo.com',
    password: 'demo',
  },
  settings: {
    showIncomingMailMethod: true,
  },
};
