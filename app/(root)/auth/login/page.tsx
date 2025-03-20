"use client";
import { useEffect, useState } from "react";
import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context";
import statusDict from "@/app/utilities/statusData/statusDict";

const Auth = () => {
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const { user } = useStytchUser();
  const router = useRouter();
  const { setUserData } = useAppContext();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  console.log("session at top:", session);
  console.log("params:", params);
  console.log("user at top:", user);

  // First useEffect - handles initial authentication
  useEffect(() => {
    if (session) {
      // router.push(`/dashboard/status1`); // Navigate to the 'check email' page
      console.log("Session exists, navigating");
    } else {
      console.log("No session, attempting authentication");
      const token = new URLSearchParams(window.location.search).get("token");
      if (token && !isAuthenticating) {
        setIsAuthenticating(true);
        stytch.magicLinks
          .authenticate(token, {
            session_duration_minutes: 60,
          })
          .then(() => {
            alert(`successfully authenticated`);
            router.refresh();
          })
          .catch((error) => {
            console.error("Authentication failed:", error);
            router.push("/oops");
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stytch, session]);

  // Second useEffect - watches for user data changes
  useEffect(() => {
    if (user && user.untrusted_metadata?.id) {
      const caseID = user.untrusted_metadata.id as string;
      console.log("User detected, caseID:", caseID);

      async function fetchLogicsUser() {
        try {
          const response = await fetch("/api/case", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              caseID: caseID,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Get request submitted successfully:", data);
          setUserData(data);
          const id = data.data.StatusID;
          const route = statusDict[id as keyof typeof statusDict];

          console.log("route:", route, "id:", id);
          router.push("/dashboard/" + route);
        } catch (err) {
          console.error(err);
          router.push("/oops");
        }
      }

      fetchLogicsUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <br />
      <p>Authenticating...</p>
    </>
  );
};

export default Auth;
