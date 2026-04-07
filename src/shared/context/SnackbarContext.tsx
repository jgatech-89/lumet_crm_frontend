import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";

type SnackbarSeverity = "success" | "info" | "warning" | "error";

interface SnackbarContextValue {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("info");
  const [duration, setDuration] = useState(6000);

  const showSnackbar = useCallback(
    (msg: string, sev: SnackbarSeverity = "info", duration: number = 6000) => {
      setMessage(msg);
      setSeverity(sev);
      setDuration(duration);
      setOpen(true);
    },
    [],
  );

  const showSuccess = useCallback(
    (msg: string) => showSnackbar(msg, "success"),
    [showSnackbar],
  );
  
  const showError = useCallback(
    (msg: string, duration: number = 9000) => showSnackbar(msg, "error", duration),
    [showSnackbar, duration],
  );
  
  const showInfo = useCallback(
    (msg: string) => showSnackbar(msg, "info"),
    [showSnackbar],
  );
  
  const showWarning = useCallback(
    (msg: string) => showSnackbar(msg, "warning"),
    [showSnackbar],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ showSnackbar, showSuccess, showError, showInfo, showWarning }), [showSnackbar, showSuccess, showError, showInfo, showWarning]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          "& .MuiSnackbarContent-root": { animation: "none" },
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar debe usarse dentro de SnackbarProvider");
  }
  return ctx;
}
