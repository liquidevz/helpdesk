import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useSettings} from '@common/core/settings/use-settings';

export function RegisterPageFields() {
  const {envato} = useSettings();
  if (!envato?.enable || !envato?.require_purchase_code) {
    return null;
  }
  return (
    <FormTextField
      className="mb-32"
      name="envato_purchase_code"
      label={<Trans message="Envato purchase code" />}
      required
    />
  );
}
