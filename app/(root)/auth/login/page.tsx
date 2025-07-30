"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { isPhoneExempt } from "@/app/utilities/support/customerSupport";
import statusDict from "@/app/utilities/statusData/statusDict";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

function AuthContent() {
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const { user } = useStytchUser();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    const navigateToSMS = async () => {
      if (user && user.untrusted_metadata?.id) {
        const caseID = user.untrusted_metadata.id as string;
        console.log("User detected, caseID:", caseID, typeof caseID);
        // Check if the user is exempt from phone verification
        if (isPhoneExempt(caseID)) {
          const logicsUser = await getLogicsUser(caseID);
          console.log("EXEMPTION!!! user data:", logicsUser);
          try {
            const id = logicsUser.data.StatusID;

            const route = statusDict[id as keyof typeof statusDict];
            router.push("/dashboard/" + route);
          } catch (err) {
            console.error("Navigation error:", err);
            router.push("/oops");
          }
        } else {
          console.log("User is not exempt, redirecting to SMS verification");
          try {
            router.push("/sms");
          } catch (err) {
            console.error("Navigation error:", err);
            router.push("/oops");
          }
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
