import { Button, Typography, Stack, Box } from '@mui/material';
import { WarningAmber as WarningIcon, Info as InfoIcon } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import { CustomModal } from './CustomModal';
import { ConfirmModalProps } from '../types/ConfirmModal.types';

const getIconByVariant = (variant: 'default' | 'danger') => {
  const styles = { fontSize: '1.8rem' };

  switch (variant) {
    case 'danger':
      return <WarningIcon sx={{ ...styles, color: 'error.main' }} />;
    default:
      return <InfoIcon sx={{ ...styles, color: 'primary.main' }} />;
  }
};

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  description = '¿Estás seguro de continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
  loadingText = 'Procesando...',
  variant = 'default',
  disableBackdropClose = true,
}: ConfirmModalProps) => {
  const theme = useTheme();

  const handleConfirm = async () => {
    if (loading) return;
    await onConfirm();
  };

  const buttonColor = variant === 'danger' ? theme.palette.error.main : theme.palette.primary.main;
  const titleColor = variant === 'danger' ? "error.main" : "text.primary";

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      useMobileSheet={false}
      actionLoading={loading}
      actionLoadingLabel={loadingText}
      showCloseButton={false}
      disableBackdropClose={disableBackdropClose}
      maxWidth="xs"
      bottomBorderColor={buttonColor}
      contentSx={{ textAlign: 'center', pb: 0.25, px: { xs: 2, sm: 2.5 } }}
      actionsSx={{
        flexDirection: 'column',
        gap: 1,
        bgcolor: 'transparent',
        borderTop: 'none',
        mx: 0,
        mb: 0,
        px: 2,
        pb: 2,
      }}
      actions={
        <Stack spacing={1.25} width="100%" sx={{ mt: 0.5, px: 0.5 }}>
          <Button
            fullWidth
            onClick={handleConfirm}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: buttonColor,
              color: 'common.white',
              fontWeight: 600,
              fontSize: '0.94rem',
              py: 1.3,
              borderRadius: '9px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: variant === 'danger' ? 'error.dark' : 'primary.dark',
              },
              '&:disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'text.disabled',
              },
            }}
          >
            {loading ? loadingText : confirmText}
          </Button>

          <Button
            fullWidth
            onClick={onClose}
            disabled={loading}
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
              py: 0.9,
              borderRadius: '9px',
              textTransform: 'none',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&:disabled': {
                color: 'text.disabled',
              },
            }}
          >
            {cancelText}
          </Button>
        </Stack>
      }
    >
      <Stack spacing={1.75} alignItems="center" sx={{ py: 1.25 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor:
              variant === 'danger'
                ? alpha(theme.palette.error.main, theme.palette.mode === "dark" ? 0.2 : 0.12)
                : alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.12),
          }}
        >
          {getIconByVariant(variant)}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.16rem',
            color: titleColor,
            textAlign: 'center',
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            textAlign: 'center',
            maxWidth: '94%',
          }}
        >
          {description}
        </Typography>
      </Stack>
    </CustomModal>
  );
};