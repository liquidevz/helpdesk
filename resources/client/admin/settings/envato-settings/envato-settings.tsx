import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {Trans} from '@common/i18n/trans';
import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {SectionHelper} from '@common/ui/section-helper';
import {Button} from '@common/ui/buttons/button';
import {useImportEnvatoItems} from '@app/admin/settings/envato-settings/use-import-envato-items';

export function EnvatoSettings() {
  return (
    <SettingsPanel
      title={<Trans message="Envato" />}
      description={
        <Trans message="Manage envato integration related configuration or disable it completely." />
      }
    >
      <FormSwitch
        name="client.envato.enable"
        className="mb-24"
        description={
          <Trans message="Enable envato integration (social login, purchase code validation, sales reports and more)." />
        }
      >
        <Trans message="Envato integration" />
      </FormSwitch>
      <FormSwitch
        name="client.envato.require_purchase_code"
        className="mb-24"
        description={
          <Trans
            message="Require users to enter a valid purchase code in order to register and submit support requests.
      Envato social login will also check for purchase code automatically when this is enabled."
          />
        }
      >
        <Trans message="Envato purchase code" />
      </FormSwitch>
      <FormSwitch
        name="client.envato.active_support"
        className="mb-24"
        description={
          <Trans message="Require users to have active support for item on envato in order to be able to create tickets." />
        }
      >
        <Trans message="Envato active support" />
      </FormSwitch>
      <FormSwitch
        name="client.envato.filter_search"
        className="mb-24"
        description={
          <Trans message="Users will only be able to find articles for items that they have purchased." />
        }
      >
        <Trans message="Filter help center search" />
      </FormSwitch>
      <ImportItemsPanel />
    </SettingsPanel>
  );
}

function ImportItemsPanel() {
  const importItems = useImportEnvatoItems();
  return (
    <SectionHelper
      className="mt-34"
      color="neutral"
      title={<Trans message="Import envato items" />}
      description={
        <Trans
          message="This will automatically import all your envato items for use as categories in new ticket and
      ticket list pages."
        />
      }
      actions={
        <div className="mt-10 border-t pt-14">
          <Button
            variant="flat"
            color="primary"
            disabled={importItems.isPending}
            size="xs"
            onClick={() => {
              importItems.mutate();
            }}
          >
            <Trans message="Import now" />
          </Button>
        </div>
      }
    />
  );
}
