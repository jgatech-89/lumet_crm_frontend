import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import {
  DeleteOutline as DeleteIcon,
  EditOutlined as EditIcon,
  VisibilityOutlined as ViewIcon,
} from "@mui/icons-material";
import { useMemo } from "react";
import type { ApiPagination } from "@/core/api/types";
import { Table } from "@/shared/ui/table";
import type { Action, Column } from "@/shared/ui/table";
import { PERSONA_ROWS_PER_PAGE } from "@/modules/persona/constants/personaSeedData";
import { personaAvatarRoleStyles, personaRolBadgeStyles } from "@/modules/persona/styles/personaPageStyles";
import type { PersonaSummary } from "@/modules/persona/types/persona.types";
import { getPersonaDisplayInitials } from "@/modules/persona/utils/personaMappers";

interface PersonaTableProps {
  rows: PersonaSummary[];
  page: number;
  onPageChange: (page: number) => void;
  onViewDetail: (persona: PersonaSummary) => void;
  onEdit: (persona: PersonaSummary) => void;
  onAskDelete: (persona: PersonaSummary) => void;
}

export function PersonaTable({
  rows,
  page,
  onPageChange,
  onViewDetail,
  onEdit,
  onAskDelete,
}: PersonaTableProps) {
  const pagination = useMemo<ApiPagination>(() => {
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / PERSONA_ROWS_PER_PAGE));
    const safePage = Math.min(Math.max(1, page), totalPages);
    return {
      page: safePage,
      limit: PERSONA_ROWS_PER_PAGE,
      total,
      totalPages,
      next: safePage < totalPages ? String(safePage + 1) : null,
      previous: safePage > 1 ? String(safePage - 1) : null,
    };
  }, [rows.length, page]);

  const pagedRows = useMemo(() => {
    const start = (pagination.page - 1) * PERSONA_ROWS_PER_PAGE;
    const end = start + PERSONA_ROWS_PER_PAGE;
    return rows.slice(start, end);
  }, [rows, pagination.page]);

  const columns: Column<PersonaSummary>[] = useMemo(
    () => [
      {
        key: "nombre",
        label: "PERSONA",
        render: (persona) => {
          const mainRole = persona.rolPrincipal ?? persona.roles?.[0] ?? persona.rol ?? "Comercial";
          const avatar = personaAvatarRoleStyles[mainRole];
          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: avatar.bg,
                  color: avatar.color,
                  fontWeight: 600,
                  fontSize: "1rem",
                  width: 44,
                  height: 44,
                }}
              >
                {getPersonaDisplayInitials(persona.nombre)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  {persona.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
                  {persona.idDocumento}
                </Typography>
              </Box>
            </Stack>
          );
        },
      },
      {
        key: "rol",
        label: "ROL",
        render: (persona) => {
          const mainRole = persona.rolPrincipal ?? persona.roles?.[0] ?? persona.rol ?? "Comercial";
          const chip = personaRolBadgeStyles[mainRole];
          const rolesText = (persona.roles?.length ? persona.roles : persona.rol ? [persona.rol] : [mainRole]).join(" • ");
          return (
            <Box
              component="span"
              sx={{
                bgcolor: chip.bg,
                color: chip.color,
                fontWeight: 600,
                fontSize: "0.8rem",
                px: 2,
                py: 0.5,
                borderRadius: 5,
                display: "inline-block",
              }}
            >
              {rolesText}
            </Box>
          );
        },
      },
      {
        key: "email",
        label: "INFORMACIÓN DE CONTACTO",
        render: (persona) => (
          <Box>
            <Typography variant="body2" color="text.primary">
              {persona.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
              {persona.telefono}
            </Typography>
          </Box>
        ),
      },
      {
        key: "estado",
        label: "ESTADO",
        render: (persona) => {
          const isActivo = persona.estado === "Activo";
          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: isActivo ? "#00ACC1" : "#9E9E9E",
                }}
              />
              <Typography variant="body2" fontWeight={500} sx={{ color: isActivo ? "#00ACC1" : "#757575" }}>
                {persona.estado}
              </Typography>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  const actions: Action<PersonaSummary>[] = useMemo(
    () => [
      {
        label: "Ver detalle",
        icon: <ViewIcon fontSize="small" />,
        onClick: onViewDetail,
      },
      {
        label: "Editar",
        icon: <EditIcon fontSize="small" />,
        onClick: onEdit,
      },
      {
        label: "Eliminar",
        icon: <DeleteIcon fontSize="small" />,
        colorHex: "#D32F2F",
        onClick: onAskDelete,
      },
    ],
    [onViewDetail, onEdit, onAskDelete],
  );

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: "#ffffff", overflow: "hidden" }}>
      <Table
        data={pagedRows}
        columns={columns}
        actions={actions}
        pagination={pagination}
        onPageChange={onPageChange}
        actionsColumnLabel="ACCIONES"
      />
    </Paper>
  );
}
