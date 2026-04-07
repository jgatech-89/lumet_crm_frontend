import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/core/auth/useAuth";
import { FullPageSpinner } from "@/shared/ui/FullPageSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

/** Requiere usuario cargado vía JWT + /auth/me. */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
