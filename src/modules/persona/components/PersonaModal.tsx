import {
  Grid, TextField, MenuItem, Typography, Box, Avatar, FormControl, FormHelperText, InputLabel
} from '@mui/material';
import {
  KeyboardArrowDown,
  SaveOutlined,
  PersonOutline,
  DescriptionOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useEffect, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import { CustomButton } from '@/shared/ui/buttons/components/CustomButton';
import { getButtonPreset } from '@/shared/ui/buttons/buttonPresets';
import { CustomModal } from '@/shared/ui/modal/components/CustomModal';
import type { PersonaFormValues, PersonaPayload, RolPersona } from '@/modules/persona/types/persona.types';

// 2. Títulos de sección azules con punto (ej: • INFORMACIÓN PERSONAL)
const SectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
  <Box display="flex" alignItems="center" mt={{ xs: 0.75, sm: 0.5 }} mb={{ xs: 1, sm: 1 }} sx={{ color: '#1E88E5' /* Azul exacto */ }}>
    <Box sx={{ mr: 1.2, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      {icon ?? <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '50%' }} />}
    </Box>
    <Typography variant="overline" sx={{ fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95 }}>
      {title}
    </Typography>
    <Box sx={{ flex: 1, borderBottom: '1px solid #EEF1F4', ml: 2 }} />
  </Box>
);

// 3. Inputs personalizados (Custom TextField)
const CustomInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FCFCFD', 
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#EFEFEF', 
    },
    '&:hover fieldset': {
      borderColor: '#1E88E5', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1E88E5', 
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px', 
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  '@media (max-width:600px)': {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
    '& .MuiInputBase-input': {
      padding: '12px 14px',
      fontSize: '0.95rem',
    },
    '& .MuiFormHelperText-root': {
      marginTop: '6px',
      fontSize: '0.8rem',
      lineHeight: 1.35,
    },
  },
  '& .MuiSelect-select': {
    fontSize: '0.9rem',
    fontWeight: 400,
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: '#455A64',
    fontSize: '0.82rem',
    transform: 'translate(0px, -20px) scale(1)',
  },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    fontSize: '0.74rem',
    lineHeight: 1.25,
  },
});

const avatarRoleStyles: Record<RolPersona, { bg: string; color: string }> = {
  Administrador: { bg: '#ECEFF1', color: '#455A64' },
  Usuario: { bg: '#F3E5F5', color: '#6A1B9A' },
  Supervisor: { bg: '#E3F2FD', color: '#1E88E5' },
  Comercial: { bg: '#E8F5E9', color: '#2E7D32' },
  Cerrador: { bg: '#FFF3E0', color: '#EF6C00' },
};

const buildAvatarInitials = (values: Pick<PersonaFormValues, 'primerNombre' | 'segundoNombre' | 'primerApellido' | 'segundoApellido'>) => {
  const words = [
    values.primerNombre,
    values.segundoNombre,
    values.primerApellido,
    values.segundoApellido,
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  const first = words[0] ?? '';
  if (first.length >= 2) {
    return first.slice(0, 2).toUpperCase();
  }

  if (first.length === 1) {
    return `${first}${first}`.toUpperCase();
  }

  return 'NN';
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: PersonaPayload) => Promise<void> | void;
  personaData?: PersonaFormValues | null;
}

const DEFAULT_VALUES: PersonaFormValues = {
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  tipoIdentificacion: 'CC',
  numeroIdentificacion: '',
  correo: '',
  telefono: '',
  roles: ['Administrador'],
  estado: 'Activo',
  contrato: null,
};

