import {
  appearanceState,
  AppearanceValues,
} from '@common/admin/appearance/appearance-store';
import {Fragment} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {BackgroundPositionSelector} from '@app/admin/appearance/background-position-selector';
import {useFormContext} from 'react-hook-form';
import {InfoDialogTrigger} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger';

export function LandingPageSection() {
  const {watch, setValue, getValues} = useFormContext<AppearanceValues>();
  return (
    <Fragment>
      <FormSelect
        selectionMode="single"
        label={<Trans message="Header style" />}
        className="mb-24"
        name="settings.landing.header.variant"
      >
        <Item value="simple">
          <Trans message="Simple" />
        </Item>
        <Item value="colorful">
          <Trans message="Colorful" />
        </Item>
      </FormSelect>
      <FormImageSelector
        name="settings.landing.header.background"
        className="mb-12"
        label={<Trans message="Header image" />}
        defaultValue={''}
        diskPrefix="homepage"
      />
      <BackgroundPositionSelector
        value={watch('settings.landing.header')}
        disabled={!watch('settings.landing.header.background')}
        onChange={value => {
          setValue('settings.landing.header', {
            ...getValues('settings.landing.header'),
            ...value,
          });
        }}
        className="mb-20 border-b pb-12"
      />
      <FormSelect
        selectionMode="single"
        label={<Trans message="Content style" />}
        className="mb-12"
        name="settings.landing.content.variant"
      >
        <Item value="articleGrid">
          <Trans message="Article grid" />
        </Item>
        <Item value="multiProduct">
          <Trans message="Multiproduct" />
        </Item>
      </FormSelect>
      {watch('settings.landing.content.variant') === 'articleGrid' && (
        <ArticleGridLayoutFields />
      )}
      <FormTextField
        label={<Trans message="Header title" />}
        className="mb-24"
        name="settings.landing.header.title"
        inputElementType="textarea"
        rows={2}
        onFocus={() => {
          appearanceState().preview.setHighlight('[data-testid="headerTitle"]');
        }}
      />
      <FormTextField
        label={<Trans message="Header subtitle" />}
        className="mb-24"
        inputElementType="textarea"
        rows={2}
        name="settings.landing.header.subtitle"
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]',
          );
        }}
      />
      <FormTextField
        label={<Trans message="Search field placeholder" />}
        className="mb-24"
        name="settings.landing.header.placeholder"
        inputElementType="textarea"
        rows={2}
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]',
          );
        }}
      />
      <FormSwitch className="mb-24" name="settings.landing.show_footer">
        <Trans message="Show footer" />
      </FormSwitch>
    </Fragment>
  );
}

function ArticleGridLayoutFields() {
  return (
    <div className="mb-18 border-b pb-18">
      <FormTextField
        name="settings.landing.articles_per_category"
        label={<Trans message="Articles per category" />}
        labelSuffixPosition="inline"
        labelSuffix={
          <InfoDialogTrigger
            body={
              <Trans message="How many articles should each category display in help center homepage." />
            }
          />
        }
        type="number"
        className="mb-12"
        min="1"
        max="50"
      />
      <FormTextField
        name="settings.landing.children_per_category"
        label={<Trans message="Child categories" />}
        labelSuffix={
          <InfoDialogTrigger
            body={
              <Trans message="How many child categories should each parent category display in help center homepage." />
            }
          />
        }
        labelSuffixPosition="inline"
        className="mb-18"
        type="number"
        min="1"
        max="50"
      />
      <FormSwitch name="settings.landing.hide_small_categories">
        <Trans message="Hide empty categories" />
      </FormSwitch>
    </div>
  );
}
