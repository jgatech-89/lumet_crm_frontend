import { useMemo } from "react";

import { getModuleByCode } from "./modules.config";
import type { AppModuleDefinition } from "./types";

function normalizeModuleCode(code: string): string {
  return code.trim().toLowerCase();
}

export function getAllowedModules(permissionCodes: string[]): AppModuleDefinition[] {
  const seenCodes = new Set<string>();

  return permissionCodes.reduce<AppModuleDefinition[]>((allowedModules, code) => {
    const normalizedCode = normalizeModuleCode(code);

    if (seenCodes.has(normalizedCode)) {
      return allowedModules;
    }

    const module = getModuleByCode(normalizedCode);
    if (!module) {
      return allowedModules;
    }

    seenCodes.add(normalizedCode);
    allowedModules.push(module);
    return allowedModules;
  }, []);
}

export function useAllowedModules(permissionCodes: string[]): AppModuleDefinition[] {
  return useMemo(() => getAllowedModules(permissionCodes), [permissionCodes]);
}