export const PersonaModal = ({ open, onClose, onSave, personaData }: Props) => {
  const isEdit = Boolean(personaData);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonaFormValues>({
    mode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const primerNombreValue = watch('primerNombre');
  const segundoNombreValue = watch('segundoNombre');
  const primerApellidoValue = watch('primerApellido');
  const segundoApellidoValue = watch('segundoApellido');
  const rolesValue = watch('roles');

  const avatarInitials = buildAvatarInitials({
    primerNombre: primerNombreValue,
    segundoNombre: segundoNombreValue,
    primerApellido: primerApellidoValue,
    segundoApellido: segundoApellidoValue,
  });
  const avatarStyle = avatarRoleStyles[rolesValue?.[0] ?? 'Administrador'] ?? avatarRoleStyles.Administrador;

  useEffect(() => {
    if (!open) return;

    if (personaData) {
      reset({
        ...DEFAULT_VALUES,
        ...personaData,
        telefono: personaData.telefono,
      });
      return;
    }

    reset(DEFAULT_VALUES);
  }, [open, personaData, reset]);

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

  const onSubmit = async (values: PersonaFormValues) => {
    const normalizedPhone = values.telefono.replace(/\s+/g, '');
    const payload: PersonaPayload = {
      id: values.id,
      primerNombre: values.primerNombre.trim(),
      segundoNombre: values.segundoNombre.trim(),
      primerApellido: values.primerApellido.trim(),
      segundoApellido: values.segundoApellido.trim(),
      tipoIdentificacion: values.tipoIdentificacion,
      numeroIdentificacion: values.numeroIdentificacion.trim(),
      correo: values.correo.trim().toLowerCase(),
      telefono: normalizedPhone,
      roles: values.roles,
      estado: values.estado,
      ...(values.contrato ? { contrato: values.contrato } : {}),
    };

    await onSave?.(payload);
    reset(DEFAULT_VALUES);
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      title={(
        <Typography sx={{ fontSize: '1.06rem', fontWeight: 600, color: '#22323D', lineHeight: 1.2 }}>
          {isEdit ? 'Editar Información de Persona' : 'Registrar Nueva Persona'}
        </Typography>
      )}
      subtitle={isEdit
        ? (
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 400, color: '#6B7280', lineHeight: 1.35 }}>
            {`Editando perfil de ${watch('primerNombre')} ${watch('primerApellido')}`}
          </Typography>
        )
        : (
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 400, color: '#6B7280', lineHeight: 1.35 }}>
            Complete la información para dar de alta un nuevo integrante.
          </Typography>
        )}
      headerIcon={isEdit ? (
        <Avatar sx={{ width: 34, height: 34, bgcolor: avatarStyle.bg, color: avatarStyle.color, fontSize: '0.82rem', fontWeight: 600 }}>
          {avatarInitials}
        </Avatar>
      ) : undefined}
      actionLoading={isSubmitting}
      actionLoadingLabel={isEdit ? 'Guardando cambios...' : 'Creando persona...'}
      contentSx={{ border: 'none', pt: 0, px: { xs: 1.75, sm: 2 }, pb: { xs: 1.25, sm: 0.5 } }}
      actionsSx={{ bgcolor: 'transparent', px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
      actions={(
        <>
          <CustomButton
            label="Cancelar"
            type="button"
            onClick={handleClose}
            {...getButtonPreset('cancel')}
          />
          <CustomButton
            label={isEdit ? 'Guardar Cambios' : 'Guardar persona'}
            type="submit"
            form="persona-form"
            loading={isSubmitting}
            startIcon={isEdit ? <SaveOutlined /> : undefined}
            {...getButtonPreset('save')}
          />
        </>
      )}
    >
      <Box id="persona-form" component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Grid container spacing={{ xs: 3, sm: 2 }} sx={{ mt: { xs: 0.5, sm: 0.25 } }}>
          
          {/* --- INFORMACIÓN PERSONAL --- */}
          <Grid size={{ xs: 12 }}><SectionHeader title="INFORMACIÓN PERSONAL" icon={<PersonOutline sx={{ fontSize: '0.82rem' }} />} /></Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="primerNombre"
              control={control}
              rules={{ required: 'El primer nombre es obligatorio' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  label="Primer nombre"
                  placeholder="Ej. Juan"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.primerNombre}
                  helperText={errors.primerNombre?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="segundoNombre"
              control={control}
              rules={{ required: 'El segundo nombre es obligatorio' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  label="Segundo nombre"
                  placeholder="Ej. David"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.segundoNombre}
                  helperText={errors.segundoNombre?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="primerApellido"
              control={control}
              rules={{ required: 'El primer apellido es obligatorio' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  label="Primer apellido"
                  placeholder="Ej. Perez"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.primerApellido}
                  helperText={errors.primerApellido?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="segundoApellido"
              control={control}
              rules={{ required: 'El segundo apellido es obligatorio' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  label="Segundo apellido"
                  placeholder="Ej. Lopez"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.segundoApellido}
                  helperText={errors.segundoApellido?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}><SectionHeader title="DOCUMENTACIÓN Y CONTACTO" icon={<DescriptionOutlined sx={{ fontSize: '0.82rem' }} />} /></Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="tipoIdentificacion"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  select
                  label="Tipo de identificación"
                  slotProps={{ inputLabel: { shrink: true }, select: { IconComponent: KeyboardArrowDown } }}
                >
                  <MenuItem value="CC">CC - Cedula de ciudadania</MenuItem>
                  <MenuItem value="CE">CE - Cedula de extranjeria</MenuItem>
                  <MenuItem value="PA">PA - Pasaporte</MenuItem>
                  <MenuItem value="NIT">NIT</MenuItem>
                </CustomInput>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="numeroIdentificacion"
              control={control}
              rules={{
                required: 'El numero de identificacion es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9]{3,}$/,
                  message: 'La identificación debe tener al menos 3 caracteres y solo contener letras y números',
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  onChange={(event) => {
                    const cleaned = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
                    field.onChange(cleaned);
                  }}
                  fullWidth
                  size="small"
                  label="Numero de identificación"
                  placeholder="Ej. X12345"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.numeroIdentificacion}
                  helperText={errors.numeroIdentificacion?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="correo"
              control={control}
              rules={{
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un correo válido',
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  label="Correo electrónico"
                  placeholder="usuario@lumet.pro"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="telefono"
              control={control}
              rules={{
                required: 'El teléfono es obligatorio',
                validate: (value) => {
                  const normalized = (value ?? '').replace(/\s+/g, '');
                  if (!/^\+[1-9]\d{6,14}$/.test(normalized)) {
                    return 'Debe ingresar un número válido con prefijo internacional (ej: +34...)';
                  }
                  if (!isValidPhoneNumber(normalized)) {
                    return 'Debe ingresar un número válido con prefijo internacional (ej: +34...)';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.telefono} size="small" sx={{ position: 'relative' }}>
                  <InputLabel
                    shrink
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: 'translate(0px, -20px) scale(1)',
                      transformOrigin: 'top left',
                      fontWeight: 500,
                      color: '#455A64',
                      fontSize: '0.82rem',
                      pointerEvents: 'none',
                    }}
                  >
                    Teléfono
                  </InputLabel>
                  <PhoneInput
                    country="co"
                    value={(field.value ?? '').replace(/^\+/, '')}
                    onChange={(value) => field.onChange(value ? `+${value}` : '')}
                    inputStyle={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '8px',
                      border: `1px solid ${errors.telefono ? '#d32f2f' : '#EFEFEF'}`,
                      backgroundColor: '#FCFCFD',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      paddingLeft: '52px',
                    }}
                    buttonStyle={{
                      height: '40px',
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                      border: `1px solid ${errors.telefono ? '#d32f2f' : '#EFEFEF'}`,
                      backgroundColor: '#FCFCFD',
                    }}
                    dropdownStyle={{ zIndex: 1600 }}
                    enableSearch
                    countryCodeEditable={false}
                    placeholder="+34 600123456"
                  />
                  <FormHelperText sx={{ mt: '4px', minHeight: 18, fontSize: '0.74rem', lineHeight: 1.25 }}>
                    {errors.telefono?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}><SectionHeader title="CONFIGURACIÓN DE PERFIL" icon={<SettingsOutlined sx={{ fontSize: '0.82rem' }} />} /></Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="roles"
              control={control}
              rules={{ required: 'Debe seleccionar al menos un rol' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  select
                  label="Roles"
                  slotProps={{ inputLabel: { shrink: true }, select: { IconComponent: KeyboardArrowDown, multiple: true } }}
                  error={!!errors.roles}
                  helperText={errors.roles?.message}
                >
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Usuario">Usuario</MenuItem>
                  <MenuItem value="Supervisor">Supervisor</MenuItem>
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Cerrador">Cerrador</MenuItem>
                </CustomInput>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  fullWidth
                  size="small"
                  select
                  label="Estado"
                  slotProps={{ inputLabel: { shrink: true }, select: { IconComponent: KeyboardArrowDown } }}
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                </CustomInput>
              )}
            />
          </Grid>

        </Grid>

      </Box>

    </CustomModal>
  );
};

