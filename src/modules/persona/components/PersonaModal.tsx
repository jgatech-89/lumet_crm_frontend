import {
  Grid, TextField, MenuItem, Typography, Box, Avatar, FormControl, FormHelperText, InputLabel, FormControlLabel, Checkbox
} from '@mui/material';
import {
  KeyboardArrowDown,
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
import { CancelarBoton, GuardarBoton } from '@/shared/ui/buttons/components/BotonesAccionCrud';
import { CustomModal } from '@/shared/ui/modal/components/CustomModal';
import { getPersonaAvatarHeaderSxFromValora } from '@/modules/persona/styles/personaPageStyles';
import type { PersonaFormValues, PersonaPayload, PersonaRolOption, PersonaTipoIdentificacionOption } from '@/modules/persona/types/persona.types';
import { getPersonaDisplayInitials } from '@/modules/persona/utils/personaMappers';

const SectionHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => (
  <Box display="flex" alignItems="center" mt={{ xs: 0.75, sm: 0.5 }} mb={{ xs: 1, sm: 1 }} sx={{ color: 'primary.main' }}>
    <Box sx={{ mr: 1.2, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      {icon ?? <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '50%' }} />}
    </Box>
    <Typography variant="overline" sx={{ fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95 }}>
      {title}
    </Typography>
    <Box sx={{ flex: 1, borderBottom: '1px solid', borderColor: 'divider', ml: 2 }} />
  </Box>
);

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
    color: theme.palette.text.secondary,
    fontSize: '0.82rem',
    transform: 'translate(0px, -20px) scale(1)',
  },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    fontSize: '0.74rem',
    lineHeight: 1.25,
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: PersonaPayload) => Promise<void> | void;
  personaData?: PersonaFormValues | null;
  rolOpciones: PersonaRolOption[];
  rolesCatalogLoading?: boolean;
  tipoIdentificacionOpciones: PersonaTipoIdentificacionOption[];
  tipoIdentificacionCatalogLoading?: boolean;
}

const DEFAULT_VALUES: PersonaFormValues = {
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  tipoIdentificacion: 'CC',
  numeroIdentificacion: '',
  correo: '',
  correoAuth: '',
  telefono: '',
  usarPasswordAdmin: false,
  roles: ['Administrador'],
  estado: 'Activo',
  contrato: null,
};

