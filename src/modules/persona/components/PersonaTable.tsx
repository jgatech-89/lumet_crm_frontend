import { Avatar, Box, Stack, Typography } from "@mui/material";
import {
  DeleteOutline as DeleteIcon,
  EditOutlined as EditIcon,
  VisibilityOutlined as ViewIcon,
} from "@mui/icons-material";
import { useMemo } from "react";
import type { ApiPagination } from "@/core/api/types";
import { Table } from "@/shared/ui/table";
import type { Action, Column } from "@/shared/ui/table";
import { PERSONA_ROWS_PER_PAGE } from "@/modules/persona/constants/personaConstants";
import { getPersonaAvatarSxFromValora, getPersonaRoleChipSxFromValora } from "@/modules/persona/styles/personaPageStyles";
import type { PersonaRolOption, PersonaSummary } from "@/modules/persona/types/persona.types";
import { getPersonaDisplayInitials, personaRolesFromSummary } from "@/modules/persona/utils/personaMappers";

interface PersonaTableProps {
  rows: PersonaSummary[];
  page: number;
  onPageChange: (page: number) => void;
  onViewDetail: (persona: PersonaSummary) => void;
  onEdit: (persona: PersonaSummary) => void;
  onAskDelete: (persona: PersonaSummary) => void;
  rolOpciones: PersonaRolOption[];
}

export function PersonaTable({
  rows,
  page,
  onPageChange,
  onViewDetail,
  onEdit,
  onAskDelete,
  rolOpciones,
}: PersonaTableProps) {
  const valoraByRol = useMemo(() => {
    const map = new Map<string, string | null | undefined>();
    for (const o of rolOpciones) {
      map.set(o.value, o.valora);
    }
    return map;
  }, [rolOpciones]);

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
          const mainValora = valoraByRol.get(mainRole);
          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={getPersonaAvatarSxFromValora(mainValora)}>
                {getPersonaDisplayInitials(persona.nombre)}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: "0.82rem", lineHeight: 1.35 }}>
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
          const list = personaRolesFromSummary(persona);
          const rolesToShow = list.length ? list : [mainRole];
          return (
            <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.5} alignItems="center">
              {rolesToShow.map((role, index) => (
                <Box
                  key={`${persona.id}-${role}-${index}`}
                  component="span"
                  sx={getPersonaRoleChipSxFromValora(valoraByRol.get(role))}
                >
                  {role}
                </Box>
              ))}
            </Stack>
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
                  bgcolor: isActivo ? "success.main" : "text.disabled",
                }}
              />
              <Typography variant="body2" fontWeight={500} sx={{ color: isActivo ? "success.main" : "text.secondary" }}>
                {persona.estado}
              </Typography>
            </Stack>
          );
        },
      },
    ],
    [valoraByRol],
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
    <Table
      data={pagedRows}
      columns={columns}
      actions={actions}
      pagination={pagination}
      onPageChange={onPageChange}
      actionsColumnLabel="ACCIONES"
    />
  );
}
