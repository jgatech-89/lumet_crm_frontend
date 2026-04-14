import { alpha, type SxProps, type Theme } from '@mui/material/styles';
import type { CustomButtonProps } from './buttons';

type CustomButtonVariant = NonNullable<CustomButtonProps['variant']>;

export type ButtonPresetKey = 'primary' | 'save' | 'cancel' | 'delete' | 'secondary';

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
  cancel: {
    variant: 'outlined',
    sx: (theme) => ({
      color: 'text.primary',
      backgroundColor: 'background.paper',
      borderColor: 'divider',
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 1.5,
      px: 3,
      py: 1.1,
      '&:hover': {
        backgroundColor: 'action.hover',
        borderColor: theme.palette.text.disabled,
      },
    }),
  },
  delete: {
    variant: 'outlined',
    sx: (theme) => ({
      color: 'error.main',
      borderColor: 'error.main',
      borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 1.5,
      fontWeight: 600,
      '&:hover': {
        borderColor: 'error.dark',
        backgroundColor: alpha(theme.palette.error.main, 0.08),
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
