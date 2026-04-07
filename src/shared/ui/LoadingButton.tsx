import { Button, CircularProgress, type ButtonProps } from "@mui/material";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingLabel?: string;
}

export function LoadingButton({
  loading = false,
  loadingLabel = "Enviando...",
  children,
  disabled,
  size = "medium",
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
            size={size === "small" ? 18 : 22}
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
