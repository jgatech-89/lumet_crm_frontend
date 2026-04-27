const ACTIVE_ROLE_STORAGE_KEY = "lumet_active_role_id";
const ACTIVE_ROLE_CHANGED_EVENT = "lumet:active-role-changed";

function toRoleId(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export function getStoredActiveRoleId(): number | undefined {
  if (typeof window === "undefined") return undefined;
  return toRoleId(window.localStorage.getItem(ACTIVE_ROLE_STORAGE_KEY));
}

export function setStoredActiveRoleId(roleId: number | undefined): void {
  if (typeof window === "undefined") return;

  if (roleId === undefined) {
    window.localStorage.removeItem(ACTIVE_ROLE_STORAGE_KEY);
  } else {
    window.localStorage.setItem(ACTIVE_ROLE_STORAGE_KEY, String(roleId));
  }

  window.dispatchEvent(new CustomEvent(ACTIVE_ROLE_CHANGED_EVENT, { detail: { roleId } }));
}

export function subscribeActiveRoleChanges(handler: (roleId: number | undefined) => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const onCustomEvent = (event: Event) => {
    const custom = event as CustomEvent<{ roleId?: number }>;
    handler(custom.detail?.roleId);
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== ACTIVE_ROLE_STORAGE_KEY) return;
    handler(toRoleId(event.newValue));
  };

  window.addEventListener(ACTIVE_ROLE_CHANGED_EVENT, onCustomEvent);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(ACTIVE_ROLE_CHANGED_EVENT, onCustomEvent);
    window.removeEventListener("storage", onStorage);
  };
}
