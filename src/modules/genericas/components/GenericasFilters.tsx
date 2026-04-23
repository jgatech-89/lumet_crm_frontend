import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export type SortOrder = "asc" | "desc";

interface GenericasFiltersProps {
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

export function GenericasFilters({ sortOrder, onSortOrderChange }: GenericasFiltersProps) {
  const handleChange = (e: SelectChangeEvent) => {
    onSortOrderChange(e.target.value as SortOrder);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mb: 2,
      }}
    >
      <FilterItem label="ORDENAR">
        <FormControl size="small">
          <Select
            value={sortOrder}
            onChange={handleChange}
            IconComponent={KeyboardArrowDown}
            sx={selectSx}
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
            <MenuItem value="nombre">Nombre (A-Z)</MenuItem>
            <MenuItem value="nombre-desc">Nombre (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </FilterItem>
    </Box>
  );
}

function FilterItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "text.secondary",
          whiteSpace: "nowrap",
        }}
      >
        {label}:
      </Typography>
      {children}
    </Box>
  );
}

const selectSx = {
  minWidth: 170,
  borderRadius: "10px",
  backgroundColor: "background.paper",
  fontWeight: 500,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "divider",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "text.disabled",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "1px",
    borderColor: "primary.main",
  },
  "& .MuiSelect-icon": {
    color: "text.secondary",
    transition: "transform 0.2s ease",
  },
  "& .MuiSelect-iconOpen": {
    transform: "rotate(180deg)",
  },
};
