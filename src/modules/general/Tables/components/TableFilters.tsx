import { Box, TextField } from "@mui/material";

export const TableFilters = ({ filters }: any) => {
  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {filters?.map((filter: any) => (
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