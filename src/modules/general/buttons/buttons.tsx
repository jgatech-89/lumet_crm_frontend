import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { forwardRef, type ReactNode } from 'react';

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
})<{ colorHex?: string }>(({ colorHex, variant }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 20px',
  boxShadow: 'none',
  transition: 'background-color 70ms ease, color 70ms ease, border-color 70ms ease, box-shadow 70ms ease, filter 70ms ease',

  ...(colorHex && variant === 'contained' && {
    backgroundColor: colorHex,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: colorHex,
      filter: 'brightness(0.9)',
      boxShadow: `0px 4px 12px ${alpha(colorHex, 0.3)}`,
    },
    '&.Mui-disabled': {
      color: '#FFFFFF',
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