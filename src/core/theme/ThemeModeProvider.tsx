import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { createAppTheme } from "./theme";

const STORAGE_KEY = "theme";
/** Compat: migración desde la clave anterior sin duplicar lógica de lectura en componentes */
const LEGACY_STORAGE_KEY = "lumet_theme_mode";

type ThemeMode = "light" | "dark";

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

function readStoredMode(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  const stored =
    window.localStorage.getItem(STORAGE_KEY) ??
    window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return null;
}

function readInitialMode(): ThemeMode {
  return readStoredMode() ?? "light";
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => readInitialMode());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = window.localStorage.getItem(STORAGE_KEY);
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!next && (legacy === "dark" || legacy === "light")) {
      window.localStorage.setItem(STORAGE_KEY, legacy);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => {
      const next: ThemeMode = m === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return next;
    });
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = useMemo(
    () => ({ mode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode debe usarse dentro de ThemeModeProvider");
  }
  return ctx;
}
