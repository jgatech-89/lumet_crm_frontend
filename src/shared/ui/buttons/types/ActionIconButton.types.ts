import { IconButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ActionIconButtonProps
  extends Omit<IconButtonProps, 'children' | 'color'> {
  label: string;
  icon: ReactNode;
  colorHex?: string;
  showTooltip?: boolean;
}