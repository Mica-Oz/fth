// context/AuthContext.tsx - Updated with custom session support
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { isPhoneExempt } from "@/app/utilities/support/customerSupport";

// Types
interface AuthState {
  phoneVerified: boolean;
  isExempt: boolean;
  sessionValid: boolean;
  caseId?: string;
  sessionExpiresAt?: number;
}

interface AuthContextType {
  authState: AuthState;
  setPhoneVerified: (verified: boolean) => void;
  refreshSession: () => Promise<void>;
  clearSession: () => Promise<void>;
  isAuthReady: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// AuthProvider - handles phone verification state and custom sessions
export function AuthProvider({ children }: { children: ReactNode }) {
  // Local state
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sessionValid, setSessionValid] = useState(false);
  const [caseId, setCaseId] = useState<string | undefined>();
  const [sessionExpiresAt, setSessionExpiresAt] = useState<
    number | undefined
  >();
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Check exemptions
  const isExempt = isPhoneExempt(caseId);

  // Function to validate session with your API
  const validateSession = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/sms/validate-session", {
        method: "GET",
        credentials: "include", // Important: include cookies
      });

      const data = await response.json();

      if (data.valid && data.session) {
        // Valid session found
        setSessionValid(true);
        setPhoneVerified(true);
        setCaseId(data.session.caseId);
        setSessionExpiresAt(data.session.expiresAt);

        console.log("📱 Valid SMS session found:", {
          caseId: data.session.caseId,
          expiresAt: new Date(data.session.expiresAt).toLocaleString(),
        });

        return true;
      } else {
        // No valid session
        setSessionValid(false);
        setPhoneVerified(false);
        setCaseId(undefined);
        setSessionExpiresAt(undefined);

        if (data.expired) {
          console.log("📱 SMS session expired");
        }

        return false;
      }
    } catch (error) {
      console.error("Session validation failed:", error);
      setSessionValid(false);
      setPhoneVerified(false);
      return false;
    }
  };

  // Initial session check on mount
  useEffect(() => {
    const initializeAuth = async () => {
      await validateSession();
      setIsAuthReady(true);
    };

    initializeAuth();
  }, []);

  // Auto-refresh session periodically (every 5 minutes)
  useEffect(() => {
    if (!sessionValid || !sessionExpiresAt) return;

    const interval = setInterval(() => {
      // Check if session expires in next 10 minutes
      const tenMinutesFromNow = Date.now() + 10 * 60 * 1000;

      if (sessionExpiresAt < tenMinutesFromNow) {
        console.log("📱 SMS session expiring soon, checking...");
        validateSession();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [sessionValid, sessionExpiresAt]);

  // Public method to refresh session (for manual checks)
  const refreshSession = async (): Promise<void> => {
    await validateSession();
  };

  // Method to clear session (for logout)

  const clearSession = async (): Promise<void> => {
    setSessionValid(false);
    setPhoneVerified(false);
    setCaseId(undefined);
    setSessionExpiresAt(undefined);

    try {
      await fetch("/api/auth/sms/revoke-session", { method: "POST" });
      console.log("✅ SMS session revoked");
    } catch (error) {
      console.error("Failed to revoke SMS session:", error);
    }
  };

  // Calculate final auth state
  const authState: AuthState = useMemo(
    () => ({
      phoneVerified: phoneVerified || isExempt,
      isExempt,
      sessionValid,
      caseId,
      sessionExpiresAt,
    }),
    [phoneVerified, isExempt, sessionValid, caseId, sessionExpiresAt]
  );

  // Debug logging
  useEffect(() => {
    if (isAuthReady) {
      console.log("🔐 AuthProvider State:", {
        phoneVerified: authState.phoneVerified,
        sessionValid: authState.sessionValid,
        isExempt: authState.isExempt,
        caseId: authState.caseId,
        sessionExpiresAt: authState.sessionExpiresAt
          ? new Date(authState.sessionExpiresAt).toLocaleString()
          : "none",
      });
    }
  }, [authState, isAuthReady]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setPhoneVerified: (verified: boolean) => {
          setPhoneVerified(verified);
          // Note: Setting phoneVerified directly doesn't create a session
          // The session is created by calling the create-session API
        },
        refreshSession,
        clearSession,
        isAuthReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Convenience hook for common auth checks
export const useAuthChecks = () => {
  const { authState, isAuthReady } = useAuth();

  return {
    // Main auth status
    phoneVerified: authState.phoneVerified,
    sessionValid: authState.sessionValid,
    isLoading: !isAuthReady,

    // Specific checks
    hasValidPhoneSession: authState.sessionValid,
    canSkipSMS: authState.isExempt || authState.sessionValid,

    // UI states
    showPhoneVerified: authState.phoneVerified,

    // Session info
    isExempt: authState.isExempt,
    caseId: authState.caseId,
    sessionExpiresAt: authState.sessionExpiresAt,

    // Time until expiry (in minutes)
    minutesUntilExpiry: authState.sessionExpiresAt
      ? Math.max(
          0,
          Math.floor((authState.sessionExpiresAt - Date.now()) / (60 * 1000))
        )
      : 0,
  };
};

// Hook for session management actions
export const useSessionActions = () => {
  const { refreshSession, clearSession } = useAuth();

  return {
    refreshSession,
    clearSession,

    // Create session after SMS verification
    createSessionAfterSMS: async (caseId: string, phoneNumber?: string) => {
      try {
        const response = await fetch("/api/auth/sms/create-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ caseId, phoneNumber }),
          credentials: "include",
        });

        if (response.ok) {
          // Instead of await refreshSession(), let's call the API directly
          await fetch("/api/auth/sms/validate-session", {
            method: "GET",
            credentials: "include",
          });

          return { success: true };
        } else {
          const error = await response.json();
          return { success: false, error: error.message };
        }
      } catch (error) {
        console.error("Failed to create session:", error);
        return { success: false, error: "Failed to create session" };
      }
    },
  };
};
