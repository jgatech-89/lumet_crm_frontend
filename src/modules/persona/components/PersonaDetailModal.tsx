import type { ReactNode } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  BadgeOutlined,
  EmailOutlined,
  PhoneOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CustomButton } from '@/shared/ui/buttons/components/CustomButton';
import { getButtonPreset } from '@/shared/ui/buttons/buttonPresets';
import { CustomModal } from '@/shared/ui/modal/components/CustomModal';
import type { PersonaSummary, RolPersona } from '@/modules/persona/types/persona.types';

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

const buildInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);

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
      bgcolor: '#F7F9FC',
      borderRadius: 3,
      p: { xs: 2, sm: 2.5 },
      border: '1px solid #EEF2F7',
      height: '100%',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Box sx={{ color: '#1E88E5', display: 'flex', alignItems: 'center' }}>{icon}</Box>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </Typography>
    </Stack>
    {children}
  </Box>
);

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#8A94A6', textTransform: 'uppercase', mb: 0.45 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#263238', lineHeight: 1.35 }}>
      {value}
    </Typography>
  </Box>
);

export const PersonaDetailModal = ({ open, onClose, onExited, onEdit, personaData }: Props) => {
  const persona = personaData;
  const rolesText = persona ? (persona.roles?.length ? persona.roles : persona.rol ? [persona.rol] : ["Comercial"]).join(' • ') : '';
  const mainRole = persona ? (persona.rolPrincipal ?? persona.roles?.[0] ?? persona.rol ?? 'Comercial') : 'Supervisor';
  const initials = buildInitials(persona?.nombre ?? '');
  const documentInfo = parseDocument(persona?.idDocumento ?? '');
  const roleStyle = roleStyles[mainRole];
//   const statusStyle = persona ? statusStyles[persona.estado] : statusStyles.Activo;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      TransitionProps={onExited ? { onExited } : undefined}
      title={(
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#1F2937', lineHeight: 1.08, mb: 0.35 }}>
          Detalle de Persona
        </Typography>
      )}
      subtitle={(
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 400, color: '#6B7280', lineHeight: 1.25 }}>
          Visualización de perfil de colaborador
        </Typography>
      )}
      contentSx={{ pt: 0, px: { xs: 1.75, sm: 3 }, pb: 1.5 }}
      actionsSx={{ px: { xs: 1.75, sm: 3 }, pb: { xs: 2, sm: 2.5 }, pt: 1, bgcolor: 'transparent' }}
      actions={persona ? (
        <>
          <CustomButton
            label="Editar información"
            onClick={() => onEdit(persona)}
            {...getButtonPreset('secondary')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { xs: '100%', sm: 'auto' },
              color: { xs: '#1E88E5', sm: '#1E88E5' },
              px: 2,
              py: 0.95,
              borderRadius: { xs: '14px', sm: '999px' },
              border: { xs: '1px solid #D6DDE8', sm: 'none' },
              backgroundColor: { xs: '#FFFFFF', sm: 'transparent' },
              boxShadow: 'none',
              fontWeight: 700,
              justifyContent: 'center',
            }}
          />
          <CustomButton
            label="Cerrar detalle"
            onClick={onClose}
            {...getButtonPreset('save')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { xs: '100%', sm: 170 },
              py: 0.95,
              borderRadius: { xs: '14px', sm: '999px' },
              border: { xs: '1px solid #D6DDE8', sm: 'none' },
              backgroundColor: { xs: '#FFFFFF', sm: '#1E88E5' },
              color: { xs: '#1E88E5', sm: '#FFFFFF' },
              boxShadow: { xs: 'none', sm: '0px 10px 20px rgba(30, 136, 229, 0.22)' },
            }}
          />
        </>
      ) : undefined}
    >
      {!persona ? null : (
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
              <Typography sx={{ fontSize: { xs: '1.08rem', sm: '1.2rem' }, fontWeight: 700, color: '#1F2937', lineHeight: 1.1, mb: 0.35 }}>
                {persona.nombre}
              </Typography>

              <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" alignItems="center">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: '#E3F2FD',
                    color: '#1E88E5',
                    px: 1,
                    py: 0.3,
                    borderRadius: 999,
                    fontSize: '0.66rem',
                    fontWeight: 700,
                  }}
                >
                  {persona.estado}
                </Box>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: '#EEF4FF',
                    color: '#4E7AC7',
                    px: 1,
                    py: 0.3,
                    borderRadius: 999,
                    fontSize: '0.66rem',
                    fontWeight: 700,
                  }}
                >
                  {rolesText}
                </Box>
                <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 500 }}>
                  ID: {persona.idDocumento.replace(':', '')}
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
                    <DetailField label="Nombre completo" value={persona.nombre} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailField label="Tipo de ID" value={formatDocumentLabel(documentInfo.type)} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
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
                      <EmailOutlined sx={{ fontSize: '1.05rem', color: '#1E88E5', mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#8A94A6', textTransform: 'uppercase', mb: 0.45 }}>
                          Correo electrónico
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#263238', wordBreak: 'break-word' }}>
                          {persona.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                      <PhoneOutlined sx={{ fontSize: '1.05rem', color: '#1E88E5', mt: 0.2 }} />
                      <Box>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#8A94A6', textTransform: 'uppercase', mb: 0.45 }}>
                          Teléfono
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#263238' }}>
                          {formatInternationalPhone(persona.telefono)}
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
