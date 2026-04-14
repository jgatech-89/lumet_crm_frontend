import { createContext } from "react";

import type { AppModuleDefinition, SidebarModuleItem } from "./types";

export interface ModulesContextValue {
  permissionCodes: string[];
  allowedModules: AppModuleDefinition[];
  sidebarItems: SidebarModuleItem[];
  loading: boolean;
}

export const ModulesContext = createContext<ModulesContextValue | null>(null);
