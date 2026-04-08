import type { SxProps, Theme } from '@mui/material/styles';
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
    colorHex: '#1E88E5',
    size: 'large',
    sx: {
      borderRadius: 8,
      px: 4,
      py: 1.5,
      fontWeight: 600,
      fontSize: '1rem',
      boxShadow: '0px 4px 12px rgba(30, 136, 229, 0.3)',
      '&:hover': { bgcolor: '#1976D2' },
    },
  },
  save: {
    variant: 'contained',
    colorHex: '#1E88E5',
    sx: {
      borderRadius: '24px',
      px: 4,
      py: 1.1,
      boxShadow: 'none',
      '&:hover': {
        bgcolor: '#1976D2',
        boxShadow: '0px 4px 12px rgba(30, 136, 229, 0.3)',
      },
    },
  },
  cancel: {
    variant: 'outlined',
    sx: {
      color: '#374151',
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB',
      borderRadius: '12px',
      px: 3,
      py: 1.1,
      '&:hover': {
        backgroundColor: '#F9FAFB',
        borderColor: '#D1D5DB',
      },
    },
  },
  delete: {
    variant: 'outlined',
    colorHex: '#D32F2F',
    sx: {
      borderRadius: '12px',
      fontWeight: 600,
    },
  },
  secondary: {
    variant: 'text',
    colorHex: '#546E7A',
    sx: {
      borderRadius: '10px',
      fontWeight: 600,
    },
  },
};

export const getButtonPreset = (preset: ButtonPresetKey): ButtonPreset => BUTTON_PRESETS[preset];
