import { Box, TextField, Typography, Stack, FormHelperText } from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CancelarBoton, GuardarBoton } from '@/shared/ui/buttons/components/BotonesAccionCrud';
import { CustomModal } from '@/shared/ui/modal/components/CustomModal';
import type { PersonaSummary } from '@/modules/persona/types/persona.types';

const CustomInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px',
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: '0.82rem',
  },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    fontSize: '0.74rem',
    lineHeight: 1.25,
  },
}));

const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <Box display="flex" alignItems="center" mt={1} mb={1.5} sx={{ color: 'primary.main' }}>
    <Box sx={{ mr: 1.2, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      {icon ?? <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '50%' }} />}
    </Box>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 600,
        fontSize: '0.72rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        opacity: 0.95,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ flex: 1, borderBottom: '1px solid', borderColor: 'divider', ml: 2 }} />
  </Box>
);

interface SetPasswordFormValues {
  password: string;
  passwordConfirm: string;
}

interface SetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  persona: PersonaSummary | null;
  onSave: (password: string, personaId: string) => Promise<void>;
  isLoading?: boolean;
}

export const SetPasswordModal = ({
  open,
  onClose,
  persona,
  onSave,
  isLoading = false,
}: SetPasswordModalProps) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });

  const password = watch('password');

  useEffect(() => {
    if (!open) {
      setShowPasswords(false);
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: SetPasswordFormValues) => {
    if (!persona) return;
    try {
      await onSave(data.password, persona.id);
      reset();
      onClose();
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      reset();
      setShowPasswords(false);
      onClose();
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={`Cambiar Contraseña - ${persona?.nombre || ''}`}
      maxWidth="sm"
      fullWidth
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <SectionHeader title="Nueva Contraseña" icon={<LockIcon fontSize="small" />} />

        <Stack spacing={2}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Contraseña"
                type={showPasswords ? 'text' : 'password'}
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: 'Debe confirmar la contraseña',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Confirmar Contraseña"
                type={showPasswords ? 'text' : 'password'}
                fullWidth
                size="small"
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
                disabled={isLoading}
              />
            )}
          />

          <Box>
            <Typography
              component="label"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.85rem',
                cursor: 'pointer',
                userSelect: 'none',
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                disabled={isLoading}
                style={{ cursor: 'pointer' }}
              />
              Mostrar contraseñas
            </Typography>
          </Box>

          <FormHelperText sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            ✓ Mínimo 8 caracteres
            <br />✓ Las contraseñas deben coincidir
          </FormHelperText>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <CancelarBoton
            onClick={handleClose}
            disabled={isLoading}
          />
          <GuardarBoton
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          />
        </Stack>
      </Box>
    </CustomModal>
  );
};
