import type { SxProps, Theme } from '@mui/material/styles';

export interface LinearLoaderProps {
  label?: string;
  showLabel?: boolean;
  fullPage?: boolean;
  /** Logo CRM centrado con anillo animado (pulso + giro). Por defecto activo. */
  showBranding?: boolean;
  sx?: SxProps<Theme>;
}