import type { AuthTokens, AuthUser } from "@/modules/auth/types/auth.types";

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** Carga inicial: comprobación de token y /auth/me. */
  loading: boolean;
  /** Guarda tokens, obtiene el usuario actual y persiste la sesión. */
  login: (tokens: AuthTokens) => Promise<void>;
  /** Limpia sesión y navega a `/login`. */
  logout: () => void;
  fetchMe: () => Promise<AuthUser>;
}
