import { GenericaPage } from "@/modules/genericas/pages/GenericaPage";
// Cuando integres por permisos: descomenta import + bloque de abajo, y comenta la ruta estática en `routeDefinitions.tsx`.
// import { PersonaPage } from "@/modules/persona/pages/PersonaPage";

import type { AppModuleDefinition } from "./types";

function normalizeModuleCode(code: string): string {
  return code.trim().toLowerCase();
}

function getModulePermissionCodes(module: AppModuleDefinition): string[] {
  return [module.code, ...(module.permissionCodes ?? [])];
}

function createModulesConfig(modules: AppModuleDefinition[]): readonly AppModuleDefinition[] {
  const usedCodes = new Set<string>();
  const usedPaths = new Set<string>();

  for (const module of modules) {
    for (const permissionCode of getModulePermissionCodes(module)) {
      const normalizedCode = normalizeModuleCode(permissionCode);

      if (usedCodes.has(normalizedCode)) {
        throw new Error(`Codigo de modulo duplicado: ${permissionCode}`);
      }

      usedCodes.add(normalizedCode);
    }

    if (usedPaths.has(module.path)) {
      throw new Error(`Ruta de modulo duplicada: ${module.path}`);
    }

    usedPaths.add(module.path);
  }

  return modules;
}

export const modulesConfig = createModulesConfig([
  // {
  //   code: "personas",
  //   permissionCodes: ["personas_act"],
  //   path: "/personas",
  //   element: PersonaPage,
  // },
  {
    code: "genericas",
    permissionCodes: ["genericas_act"],
    path: "/genericas",
    element: GenericaPage,
  },
]);

const modulesByCode = new Map<string, AppModuleDefinition>();

for (const module of modulesConfig) {
  for (const permissionCode of getModulePermissionCodes(module)) {
    modulesByCode.set(normalizeModuleCode(permissionCode), module);
  }
}

export function getModuleByCode(code: string): AppModuleDefinition | undefined {
  return modulesByCode.get(normalizeModuleCode(code));
}
