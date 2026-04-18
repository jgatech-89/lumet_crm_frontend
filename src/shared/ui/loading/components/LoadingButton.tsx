import { Button, CircularProgress } from '@mui/material';
import type { LoadingButtonProps } from '../types/LoadingButton.types';


export function LoadingButton({
  loading = false,
  loadingLabel = 'Enviando...',
  children,
  disabled,
  size = 'medium',
  sx,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button
      {...rest}
      disabled={disabled ?? loading}
      aria-busy={loading}
      aria-label={loading ? loadingLabel : undefined}
      size={size}
      sx={sx}
    >
      {loading ? (
        <>
          <CircularProgress
            size={size === 'small' ? 18 : 22}
            color="inherit"
            sx={{ mr: 1.5 }}
            aria-hidden
          />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}