export const PersonaModal = ({
  open,
  onClose,
  onSave,
  personaData,
  rolOpciones,
  rolesCatalogLoading = false,
  tipoIdentificacionOpciones,
  tipoIdentificacionCatalogLoading = false,
}: Props) => {
  const isEdit = Boolean(personaData);
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    getValues,
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
  const usarPasswordAdminValue = watch('usarPasswordAdmin');

  const avatarInitials = getPersonaDisplayInitials(
    [primerNombreValue, segundoNombreValue, primerApellidoValue, segundoApellidoValue].join(' '),
  );
  const primaryRole = rolesValue?.[0] ?? 'Administrador';
  const headerRoleValora = rolOpciones.find((o) => o.value === primaryRole)?.valora;

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

  useEffect(() => {
    if (!open || personaData || rolesCatalogLoading || rolOpciones.length === 0) return;

    const allowed = new Set(rolOpciones.map((o) => o.value));
    const roles = getValues('roles');
    const filtered = roles.filter((r) => allowed.has(r));
    const next = filtered.length > 0 ? filtered : [rolOpciones[0].value];
    if (next.join(',') !== roles.join(',')) {
      setValue('roles', next, { shouldValidate: true });
    }
  }, [open, personaData, rolesCatalogLoading, rolOpciones, getValues, setValue]);

  useEffect(() => {
    if (!open || personaData || tipoIdentificacionCatalogLoading || tipoIdentificacionOpciones.length === 0) return;

    const allowed = new Set(tipoIdentificacionOpciones.map((o) => o.value));
    const tipo = getValues('tipoIdentificacion');
    const next = allowed.has(tipo) ? tipo : tipoIdentificacionOpciones[0].value;
    if (next !== tipo) {
      setValue('tipoIdentificacion', next, { shouldValidate: true });
    }
  }, [open, personaData, tipoIdentificacionCatalogLoading, tipoIdentificacionOpciones, getValues, setValue]);

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
      correoAuth: values.correoAuth.trim().toLowerCase(),
      telefono: normalizedPhone,
      usarPasswordAdmin: Boolean(values.usarPasswordAdmin),
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
        <Typography sx={{ fontSize: '1.06rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
          {isEdit ? 'Editar Información de Persona' : 'Registrar Nueva Persona'}
        </Typography>
      )}
      subtitle={isEdit
        ? (
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 400, color: 'text.secondary', lineHeight: 1.35 }}>
            {`Editando perfil de ${watch('primerNombre')} ${watch('primerApellido')}`}
          </Typography>
        )
        : (
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 400, color: 'text.secondary', lineHeight: 1.35 }}>
            Complete la información para dar de alta un nuevo integrante.
          </Typography>
        )}
      headerIcon={isEdit ? (
        <Avatar sx={getPersonaAvatarHeaderSxFromValora(headerRoleValora)}>
          {avatarInitials}
        </Avatar>
      ) : undefined}
      actionLoading={isSubmitting}
      actionLoadingLabel={isEdit ? 'Guardando cambios...' : 'Creando persona...'}
      contentSx={{ border: 'none', pt: 0, px: { xs: 1.75, sm: 2 }, pb: { xs: 1.25, sm: 0.5 } }}
      actionsSx={{ bgcolor: 'transparent', px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
      actions={(
        <>
          <CancelarBoton type="button" onClick={handleClose} disabled={isSubmitting} />
          <GuardarBoton
            label={isEdit ? 'Guardar Cambios' : 'Guardar persona'}
            type="submit"
            form="persona-form"
            disabled={isSubmitting}
          />
        </>
      )}
    >
      <Box id="persona-form" component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Grid container spacing={{ xs: 3, sm: 2 }} sx={{ mt: { xs: 0.5, sm: 0.25 } }}>
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
                  disabled={tipoIdentificacionCatalogLoading || tipoIdentificacionOpciones.length === 0}
                  slotProps={{ inputLabel: { shrink: true }, select: { IconComponent: KeyboardArrowDown } }}
                  helperText={
                    tipoIdentificacionCatalogLoading
                      ? 'Cargando tipos de identificación…'
                      : tipoIdentificacionOpciones.length === 0
                        ? 'No hay tipos disponibles.'
                        : undefined
                  }
                >
                  {tipoIdentificacionOpciones.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
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
                <FormControl
                  fullWidth
                  error={!!errors.telefono}
                  size="small"
                  sx={{
                    position: 'relative',
                    '& .react-tel-input .form-control': {
                      width: '100% !important',
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: errors.telefono ? 'error.main' : 'divider',
                      backgroundColor: 'background.default',
                      color: 'text.primary',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      paddingLeft: '52px',
                      boxShadow: 'none',
                      transition: 'border-color 0.2s ease',
                    },
                    '& .react-tel-input .form-control:hover': {
                      borderColor: errors.telefono ? 'error.main' : 'primary.main',
                    },
                    '& .react-tel-input .form-control:focus': {
                      borderColor: errors.telefono ? 'error.main' : 'primary.main',
                      boxShadow: 'none',
                    },
                    '& .react-tel-input .flag-dropdown': {
                      height: '40px',
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                      border: '1px solid',
                      borderColor: errors.telefono ? 'error.main' : 'divider',
                      backgroundColor: 'background.default',
                    },
                    '& .react-tel-input .selected-flag:hover, & .react-tel-input .selected-flag:focus': {
                      backgroundColor: 'transparent',
                    },
                    '& .react-tel-input .country-list': {
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      borderColor: 'divider',
                    },
                  }}
                >
                  <InputLabel
                    shrink
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: 'translate(0px, -20px) scale(1)',
                      transformOrigin: 'top left',
                      fontWeight: 500,
                      color: 'text.secondary',
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
                    containerStyle={{ width: '100%' }}
                    inputStyle={{ width: '100%' }}
                    buttonStyle={{}}
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="correoAuth"
              control={control}
              rules={{
                validate: (value) => {
                  if (usarPasswordAdminValue) return true;
                  const normalized = (value ?? "").trim();
                  if (!normalized) return "El correo auth es obligatorio";
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || "Ingresa un correo auth válido";
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    void trigger("correoAuth");
                  }}
                  onBlur={() => {
                    field.onBlur();
                    void trigger("correoAuth");
                  }}
                  fullWidth
                  size="small"
                  label="Correo auth"
                  placeholder="auth@lumet.pro"
                  disabled={Boolean(usarPasswordAdminValue)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.correoAuth}
                  helperText={
                    usarPasswordAdminValue
                      ? 'No requerido en modo administrador.'
                      : errors.correoAuth?.message ? String(errors.correoAuth.message) : ''
                  }
                />
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
                  disabled={rolesCatalogLoading || rolOpciones.length === 0}
                  slotProps={{ inputLabel: { shrink: true }, select: { IconComponent: KeyboardArrowDown, multiple: true } }}
                  error={!!errors.roles}
                  helperText={
                    rolesCatalogLoading
                      ? 'Cargando roles…'
                      : rolOpciones.length === 0
                        ? 'No hay roles disponibles.'
                        : errors.roles?.message
                  }
                >
                  {rolOpciones.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
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

          {isEdit ? (
            <Grid size={{ xs: 12 }}>
              <Controller
                name="usarPasswordAdmin"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={Boolean(field.value)}
                        onChange={(event) => field.onChange(event.target.checked)}
                      />
                    )}
                    label={(
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Usar contraseña de administrador
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Al activar esta opción, el usuario iniciará sesión con su correo y número de identificación,
                          y no se solicitará código OTP.
                        </Typography>
                      </Box>
                    )}
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                )}
              />
            </Grid>
          ) : null}

        </Grid>

      </Box>

    </CustomModal>
  );
};

