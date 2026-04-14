import type { ComponentType } from "react";

export interface ModulePermissionItem {
  id: number;
  nombre: string;
  codigo: string;
  valor_orden: number;
  icono?: string | null;
  ruta?: string;
}

export interface AppModuleDefinition {
  code: string;
  permissionCodes?: string[];
  path: string;
  element: ComponentType;
}

export interface SidebarModuleItem extends ModulePermissionItem {
  path: string;
  ruta: string;
}
