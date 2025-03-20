"use client";
import { Suspense } from "react";
import { useEffect, useCallback } from "react";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context";

// Component with all the hooks
function AuthContent() {
  const { userData, setUserData } = useAppContext();
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const router = useRouter();

  console.log("session at top:", session);
  console.log("params:", params);
  const caseID = params.get("id");
  console.log("id:", caseID);
  const caseIdPattern = /(\d+)/;
  const match = caseID?.match(caseIdPattern);
  const sanitizedID = match?.[1] ?? "";
  // console.log("final:", sanitizedID);

  const update = useCallback(() => {
    stytch.user.update({
      untrusted_metadata: {
        id: sanitizedID,
      },
    });
  }, [sanitizedID, stytch.user]);

  async function fetchLogicsUser() {
    if (caseID) {
      console.log("caseid", sanitizedID);
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

        const data = await response.json();

        console.log(
          "Get request submitted successfully---- response in front end::",
          data
        );
        return data;
      } catch (err) {
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        router.push("/oops");
      }
    }
  }

  useEffect(() => {
    const authenticateUser = async () => {
      if (session) {
        router.push("/dashboard/status1");
        console.log(params);
      } else {
        console.log("????");
        const token = new URLSearchParams(window.location.search).get("token");
        await stytch.magicLinks
          .authenticate(token || "", {
            session_duration_minutes: 60,
          })
          .then(() => {
            update();
          });
        // Fetch logics user only after authentication
        const logicsUser = await fetchLogicsUser();
        if (logicsUser) {
          setUserData(logicsUser);
          console.log("User Data:", userData);
        }

        router.refresh();
      }
    };

    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stytch, session]);

  return (
    <>
      <br />
      <p>authenticating</p>
    </>
  );
}

// Main Auth component with Suspense boundary
export default function Auth() {
  return (
    <Suspense fallback={<p>Loading authentication...</p>}>
      <AuthContent />
    </Suspense>
  );
}
