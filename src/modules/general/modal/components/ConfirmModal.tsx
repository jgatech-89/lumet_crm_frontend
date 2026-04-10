import { Button, Typography, Stack, Box, CircularProgress } from '@mui/material';
import { WarningAmber as WarningIcon, Info as InfoIcon } from '@mui/icons-material';
import { CustomModal } from './CustomModal';
import { ConfirmModalProps } from '../types/ConfirmModal.types';

const getIconByVariant = (variant: 'default' | 'danger') => {
  const styles = { fontSize: '1.8rem' };

  switch (variant) {
    case 'danger':
      return <WarningIcon sx={{ ...styles, color: '#D32F2F' }} />;
    default:
      return <InfoIcon sx={{ ...styles, color: '#1E88E5' }} />;
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
  variant = 'default',
  disableBackdropClose = true,
}: ConfirmModalProps) => {
  const handleConfirm = async () => {
    if (loading) return;
    await onConfirm();
  };

  const buttonColor = variant === 'danger' ? '#D32F2F' : '#1E88E5';

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      useMobileSheet={false}
      showCloseButton={false}
      disableBackdropClose={disableBackdropClose}
      maxWidth="xs"
      bottomBorderColor={variant === 'danger' ? '#D32F2F' : '#1E88E5'}
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
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.94rem',
              py: 1.3,
              borderRadius: '9px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: variant === 'danger' ? '#B71C1C' : '#1565C0',
              },
              '&:disabled': {
                bgcolor: '#BDBDBD',
                color: '#FFFFFF',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'inherit', mr: 1 }} />
            ) : null}
            {loading ? 'Procesando...' : confirmText}
          </Button>

          <Button
            fullWidth
            onClick={onClose}
            disabled={loading}
            sx={{
              color: '#555',
              fontWeight: 500,
              fontSize: '0.9rem',
              py: 0.9,
              borderRadius: '9px',
              textTransform: 'none',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: '#F5F5F5',
              },
              '&:disabled': {
                color: '#BDBDBD',
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
            bgcolor: variant === 'danger' ? '#FDECEA' : '#E3F2FD',
          }}
        >
          {getIconByVariant(variant)}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.16rem',
            color: '#1C1C1C',
            textAlign: 'center',
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
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