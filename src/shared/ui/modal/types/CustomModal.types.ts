import type { ReactNode } from 'react';
import type { DialogProps, SxProps, Theme } from '@mui/material';

export interface CustomModalProps
  extends Omit<DialogProps, 'children' | 'onClose' | 'open' | 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  headerIcon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  showCloseButton?: boolean;
  disableBackdropClose?: boolean;
  contentSx?: SxProps<Theme>;
  actionsSx?: SxProps<Theme>;
  bottomBorderColor?: string;
  useMobileSheet?: boolean;
  actionLoading?: boolean;
  actionLoadingLabel?: string;
  actionLoadingMode?: 'top' | 'overlay';
  contentLoading?: boolean;
  contentLoadingVariant?: 'skeleton' | 'linear';
  contentLoadingLabel?: string;
  contentSkeletonRows?: number;
  visualVariant?: 'default' | 'modern';
}