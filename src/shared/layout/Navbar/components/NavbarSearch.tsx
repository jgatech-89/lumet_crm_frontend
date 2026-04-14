import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import type React from "react";
import { transition } from "@/core/theme/motion";

interface NavbarSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const NavbarSearch = ({ placeholder = "Buscar...", onSearch }: NavbarSearchProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const isDark = theme.palette.mode === "dark";
  const searchBg = isDark
    ? alpha(theme.palette.common.white, 0.07)
    : theme.palette.action.hover;

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
          backgroundColor: searchBg,
          color: theme.palette.text.primary,
          borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 2.5,
          height: theme.spacing(4.5),
          transition: transition(["background-color", "box-shadow"]),
          "& fieldset": {
            // Dark: no visible border — bg + ring do the work.
            // Light: light divider as subtle container.
            borderColor: isDark ? "transparent" : theme.palette.divider,
            borderRadius: (parseFloat(String(theme.shape.borderRadius)) || 4) * 2.5,
          },
          "&:hover": {
            backgroundColor: isDark
              ? alpha(theme.palette.common.white, 0.1)
              : theme.palette.action.selected,
            "& fieldset": {
              borderColor: "transparent",
            },
          },
          // Glow ring focus — modern command-palette style (Linear, Figma, Vercel).
          "&.Mui-focused": {
            backgroundColor: isDark
              ? alpha(theme.palette.common.white, 0.1)
              : theme.palette.background.paper,
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.35)}, 0 4px 16px ${alpha(theme.palette.primary.main, 0.12)}`,
            "& fieldset": {
              borderColor: "transparent",
            },
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: theme.spacing(1, 1.75),
          fontSize: theme.typography.body2.fontSize,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: theme.palette.text.secondary,
                cursor: "pointer",
                transition: transition(["color", "transform"], "fast"),
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.1)",
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