"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStytchSession } from "@stytch/nextjs";
import { useAuthChecks } from "@/app/context/AuthContext";

function PrivateRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, isInitialized } = useStytchSession();
  const { phoneVerified, isExempt, isLoading: authLoading } = useAuthChecks();
  const router = useRouter();

  // Debug logging (remove in production)
  console.log("🔐 PrivateRoute Auth Status:", {
    session: !!session,
    stytchFactors: session?.authentication_factors?.length || 0,
    phoneVerified,
    isExempt,
    isInitialized,
    authLoading,
  });

  useEffect(() => {
    // Wait for both Stytch and AuthContext to initialize
    if (!isInitialized || authLoading) {
      return; // Still loading
    }

    const hasStytchAuth =
      session && session?.authentication_factors.length >= 1;
    const hasPhoneAuth = phoneVerified || isExempt;

    // Check authentication requirements
    if (!hasStytchAuth || !hasPhoneAuth) {
      // Missing either email or phone auth - start over from login
      console.log("🔐 Missing authentication - redirecting to login");
      router.push("/login");
      return;
    }

    // Both authentications passed - user can access dashboard
    console.log("🔐 Full authentication passed - dashboard access granted");
  }, [session, phoneVerified, isExempt, isInitialized, authLoading, router]);

  // Show loading while either system is initializing
  if (!isInitialized || authLoading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  // Check if user has both required authentications
  const hasStytchAuth = session && session?.authentication_factors.length >= 1;
  const hasPhoneAuth = phoneVerified || isExempt;
  const isFullyAuthenticated = hasStytchAuth && hasPhoneAuth;

  // Only render children if fully authenticated
  return isFullyAuthenticated ? children : null;
}

export default PrivateRoute;
