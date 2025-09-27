import {FetchTriggerConfigResponse} from '@app/admin/triggers/requests/use-trigger-config';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {CreateTriggerPayload} from '@app/admin/triggers/requests/use-create-trigger';
import {usePrevious} from '@common/utils/hooks/use-previous';
import React, {useEffect} from 'react';
import {FormSelect, Option} from '@common/ui/forms/select/select';
import {Section} from '@common/ui/forms/listbox/section';
import {prettyName} from '@common/auth/ui/permission-selector';
import {Item} from '@common/ui/forms/listbox/item';
import {Trans} from '@common/i18n/trans';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {message} from '@common/i18n/message';
import {AddIcon} from '@common/icons/material/Add';
import {nanoid} from 'nanoid';
import {Button} from '@common/ui/buttons/button';
import clsx from 'clsx';
import {TriggerSectionHeader} from '@app/admin/triggers/form/trigger-section-header';

interface Props {
  matchType: 'all_conditions' | 'any_conditions';
  className?: string;
  config: FetchTriggerConfigResponse;
}
export function TriggerConditionSelector({
  matchType,
  className,
  config,
}: Props) {
  const {fields, remove, append} = useFieldArray<
    CreateTriggerPayload,
    'all_conditions' | 'any_conditions',
    'key'
  >({
    name: matchType,
    keyName: 'key',
  });
  const {getFieldState} = useFormContext<CreateTriggerPayload>();
  const conditionError = getFieldState(`conditions`).error?.message;

  const headerMessage =
    matchType === 'all_conditions'
      ? message('Meet <b>all</b> the following conditions')
      : message('Meet <b>any</b> of the following conditions');

  const addNewCondition = () => {
    const condition = config.conditions.find(c => c.type === 'event:type')!;
    append({
      id: `temp_${nanoid()}`,
      condition_id: condition.id,
      operator_id: condition.operators[0].id,
      value: 'ticket_created',
      match_type: matchType === 'all_conditions' ? 'all' : 'any',
    });
  };

  return (
    <div className={className}>
      <TriggerSectionHeader>
        <Trans
          message={headerMessage.message}
          values={{
            b: text => (
              <span className="mx-4 rounded border bg-alt px-6 py-2 font-bold">
                {text}
              </span>
            ),
          }}
        />
      </TriggerSectionHeader>
      {fields.map((field, index) => (
        <ConditionRow
          key={field.key}
          index={index}
          matchType={matchType}
          config={config}
          onRemove={index => remove(index)}
          className="mt-12"
        />
      ))}
      <Button
        variant="outline"
        startIcon={<AddIcon />}
        onClick={addNewCondition}
        size="xs"
        className="mt-12"
      >
        <Trans message="Add condition" />
      </Button>
      {conditionError && matchType === 'all_conditions' && (
        <p className="mt-12 text-sm text-danger">{conditionError}</p>
      )}
    </div>
  );
}

interface ConditionRowProps {
  index: number;
  onRemove: (index: number) => void;
  matchType: Props['matchType'];
  config: FetchTriggerConfigResponse;
  className?: string;
}
function ConditionRow({
  index,
  onRemove,
  matchType,
  config,
  className,
}: ConditionRowProps) {
  const groupedConditions = config.groupedConditions;
  const {setValue, watch} = useFormContext<CreateTriggerPayload>();
  const selectedConditionId = watch(`${matchType}.${index}.condition_id`);
  const selectedCondition = config.conditions.find(
    c => c.id === selectedConditionId,
  );
  const previousSelectedCondition = usePrevious(selectedCondition);

  useEffect(() => {
    if (
      selectedCondition &&
      previousSelectedCondition &&
      previousSelectedCondition.type !== selectedCondition.type
    ) {
      setValue(
        `${matchType}.${index}.operator_id`,
        selectedCondition!.operators[0]?.id,
      );
      if (selectedCondition.type === 'event:type') {
        setValue(`${matchType}.${index}.value`, 'ticket_created');
      } else {
        setValue(`${matchType}.${index}.value`, '');
      }
    }
  }, [
    previousSelectedCondition,
    selectedCondition,
    index,
    setValue,
    matchType,
  ]);

  return (
    <div className={clsx('flex flex-col gap-12 md:flex-row', className)}>
      <FormSelect
        name={`${matchType}.${index}.condition_id`}
        selectionMode="single"
        minWidth="min-w-224"
      >
        {Object.entries(groupedConditions).map(([groupName, conditions]) => (
          <Section label={prettyName(groupName)} key={groupName}>
            {conditions.map(condition => (
              <Option key={condition.id} value={condition.id}>
                {condition.name}
              </Option>
            ))}
          </Section>
        ))}
      </FormSelect>
      <FormSelect
        name={`${matchType}.${index}.operator_id`}
        selectionMode="single"
        minWidth="min-w-200"
      >
        {selectedCondition?.operators.map(operator => (
          <Option key={operator.id} value={operator.id}>
            {operator.display_name}
          </Option>
        ))}
      </FormSelect>
      {selectedCondition?.type === 'event:type' && (
        <FormSelect name={`${matchType}.${index}.value`} selectionMode="single">
          <Item value="ticket_created">
            <Trans message="Ticket created" />
          </Item>
          <Item value="ticket_updated">
            <Trans message="Ticket updated" />
          </Item>
        </FormSelect>
      )}
      {selectedCondition?.type !== 'event:type' && (
        <FormTextField name={`${matchType}.${index}.value`} />
      )}
      <IconButton color="danger" onClick={() => onRemove(index)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
