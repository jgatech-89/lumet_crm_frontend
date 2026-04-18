import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { HomePage } from "@/modules/home/pages/HomePage";
import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { PersonaPage } from "@/modules/persona/pages/PersonaPage";

/** `protected`: requiere sesión. `guest`: solo sin sesión (p. ej. login). `public`: sin comprobación de auth. */
export type RouteAccess = "protected" | "guest" | "public";

export interface AppRouteDefinition {
  path: string;
  element: ReactElement;
  access: RouteAccess;
}

export const staticRouteDefinitions: AppRouteDefinition[] = [
  { path: "/", element: <HomePage />, access: "protected" },
  /**
   * Personas: ruta estática para pruebas sin depender del perfil.
   * Al pasar a módulo dinámico: comenta esta línea y descomenta el bloque en `modules.config.ts` (mismo path `/personas` solo en uno).
   */
  { path: "/personas", element: <PersonaPage />, access: "protected" },
  { path: "/login", element: <LoginPage />, access: "guest" },
];

export const fallbackRouteDefinition: AppRouteDefinition = {
  path: "*",
  element: <Navigate to="/" replace />,
  access: "public",
};
