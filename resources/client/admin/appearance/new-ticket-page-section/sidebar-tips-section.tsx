import {Trans} from '@common/i18n/trans';
import {useFieldArray} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Button} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {Fragment, useState} from 'react';
import {Accordion, AccordionItem} from '@common/ui/accordion/accordion';

export function SidebarTipSection() {
  const {fields, remove, append} = useFieldArray({
    name: 'settings.hc.newTicket.appearance.sidebarTips',
  });
  const [expandedValues, setExpandedValues] = useState([0]);
  return (
    <div>
      <Accordion
        variant="outline"
        expandedValues={expandedValues}
        onExpandedChange={values => {
          setExpandedValues(values as number[]);
        }}
      >
        {fields.map((field, index) => {
          return (
            <AccordionItem
              key={field.id}
              value={index}
              label={<Trans message={`Sidebar tip ${index + 1}`} />}
            >
              <SidebarTip index={index} />
              <div className="text-right">
                <Button
                  size="xs"
                  variant="outline"
                  color="danger"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Trans message="Remove" />
                </Button>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="mt-20 text-right">
        <Button
          size="xs"
          variant="outline"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            append({});
            setExpandedValues([fields.length]);
          }}
        >
          <Trans message="Add another" />
        </Button>
      </div>
    </div>
  );
}

interface SidebarTipProps {
  index: number;
}
function SidebarTip({index}: SidebarTipProps) {
  return (
    <Fragment>
      <FormTextField
        name={`settings.hc.newTicket.appearance.sidebarTips.${index}.title`}
        label={<Trans message="Title" />}
        className="mb-20"
        inputElementType="textarea"
        rows={2}
      />
      <FormTextField
        name={`settings.hc.newTicket.appearance.sidebarTips.${index}.content`}
        label={<Trans message="Content" />}
        className="mb-20"
        inputElementType="textarea"
        rows={4}
      />
    </Fragment>
  );
}
