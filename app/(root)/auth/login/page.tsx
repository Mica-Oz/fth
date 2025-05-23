"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

function AuthContent() {
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const { user } = useStytchUser();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = user?.emails[0]?.email as string;
  console.log("email:", email);
  useEffect(() => {
    const handleAuthentication = async () => {
      if (session) {
        console.log("Session exists, waiting for user data");
        return;
      }

      const token = params.get("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      if (isAuthenticating) {
        return;
      }

      try {
        setIsAuthenticating(true);
        await stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
        console.log("Authentication successful");
        router.refresh();
      } catch (error) {
        console.error("Authentication failed:", error);
        setError("Authentication failed");
        router.push("/oops");
      } finally {
        setIsAuthenticating(false);
      }
    };

    handleAuthentication();
  }, [stytch, session, params, router, isAuthenticating]);
  useEffect(() => {
    // Fetch user data from Logics
    const fetchLogicsUserByEmail = async (email: string) => {
      if (email) {
        console.log("fetching case by email", email);
        try {
          const response = await fetch("/api/case/find-by-email", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              email: email,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return await response.json();
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setError("Failed to fetch user information");
          router.push("/oops");
          return null;
        }
      }
    };

    const logicsCase = fetchLogicsUserByEmail(email);
    console.log("logics case:", logicsCase);
  }, [user, router, email]);

  useEffect(() => {
    const navigateToSMS = async () => {
      console.log("User data:", user, user?.untrusted_metadata);
      if (user && user.untrusted_metadata?.id) {
        const caseID = user.untrusted_metadata.id as string;
        console.log("User detected, caseID:", caseID);

        try {
          await router.push("/sms");
        } catch (err) {
          console.error("Navigation error:", err);
          await router.push("/oops");
        }
      }
    };

    navigateToSMS();
  }, [user, router]);

  if (error) {
    router.push("/oops");
  }

  return (
    <div className="text-center p-4">
      <div className="animate-pulse">
        <p>Authenticating...</p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we verify your credentials
        </p>
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense
      fallback={
        <div className="text-center p-4">
          <p>Loading authentication...</p>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
