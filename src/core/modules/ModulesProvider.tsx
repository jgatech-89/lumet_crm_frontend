import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useAuth } from "@/core/auth/useAuth";
import { subscribeTokensCleared } from "@/core/auth/tokenStorage";

import {
  setStoredActiveRoleId,
  subscribeActiveRoleChanges,
  syncActiveRoleFromServerUser,
} from "./activeRoleSession";
import { ModulesContext, type ModulesContextValue } from "./modulesContext";
import { getModuleByCode } from "./modules.config";
import { clearModulesSession, getModulesSession } from "./modulesSession";
import type { ModulePermissionItem, SidebarModuleItem } from "./types";
import { useAllowedModules } from "./useAllowedModules";

type UserRole = { id: number };

function roleIdsFromUser(user: { roles?: unknown } | null): UserRole[] {
  if (!Array.isArray(user?.roles)) return [];
  return user.roles.filter(
    (role): role is UserRole =>
      !!role &&
      typeof role === "object" &&
      "id" in role &&
      typeof (role as { id: unknown }).id === "number",
  );
}

function perfilIdFromUser(user: { roles?: unknown } | null, selectedRoleId?: number): number | undefined {
  const roles = roleIdsFromUser(user);
  if (!roles.length) return undefined;
  if (selectedRoleId === undefined) return roles[0].id;
  const selected = roles.find((role) => role.id === selectedRoleId);
  return selected?.id ?? roles[0].id;
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
  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>(undefined);
  const perfilId = perfilIdFromUser(user, selectedRoleId);

  const [items, setItems] = useState<ModulePermissionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeTokensCleared(() => {
      clearModulesSession();
      setStoredActiveRoleId(undefined);
      setSelectedRoleId(undefined);
    });
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSelectedRoleId(undefined);
      return;
    }
    const roles = roleIdsFromUser(user);
    if (!roles.length) {
      setSelectedRoleId(undefined);
      return;
    }
    const serverId = user.perfil_activo_id ?? user.perfil_activo?.id;
    const assigned = new Set(roles.map((r) => r.id));
    const canonical =
      serverId !== undefined && serverId !== null && assigned.has(serverId) ? serverId : roles[0].id;
    setSelectedRoleId(canonical);
    syncActiveRoleFromServerUser(user);
  }, [authLoading, user]);

  useEffect(() => {
    return subscribeActiveRoleChanges((roleId) => {
      setSelectedRoleId(roleId);
    });
  }, []);

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
