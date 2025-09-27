import {Form} from '@common/ui/forms/form';
import {UseFormReturn} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {useCategories} from '@app/admin/help-center/requests/use-categories';
import React, {useState} from 'react';
import {Item} from '@common/ui/forms/listbox/item';
import {message} from '@common/i18n/message';
import {useTrans} from '@common/i18n/use-trans';
import {CreateTicketCategoryPayload} from '@app/admin/ticket-categories/requests/use-create-ticket-category';

interface Props {
  onSubmit: (values: CreateTicketCategoryPayload) => void;
  formId: string;
  form: UseFormReturn<CreateTicketCategoryPayload>;
}
export function CrupdateTicketCategoryForm({form, onSubmit, formId}: Props) {
  return (
    <Form id={formId} form={form} onSubmit={onSubmit}>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        description={<Trans message="Unique category identifier." />}
        className="mb-20"
        required
        autoFocus
      />
      <FormTextField
        name="display_name"
        label={<Trans message="Display name" />}
        description={<Trans message="User friendly category name." />}
        className="mb-20"
      />
      <CategoriesField />
    </Form>
  );
}

function CategoriesField() {
  const {trans} = useTrans();
  const {data, isFetching} = useCategories({type: 'category', compact: true});
  const [query, setQuery] = useState('');
  const suggestions = data?.pagination.data;
  return (
    <FormChipField
      name="categories"
      label={<Trans message="Help center categories" />}
      isAsync
      isLoading={isFetching}
      inputValue={query}
      onInputValueChange={setQuery}
      placeholder={trans(message('Select help center categories'))}
      allowCustomValue={false}
      suggestions={suggestions}
    >
      {data?.pagination.data.map(category => (
        <Item key={category.id} value={category.name} textLabel={category.name}>
          {category.name}
        </Item>
      ))}
    </FormChipField>
  );
}
