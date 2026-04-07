import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/core/auth/AuthProvider";
import { ThemeModeProvider } from "@/core/theme";
import { SnackbarProvider } from "@/shared/context/SnackbarContext";

import { App } from "./App";
import "@/styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("No se encontró #root");
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <SnackbarProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
);
