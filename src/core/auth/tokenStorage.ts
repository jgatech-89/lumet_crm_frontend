const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

const tokensClearedListeners = new Set<() => void>();

/** Notifica cuando se vacían tokens (p. ej. refresh fallido). No usa el DOM. */
export function subscribeTokensCleared(listener: () => void): () => void {
  tokensClearedListeners.add(listener);
  return () => {
    tokensClearedListeners.delete(listener);
  };
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function updateAccessToken(access: string): void {
  localStorage.setItem(ACCESS_KEY, access);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  tokensClearedListeners.forEach((fn) => fn());
}
