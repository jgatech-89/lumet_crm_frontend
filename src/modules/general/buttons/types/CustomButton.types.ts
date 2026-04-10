import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type ButtonVariant = NonNullable<ButtonProps['variant']>;

export interface CustomButtonProps
  extends Omit<ButtonProps, 'children' | 'startIcon' | 'variant'> {
  label: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonProps['size'];
  startIcon?: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  colorHex?: string;
}