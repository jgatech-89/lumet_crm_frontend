import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useAuth } from "@/core/auth/useAuth";
import { subscribeTokensCleared } from "@/core/auth/tokenStorage";

import { setStoredActiveRoleId } from "./activePerfilSession";
import { ModulesContext, type ModulesContextValue } from "./modulesContext";
import { getModuleByCode } from "./modules.config";
import { clearModulesSession, getModulesSession } from "./modulesSession";
import type { ModulePermissionItem, SidebarModuleItem } from "./types";
import { useAllowedModules } from "./useAllowedModules";

function perfilIdFromUser(user: { perfil: unknown } | null): number | undefined {
  const perfil = user?.perfil;
  if (
    perfil &&
    typeof perfil === "object" &&
    "id" in perfil &&
    typeof (perfil as { id: unknown }).id === "number"
  ) {
    return (perfil as { id: number }).id;
  }

  return undefined;
}

function buildSidebarItems(items: ModulePermissionItem[]): SidebarModuleItem[] {
  const seenCodes = new Set<string>();
  const seenPaths = new Set<string>();

  return items.reduce<SidebarModuleItem[]>((sidebarItems, item) => {
    const module = getModuleByCode(item.codigo);
    if (!module) {
      return sidebarItems;
    }

    if (seenCodes.has(module.code) || seenPaths.has(module.path)) {
      return sidebarItems;
    }

    seenCodes.add(module.code);
    seenPaths.add(module.path);
    sidebarItems.push({
      ...item,
      codigo: module.code,
      path: module.path,
      ruta: module.path,
    });

    return sidebarItems;
  }, []);
}

export function ModulesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const perfilId = perfilIdFromUser(user);

  const [items, setItems] = useState<ModulePermissionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeTokensCleared(() => {
      clearModulesSession();
      setStoredActiveRoleId(undefined);
    });
  }, []);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (perfilId === undefined) {
      setStoredActiveRoleId(undefined);
      return;
    }

    setStoredActiveRoleId(perfilId);
  }, [authLoading, perfilId]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (perfilId === undefined) {
      setItems([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getModulesSession(perfilId)
      .then((modules) => {
        if (!cancelled) {
          setItems(modules);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, perfilId]);

  const permissionCodes = useMemo(() => items.map((item) => item.codigo), [items]);
  const allowedModules = useAllowedModules(permissionCodes);
  const sidebarItems = useMemo(() => buildSidebarItems(items), [items]);
  const showLoading = authLoading || loading;

  const value = useMemo(
    () => ({
      permissionCodes,
      allowedModules,
      sidebarItems,
      loading: showLoading,
    }),
    [permissionCodes, allowedModules, sidebarItems, showLoading],
  );

  return <ModulesContext.Provider value={value}>{children}</ModulesContext.Provider>;
}

export function useModulesAccess(): ModulesContextValue {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error("useModulesAccess debe usarse dentro de ModulesProvider");
  }

  return context;
}
