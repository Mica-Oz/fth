"use client";
import { Suspense } from "react";
import { useEffect, useCallback, useState } from "react";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context";

function AuthContent() {
  const { setUserData } = useAppContext();
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sanitize case ID
  const caseID = params.get("id");
  const sanitizedID = caseID?.match(/(\d+)/)?.[1] ?? "";

  // Update Stytch user metadata
  const updateUserMetadata = useCallback(async () => {
    try {
      await stytch.user.update({
        untrusted_metadata: { id: sanitizedID },
      });
    } catch (err) {
      console.error("Failed to update user metadata:", err);
      setError("Failed to update user information");
    }
  }, [sanitizedID, stytch.user]);

  // Fetch user data from Logics
  const fetchLogicsUser = async () => {
    if (!sanitizedID) return null;

    try {
      const response = await fetch("/api/case", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          caseID: sanitizedID,
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
  };

  useEffect(() => {
    const authenticateUser = async () => {
      if (session) {
        router.push("/signup/sms");
        return;
      }

      if (isAuthenticating) return;

      try {
        setIsAuthenticating(true);
        const token = params.get("token");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        await stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });

        await updateUserMetadata();
        const logicsUser = await fetchLogicsUser();

        if (logicsUser) {
          setUserData(logicsUser);
          router.refresh();
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        setError("Authentication failed");
        router.push("/oops");
      } finally {
        setIsAuthenticating(false);
      }
    };

    authenticateUser();
  }, [session, params, stytch, updateUserMetadata, router]);

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-blue-500 underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <div className="animate-pulse">
        <p>Setting up your account...</p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we verify your information
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
