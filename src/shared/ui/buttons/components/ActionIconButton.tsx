import { IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { forwardRef } from 'react';
import { ActionIconButtonProps } from '../types/ActionIconButton.types';

export const ActionIconButton = forwardRef<HTMLButtonElement, ActionIconButtonProps>(
  (
    {
      label,
      icon,
      colorHex = '#546E7A',
      showTooltip = true,
      size = 'small',
      sx,
      ...props
    },
    ref
  ) => {
    const button = (
      <IconButton
        ref={ref}
        size={size}
        aria-label={label}
        sx={{
          color: colorHex,
          '&:hover': {
            backgroundColor: alpha(colorHex, 0.08),
          },
          ...sx,
        }}
        {...props}
      >
        {icon}
      </IconButton>
    );

    if (!showTooltip) return button;

    return (
      <Tooltip title={label} arrow>
        {button}
      </Tooltip>
    );
  }
);

ActionIconButton.displayName = 'ActionIconButton';