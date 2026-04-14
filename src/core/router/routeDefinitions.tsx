import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { HomePage } from "@/modules/home/pages/HomePage";
import { LoginPage } from "@/modules/auth/pages/LoginPage";

/** `protected`: requiere sesión. `guest`: solo sin sesión (p. ej. login). `public`: sin comprobación de auth. */
export type RouteAccess = "protected" | "guest" | "public";

export interface AppRouteDefinition {
  path: string;
  element: ReactElement;
  access: RouteAccess;
}

export const staticRouteDefinitions: AppRouteDefinition[] = [
  { path: "/", element: <HomePage />, access: "protected" },
  { path: "/login", element: <LoginPage />, access: "guest" },
];

export const fallbackRouteDefinition: AppRouteDefinition = {
  path: "*",
  element: <Navigate to="/" replace />,
  access: "public",
};
