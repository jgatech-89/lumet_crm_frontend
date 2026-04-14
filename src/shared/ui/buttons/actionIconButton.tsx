import { IconButton, Tooltip, type IconButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { forwardRef, type ReactNode } from 'react';

export interface ActionIconButtonProps extends Omit<IconButtonProps, 'children' | 'color'> {
  label: string;
  icon: ReactNode;
  colorHex?: string;
  showTooltip?: boolean;
}

export const ActionIconButton = forwardRef<HTMLButtonElement, ActionIconButtonProps>(({
  label,
  icon,
  colorHex,
  showTooltip = true,
  size = 'small',
  sx,
  ...props
}, ref) => {
  const hoverBackground = colorHex ? alpha(colorHex, 0.08) : undefined;

  const button = (
    <IconButton
      ref={ref}
      size={size}
      aria-label={label}
      sx={{
        color: colorHex ?? 'text.secondary',
        '&:hover': {
          backgroundColor: hoverBackground ?? 'action.hover',
        },
        ...sx,
      }}
      {...props}
    >
      {icon}
    </IconButton>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip title={label} arrow>
      {button}
    </Tooltip>
  );
});

ActionIconButton.displayName = 'ActionIconButton';
