import type { SxProps, Theme } from '@mui/material/styles';
import type { CustomButtonProps } from './types/CustomButton.types';

type CustomButtonVariant = NonNullable<CustomButtonProps['variant']>;

export type ButtonPresetKey = 'primary' | 'save' | 'edit' | 'cancel' | 'delete' | 'secondary';

export interface ButtonPreset {
  variant: CustomButtonVariant;
  colorHex?: string;
  size?: CustomButtonProps['size'];
  sx?: SxProps<Theme>;
}

export const BUTTON_PRESETS: Record<ButtonPresetKey, ButtonPreset> = {
  primary: {
    variant: 'contained',
    size: 'large',
    sx: (theme) => ({
      borderRadius: theme.shape.borderRadius,
      px: 4,
      py: 1.5,
      fontWeight: 600,
      fontSize: theme.typography.fontSize,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      boxShadow: theme.shadows[2],
      '&:hover': {
        bgcolor: 'primary.dark',
        boxShadow: theme.shadows[4],
      },
    }),
  },
  save: {
    variant: 'contained',
    sx: (theme) => ({
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 3,
      px: 4,
      py: 1.1,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      boxShadow: 'none',
      '&:hover': {
        bgcolor: 'primary.dark',
        boxShadow: theme.shadows[3],
      },
    }),
  },
  edit: {
    variant: 'contained',
    sx: (theme) => ({
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 3,
      px: 3,
      py: 1.1,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      fontWeight: 600,
      boxShadow: 'none',
      '&:hover': {
        bgcolor: 'primary.dark',
        boxShadow: theme.shadows[3],
      },
    }),
  },
  cancel: {
    variant: 'text',
    sx: (theme) => ({
      color: 'text.secondary',
      fontWeight: 500,
      px: 1.5,
      py: 0.75,
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 1.25,
      '&:hover': {
        backgroundColor: 'action.hover',
        color: 'text.primary',
      },
    }),
  },
  delete: {
    variant: 'contained',
    sx: (theme) => ({
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 3,
      px: 3,
      py: 1.1,
      bgcolor: 'error.main',
      color: 'common.white',
      fontWeight: 600,
      boxShadow: 'none',
      '&:hover': {
        bgcolor: 'error.dark',
      },
    }),
  },
  secondary: {
    variant: 'text',
    sx: (theme) => ({
      color: 'text.secondary',
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 1.25,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    }),
  },
};

export const getButtonPreset = (preset: ButtonPresetKey): ButtonPreset => BUTTON_PRESETS[preset];
