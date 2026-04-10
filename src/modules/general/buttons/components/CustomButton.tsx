import { CircularProgress } from '@mui/material';
import { forwardRef } from 'react';
import { StyledButton } from '../styles/CustomButton.styles';
import { CustomButtonProps } from '../types/CustomButton.types';

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const computedStartIcon = loading
      ? loadingIndicator ?? <CircularProgress size={18} color="inherit" />
      : startIcon ?? icon;

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
  }
);

CustomButton.displayName = 'CustomButton';