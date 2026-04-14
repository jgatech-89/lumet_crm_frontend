import { fetchModulesByProfile } from "./api/modulesApi";
import type { ModulePermissionItem } from "./types";

const cache = new Map<number, ModulePermissionItem[]>();
const inflight = new Map<number, Promise<ModulePermissionItem[]>>();

export function getModulesSession(perfilId: number): Promise<ModulePermissionItem[]> {
  const cachedModules = cache.get(perfilId);
  if (cachedModules !== undefined) {
    return Promise.resolve(cachedModules);
  }

  const pendingRequest = inflight.get(perfilId);
  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetchModulesByProfile(perfilId)
    .then((modules) => {
      cache.set(perfilId, modules);
      return modules;
    })
    .finally(() => {
      inflight.delete(perfilId);
    });

  inflight.set(perfilId, request);
  return request;
}

export function clearModulesSession(): void {
  cache.clear();
  inflight.clear();
}
