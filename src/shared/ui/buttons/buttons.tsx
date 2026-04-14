import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { forwardRef, type ReactNode } from 'react';
import { transition, PRESS_SCALE } from '@/core/theme/motion';

type ButtonVariant = NonNullable<ButtonProps['variant']>;

export interface CustomButtonProps extends Omit<ButtonProps, 'children' | 'startIcon' | 'variant'> {
  label: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonProps['size'];
  startIcon?: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  colorHex?: string;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'colorHex',
})<{ colorHex?: string }>(({ theme, colorHex, variant }) => ({
  borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 1.5,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 2.5),
  boxShadow: 'none',
  transition: transition(['background-color', 'color', 'border-color', 'box-shadow', 'filter', 'transform']),
  '&:active': {
    transform: PRESS_SCALE,
  },

  ...(colorHex && variant === 'contained' && {
    backgroundColor: colorHex,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: colorHex,
      filter: 'brightness(0.9)',
      boxShadow: `0px 4px 12px ${alpha(colorHex, 0.3)}`,
    },
    '&.Mui-disabled': {
      color: theme.palette.common.white,
      backgroundColor: alpha(colorHex, 0.55),
    },
  }),

  ...(colorHex && variant === 'outlined' && {
    borderColor: colorHex,
    color: colorHex,
    '&:hover': {
      borderColor: colorHex,
      backgroundColor: alpha(colorHex, 0.06),
    },
  }),

  ...(colorHex && variant === 'text' && {
    color: colorHex,
    '&:hover': {
      backgroundColor: alpha(colorHex, 0.08),
    },
  }),
}));

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(({
  label,
  variant = 'contained',
  size = 'medium',
  startIcon,
  icon,
  loading = false,
  loadingIndicator,
  disabled,
  colorHex,
  ...props
}, ref) => {
  const computedStartIcon = loading
    ? (loadingIndicator ?? <CircularProgress size={18} color="inherit" />)
    : (startIcon ?? icon);

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      size={size}
      disabled={loading || disabled}
      startIcon={computedStartIcon}
      colorHex={colorHex}
      {...props}
    >
      {label}
    </StyledButton>
  );
});

CustomButton.displayName = 'CustomButton';