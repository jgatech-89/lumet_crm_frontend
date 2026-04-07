import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/core/auth/useAuth";
import { FullPageSpinner } from "@/shared/ui/FullPageSpinner";

interface GuestRouteProps {
  children: ReactNode;
}

/** Solo visitantes: si ya hay sesión, redirige al panel. */
export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
