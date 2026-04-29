import { useMemo, type ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuth } from "@/core/auth/useAuth";
import { useModulesAccess } from "@/core/modules/ModulesProvider";
import { FullPageSpinner } from "@/shared/ui/loading";

import { GuestRoute } from "./GuestRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import {
  fallbackRouteDefinition,
  staticRouteDefinitions,
  type RouteAccess,
} from "./routeDefinitions";

function wrapByAccess(access: RouteAccess, element: ReactElement): ReactElement {
  switch (access) {
    case "protected":
      return <ProtectedRoute>{element}</ProtectedRoute>;
    case "guest":
      return <GuestRoute>{element}</GuestRoute>;
    case "public":
    default:
      return element;
  }
}

export function AppRouter() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { allowedModules, loading: modulesLoading } = useModulesAccess();

  const dynamicModules = useMemo(() => {
    const staticPaths = new Set(staticRouteDefinitions.map(({ path }) => path));
    return allowedModules.filter((module) => !staticPaths.has(module.path));
  }, [allowedModules]);

  if (authLoading || (isAuthenticated && modulesLoading)) {
    return <FullPageSpinner />;
  }

  return (
    <Routes>
      {staticRouteDefinitions.map(({ path, element, access }) => (
        <Route
          key={path}
          path={path}
          element={wrapByAccess(access, element)}
        />
      ))}

      {dynamicModules.map(({ code, path, element: ModulePage }) => (
        <Route
          key={`${code}:${path}`}
          path={path}
          element={wrapByAccess("protected", <ModulePage />)}
        />
      ))}

      <Route
        path={fallbackRouteDefinition.path}
        element={wrapByAccess(
          fallbackRouteDefinition.access,
          fallbackRouteDefinition.element,
        )}
      />
    </Routes>
  );
}
