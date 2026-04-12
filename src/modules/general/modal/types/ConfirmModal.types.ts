import type { ReactNode } from 'react';

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  loadingText?: string;
  variant?: 'default' | 'danger';
  disableBackdropClose?: boolean;
}