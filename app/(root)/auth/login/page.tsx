"use client";
import { useEffect } from "react";
import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context";

const Auth = () => {
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const { user } = useStytchUser();
  const router = useRouter();
  console.log("session at top:", session);
  console.log("params:", params);
  const { setUserData } = useAppContext();

  // console.log("id:", caseID);
  // const caseIdPattern = /(\d+)/;
  // const match = caseID?.match(caseIdPattern);
  // const sanitizedID = match?.[1] ?? "";
  // console.log("initial:", caseID, "final:", sanitizedID);

  useEffect(() => {
    if (session) {
      router.push("/dashboard/status1"); // Navigate to the 'check email' page

      console.log(params);
    } else {
      console.log("????");
      const token = new URLSearchParams(window.location.search).get("token");
      stytch.magicLinks
        .authenticate(token || "", {
          session_duration_minutes: 60,
        })
        .then(() => {
          const caseID = user?.untrusted_metadata.id as string;

          async function fetchLogicsUser() {
            console.log("TESTTTTT");
            if (caseID) {
              console.log("caseid", caseID);
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

                console.log(
                  "Get request submitted successfully---- response in front end::",
                  data
                );
                setUserData(data);
              } catch (err) {
                // setError("There was an error submitting the case. Please try again.");
                console.error(err);
                router.push("/oops");
              }
            }
          }
          fetchLogicsUser();
        })
        .then(() => {
          alert(`successfully autheticated: ?`);
        })
        .then(() => {
          router.refresh();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stytch, session]);

  return (
    <>
      <br />
      <p>authenticating</p>
    </>
  );
};
export default Auth;
