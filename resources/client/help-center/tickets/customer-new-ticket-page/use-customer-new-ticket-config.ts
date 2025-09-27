import {useSettings} from '@common/core/settings/use-settings';
import {CustomerNewTicketPageConfig} from '@app/help-center/tickets/customer-new-ticket-page/customer-new-ticket-page-config';

export function useCustomerNewTicketConfig() {
  const settings = useSettings();
  return (settings.hc?.newTicket?.appearance ||
    {}) as CustomerNewTicketPageConfig;
}
