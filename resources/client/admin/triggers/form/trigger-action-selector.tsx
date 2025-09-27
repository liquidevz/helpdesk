import {useFieldArray, useFormContext} from 'react-hook-form';
import {CreateTriggerPayload} from '@app/admin/triggers/requests/use-create-trigger';
import {TriggerSectionHeader} from '@app/admin/triggers/form/trigger-section-header';
import {Trans} from '@common/i18n/trans';
import React, {useEffect, useState} from 'react';
import {Button} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {FetchTriggerConfigResponse} from '@app/admin/triggers/requests/use-trigger-config';
import clsx from 'clsx';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {CloseIcon} from '@common/icons/material/Close';
import {TriggerActionInputConfig} from '@app/admin/triggers/trigger';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Avatar} from '@common/ui/images/avatar';
import {message} from '@common/i18n/message';
import {Item} from '@common/ui/forms/listbox/item';
import {useTrans} from '@common/i18n/use-trans';
import {useTags} from '@common/tags/use-tags';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {IconButton} from '@common/ui/buttons/icon-button';
import {usePrevious} from '@common/utils/hooks/use-previous';
import {nanoid} from 'nanoid';

interface Props {
  config: FetchTriggerConfigResponse;
}
export function TriggerActionSelector({config}: Props) {
  const {fields, remove, append} = useFieldArray<
    CreateTriggerPayload,
    'actions',
    'key'
  >({
    name: 'actions',
    keyName: 'key',
  });
  const {getFieldState} = useFormContext<CreateTriggerPayload>();
  const actionError = getFieldState(`actions`).error?.message;

  const addNewAction = () => {
    const actions = config.actions.find(
      c => c.name === 'change_ticket_status',
    )!;
    append({
      id: `temp_${nanoid()}`,
      action_id: actions.id,
      action_value: {
        status_name: 'open',
      },
    });
  };

  return (
    <div>
      <TriggerSectionHeader>
        <Trans message="Perform these actions" />
      </TriggerSectionHeader>
      {fields.map((field, index) => (
        <ActionRow
          key={field.key}
          actionIndex={index}
          config={config}
          onRemove={index => remove(index)}
          className={index === 0 ? 'mt-12' : undefined}
        />
      ))}
      <Button
        variant="outline"
        startIcon={<AddIcon />}
        onClick={() => addNewAction()}
        size="xs"
        className="mt-12"
      >
        <Trans message="Add action" />
      </Button>
      {actionError && (
        <p className="mt-12 text-sm text-danger">{actionError}</p>
      )}
    </div>
  );
}

interface ActionRowProps {
  actionIndex: number;
  onRemove: (index: number) => void;
  config: FetchTriggerConfigResponse;
  className?: string;
}
function ActionRow({actionIndex, onRemove, config, className}: ActionRowProps) {
  const {watch, setValue} = useFormContext<CreateTriggerPayload>();
  const selectedActionId = watch(`actions.${actionIndex}.action_id`);
  const selectedAction = config.actions.find(c => c.id === selectedActionId);
  const previousSelectedAction = usePrevious(selectedAction);

  useEffect(() => {
    if (
      selectedAction &&
      previousSelectedAction &&
      selectedAction.name !== previousSelectedAction.name
    ) {
      // clear values from previously selected actions
      setValue(`actions.${actionIndex}.action_value`, {});

      // set default value for all inputs for this action
      selectedAction.input_config?.inputs.map(input => {
        if (input.select_options) {
          setValue(
            `actions.${actionIndex}.action_value.${input.name}`,
            config.actionOptions[input.select_options][0].value,
          );
        }
      });
    }
  }, [previousSelectedAction, selectedAction, actionIndex, setValue, config]);

  return (
    <div className={clsx('mb-12 flex gap-12 border-b pb-12', className)}>
      <div className="flex-auto space-y-12 md:max-w-400">
        <FormSelect
          name={`actions.${actionIndex}.action_id`}
          selectionMode="single"
        >
          {config.actions.map(action => (
            <Option key={action.id} value={action.id}>
              {action.display_name}
            </Option>
          ))}
        </FormSelect>
        {selectedAction?.input_config?.inputs.map((input, inputIndex) => (
          <ActionValueInput
            actionIndex={actionIndex}
            key={inputIndex}
            input={input}
            config={config}
          />
        ))}
      </div>
      <IconButton color="danger" onClick={() => onRemove(actionIndex)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

interface ActionValueProps {
  actionIndex: number;
  input: TriggerActionInputConfig;
  config: FetchTriggerConfigResponse;
}
function ActionValueInput({input, actionIndex, config}: ActionValueProps) {
  const name = `actions.${actionIndex}.action_value.${input.name}`;

  if (input.name === 'tags_to_add' || input.name === 'tags_to_remove') {
    return <TagComboBox name={name} />;
  }

  switch (input.type) {
    case 'text':
    case 'textarea':
      return (
        <FormTextField
          name={name}
          label={input.display_name}
          placeholder={input.placeholder}
          inputElementType={input.type === 'textarea' ? 'textarea' : undefined}
          rows={input.type === 'textarea' ? 3 : undefined}
        />
      );
    case 'select':
      return (
        <FormSelect name={name} selectionMode="single">
          {config.actionOptions[input.select_options!].map(option => (
            <Option
              description={option.description}
              key={option.value}
              value={option.value}
              capitalizeFirst
              startIcon={option.image ? <Avatar src={option.image} /> : null}
            >
              {option.name}
            </Option>
          ))}
        </FormSelect>
      );
  }
}

interface TagComboBoxProps {
  name: string;
}
function TagComboBox({name}: TagComboBoxProps) {
  const {trans} = useTrans();
  const [query, setQuery] = useState('');
  const {data, isFetching} = useTags({query, perPage: 8, notType: 'status'});
  return (
    <FormChipField
      name={name}
      isAsync
      isLoading={isFetching}
      inputValue={query}
      onInputValueChange={setQuery}
      valueKey="id"
      placeholder={trans(message('Enter tag name...'))}
      allowCustomValue
    >
      {data?.pagination.data.map(result => (
        <Item
          key={result.id}
          value={result.name}
          textLabel={result.name}
          capitalizeFirst
        >
          {result.display_name}
        </Item>
      ))}
    </FormChipField>
  );
}
