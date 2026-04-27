import type { ReactNode } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  BadgeOutlined,
  EditOutlined,
  EmailOutlined,
  PhoneOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CustomButton } from '@/shared/ui/buttons/components/CustomButton';
import { getButtonPreset } from '@/shared/ui/buttons/buttonPresets';
import { CustomModal } from '@/shared/ui/modal/components/CustomModal';
import { getPersonaRoleChipSx } from '@/modules/persona/styles/personaPageStyles';
import type { PersonaSummary, RolPersona } from '@/modules/persona/types/persona.types';
import { getPersonaDisplayInitials, personaRolesFromSummary } from '@/modules/persona/utils/personaMappers';

interface Props {
  open: boolean;
  onClose: () => void;
  onExited?: () => void;
  onEdit: (persona: PersonaSummary) => void;
  personaData: PersonaSummary | null;
}

const roleStyles: Record<RolPersona, { bg: string; color: string }> = {
  Administrador: { bg: '#ECEFF1', color: '#455A64' },
  Usuario: { bg: '#F3E5F5', color: '#6A1B9A' },
  Supervisor: { bg: '#E3F2FD', color: '#1E88E5' },
  Comercial: { bg: '#E8F5E9', color: '#2E7D32' },
  Cerrador: { bg: '#FFF3E0', color: '#EF6C00' },
};

const parseDocument = (documentValue: string) => {
  const [type = 'CC', number = ''] = documentValue.split(':');
  return {
    type: type.trim() || 'CC',
    number: number.trim(),
  };
};

const formatDocumentLabel = (type: string) => {
  if (type === 'CC') return 'CC - Cédula de ciudadanía';
  if (type === 'CE') return 'CE - Cédula de extranjería';
  if (type === 'PA') return 'PA - Pasaporte';
  if (type === 'NIT') return 'NIT';
  return type;
};

const formatInternationalPhone = (rawPhone: string) => {
  const phone = rawPhone.trim();
  if (!phone) return 'No disponible';
  const parsed = parsePhoneNumberFromString(phone);
  if (!parsed) return phone;
  return parsed.formatInternational();
};

const DetailCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <Box
    sx={{
      bgcolor: 'background.default',
      borderRadius: 3,
      p: { xs: 2, sm: 2.5 },
      border: '1px solid',
      borderColor: 'divider',
      height: '100%',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>{icon}</Box>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </Typography>
    </Stack>
    {children}
  </Box>
);

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'text.secondary', textTransform: 'uppercase', mb: 0.45 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.35 }}>
      {value}
    </Typography>
  </Box>
);

export const PersonaDetailModal = ({ open, onClose, onExited, onEdit, personaData }: Props) => {
  const resolvedRoles = personaData ? personaRolesFromSummary(personaData) : [];
  const rolesForDisplay: RolPersona[] = resolvedRoles.length ? resolvedRoles : ['Comercial'];
  const mainRole = personaData
    ? (personaData.rolPrincipal ?? personaData.roles?.[0] ?? personaData.rol ?? 'Comercial')
    : 'Supervisor';
  const initials = getPersonaDisplayInitials(personaData?.nombre ?? '');
  const documentInfo = parseDocument(personaData?.idDocumento ?? '');
  const roleStyle = roleStyles[mainRole];

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      contentLoading={open && !personaData}
      contentLoadingVariant="linear"
      contentLoadingLabel="Cargando detalle..."
      TransitionProps={onExited ? { onExited } : undefined}
      title={(
        <Typography sx={{ fontSize: '1.06rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
          Detalle de Persona
        </Typography>
      )}
      subtitle={(
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 400, color: 'text.secondary', lineHeight: 1.35 }}>
          Visualización de perfil de colaborador
        </Typography>
      )}
      contentSx={{ border: 'none', pt: 0, px: { xs: 1.75, sm: 2 }, pb: { xs: 1.25, sm: 0.5 } }}
      actionsSx={{ bgcolor: 'transparent', px: { xs: 1.75, sm: 2 }, pb: 1.5, mt: 0.25, pt: 0.5 }}
      actions={personaData ? (
        <>
          <CustomButton
            label="Cancelar"
            type="button"
            onClick={onClose}
            {...getButtonPreset('cancel')}
          />
          <CustomButton
            label="Editar información"
            onClick={() => onEdit(personaData)}
            startIcon={<EditOutlined />}
            {...getButtonPreset('save')}
          />
        </>
      ) : undefined}
    >
      {!personaData ? null : (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              pt: { xs: 0.9, sm: 1.15 },
              pb: 1.85,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 60, sm: 68 },
                height: { xs: 60, sm: 68 },
                bgcolor: roleStyle.bg,
                color: roleStyle.color,
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: { xs: '1.08rem', sm: '1.2rem' }, fontWeight: 700, color: 'text.primary', lineHeight: 1.1, mb: 0.35 }}>
                {personaData.nombre}
              </Typography>

              <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" alignItems="center">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: (theme) => alpha(theme.palette.info.main, theme.palette.mode === "dark" ? 0.24 : 0.14),
                    color: 'info.main',
                    px: 1,
                    py: 0.3,
                    borderRadius: 999,
                    fontSize: '0.66rem',
                    fontWeight: 700,
                  }}
                >
                  {personaData.estado}
                </Box>
                {rolesForDisplay.map((role, index) => (
                  <Box key={`${role}-${index}`} component="span" sx={getPersonaRoleChipSx(role)}>
                    {role}
                  </Box>
                ))}
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500 }}>
                  ID: {personaData.idDocumento.replace(':', '')}
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#E9EEF5', mb: 2.5 }} />

          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DetailCard title="Información personal" icon={<PersonOutline fontSize="small" />}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <DetailField label="Nombre completo" value={personaData.nombre} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <DetailField label="Tipo de ID" value={formatDocumentLabel(documentInfo.type)} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <DetailField label="N° identificación" value={documentInfo.number || 'No disponible'} />
                  </Grid>
                </Grid>
              </DetailCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DetailCard title="Datos de contacto" icon={<BadgeOutlined fontSize="small" />}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                      <EmailOutlined sx={{ fontSize: '1.05rem', color: 'primary.main', mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'text.secondary', textTransform: 'uppercase', mb: 0.45 }}>
                          Correo electrónico
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary', wordBreak: 'break-word' }}>
                          {personaData.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                      <PhoneOutlined sx={{ fontSize: '1.05rem', color: 'primary.main', mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'text.secondary', textTransform: 'uppercase', mb: 0.45 }}>
                          Teléfono
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
                          {formatInternationalPhone(personaData.telefono)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </DetailCard>
            </Grid>
          </Grid>
        </Box>
      )}
    </CustomModal>
  );
};
