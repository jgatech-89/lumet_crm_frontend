import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useModulesAccess } from "@/core/modules/ModulesProvider";

function normalizePath(path: string): string {
  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

export function useSidebar() {
  const { sidebarItems, loading } = useModulesAccess();
  const { pathname } = useLocation();
  const currentPath = normalizePath(pathname);

  const isItemActive = useCallback(
    (itemPath: string) => {
      const normalizedItemPath = normalizePath(itemPath);

      if (normalizedItemPath === "/") {
        return currentPath === normalizedItemPath;
      }

      return (
        currentPath === normalizedItemPath ||
        currentPath.startsWith(`${normalizedItemPath}/`)
      );
    },
    [currentPath],
  );

  return useMemo(
    () => ({
      items: sidebarItems,
      isItemActive,
      loading,
    }),
    [sidebarItems, isItemActive, loading],
  );
}
