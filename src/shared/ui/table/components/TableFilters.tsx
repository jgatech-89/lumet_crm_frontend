import { Box, TextField } from "@mui/material";

export interface FilterConfig {
  key: string;
  label: string;
  onChange: (value: string) => void;
}

interface Props {
  filters: FilterConfig[];
}

export const TableFilters = ({ filters }: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {filters.map((filter) => (
        <TextField
          key={filter.key}
          size="small"
          label={filter.label}
          onChange={(e) => filter.onChange(e.target.value)}
        />
      ))}
    </Box>
  );
};
