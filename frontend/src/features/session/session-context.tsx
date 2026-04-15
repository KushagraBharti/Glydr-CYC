import type { SessionState } from "@glydr/shared";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { apiGet, apiPost } from "@/lib/api";

interface SessionContextValue {
  session: SessionState | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  toggleAuthBypass: (enabled: boolean) => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshSession() {
    const nextSession = await apiGet<SessionState>("/api/session");
    setSession(nextSession);
  }

  async function toggleAuthBypass(enabled: boolean) {
    const nextSession = await apiPost<SessionState, { enabled: boolean }>(
      "/api/dev/auth-bypass",
      { enabled },
    );
    setSession(nextSession);
  }

  useEffect(() => {
    refreshSession()
      .catch((error) => {
        console.error("Failed to load session", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, loading, refreshSession, toggleAuthBypass }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return context;
}
