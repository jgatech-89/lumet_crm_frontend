import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import type React from "react";

interface NavbarSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const NavbarSearch = ({ placeholder = "Buscar...", onSearch }: NavbarSearchProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(searchValue);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      variant="outlined"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={handleKeyDown}
      sx={{
        width: { xs: 200, sm: 280, md: 350 },
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
          color: theme.palette.text.primary,
          borderRadius: '20px',
          height: '36px',
          "& fieldset": {
            borderColor: theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
            borderRadius: '20px',
          },
          "&:hover fieldset": {
            borderColor: theme.palette.mode === "dark" ? "#505050" : "#bdbdbd",
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: '8px 14px',
          fontSize: '0.875rem',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: theme.palette.mode === "dark" ? "#888" : "#666",
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
              onClick={handleSearchClick}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};