import React, {forwardRef, ReactElement} from 'react';
import {ButtonColor} from '@common/ui/buttons/get-shared-button-style';
import {Button, ButtonProps} from '@common/ui/buttons/button';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {MessageDescriptor} from '@common/i18n/message-descriptor';

interface Props {
  startIcon: ReactElement;
  endIcon?: ReactElement;
  children: ReactElement<MessageDescriptor>;
  color?: ButtonColor;
  isCompact?: boolean;
  disabled?: boolean;
  elementType?: ButtonProps['elementType'];
  to?: ButtonProps['to'];
}
export const TicketActionButton = forwardRef<HTMLButtonElement, Props>(
  (
    {startIcon, endIcon, children, color, isCompact = false, ...buttonProps},
    ref
  ) => {
    if (isCompact) {
      return (
        <Tooltip label={children} ref={ref}>
          <IconButton color={color} iconSize="md" size="sm" {...buttonProps}>
            {startIcon}
          </IconButton>
        </Tooltip>
      );
    }
    return (
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        variant="outline"
        color={color}
        size="xs"
        ref={ref}
        {...buttonProps}
      >
        {children}
      </Button>
    );
  }
);
