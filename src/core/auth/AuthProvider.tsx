import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import { fetchMeRequest } from "@/modules/auth/api/authApi";
import type { AuthTokens, AuthUser } from "@/modules/auth/types/auth.types";

import { AuthContext } from "./authContext";
import { isUnauthorized } from "./isUnauthorized";
import {
  clearTokens,
  getAccessToken,
  setTokens,
  subscribeTokensCleared,
} from "./tokenStorage";

let pendingMeRequest: { token: string; promise: Promise<AuthUser> } | null = null;
let meCache: { token: string; user: AuthUser } | null = null;

function clearMeCache() {
  meCache = null;
}

function fetchMeOnceForCurrentToken() {
  const token = getAccessToken();
  if (!token) {
    return fetchMeRequest();
  }

  if (meCache?.token === token) {
    return Promise.resolve(meCache.user);
  }

  if (pendingMeRequest?.token === token) {
    return pendingMeRequest.promise;
  }

  const promise = fetchMeRequest()
    .then((user) => {
      meCache = { token, user };
      return user;
    })
    .finally(() => {
      if (pendingMeRequest?.promise === promise) {
        pendingMeRequest = null;
      }
    });

  pendingMeRequest = { token, promise };
  return promise;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const endSession = useCallback(
    (clearStorage: boolean) => {
      if (clearStorage) {
        clearTokens();
      }
      setUser(null);
      navigate("/login", { replace: true });
    },
    [navigate],
  );

  const logout = useCallback(() => {
    endSession(true);
  }, [endSession]);

  const fetchMe = useCallback(async () => {
    try {
      clearMeCache();
      return await fetchMeOnceForCurrentToken();
    } catch (error) {
      if (isUnauthorized(error)) {
        endSession(false);
      }
      throw error;
    }
  }, [endSession]);

  // login guarda los tokens y hace UNA consulta inicial de usuario (setea el estado aquí).
  const login = useCallback(
    async (tokens: AuthTokens) => {
      setTokens(tokens.access, tokens.refresh);
      try {
        const me = await fetchMeOnceForCurrentToken();
        setUser(me);
      } catch (error) {
        if (isUnauthorized(error)) {
          endSession(false);
        } else {
          endSession(true);
        }
        throw error;
      }
    },
    [endSession],
  );

  const endSessionRef = useRef(endSession);
  endSessionRef.current = endSession;

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!getAccessToken()) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const me = await fetchMeOnceForCurrentToken();
        if (!cancelled) setUser(me);
      } catch (error) {
        if (!cancelled) {
          if (isUnauthorized(error)) {
            endSessionRef.current(false);
          } else {
            endSessionRef.current(true);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return subscribeTokensCleared(() => {
      clearMeCache();
      endSession(false);
    });
  }, [endSession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      loading,
      login,
      logout,
      fetchMe,
    }),
    [user, loading, login, logout, fetchMe],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
