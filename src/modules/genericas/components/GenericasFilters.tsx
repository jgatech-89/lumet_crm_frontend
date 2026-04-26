import {
  Box,
  ButtonBase,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export type SortOrder = "asc" | "desc";

interface GenericasFiltersProps {
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

export function GenericasFilters({ sortOrder, onSortOrderChange }: GenericasFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 0.9,
      }}
    >
      <FilterItem label="Ordenar por:">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
          <FilterPill
            label="Ascendente"
            selected={sortOrder === "asc"}
            onClick={() => onSortOrderChange("asc")}
          />
          <FilterPill
            label="Descendente"
            selected={sortOrder === "desc"}
            onClick={() => onSortOrderChange("desc")}
          />
        </Box>
      </FilterItem>
    </Box>
  );
}

function FilterItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{
          letterSpacing: "0.01em",
          color: "text.secondary",
          fontSize: "0.76rem",
          opacity: 0.95,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function FilterPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        px: 1.2,
        py: 0.55,
        borderRadius: "999px",
        border: "1px solid",
        borderColor: selected ? "primary.main" : "divider",
        backgroundColor: selected ? alpha("#2563eb", 0.1) : "transparent",
        color: selected ? "primary.main" : "text.secondary",
        fontSize: "0.74rem",
        fontWeight: 500,
        lineHeight: 1,
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: alpha("#2563eb", 0.08),
          color: "primary.main",
        },
      }}
    >
      {label}
    </ButtonBase>
  );
}
