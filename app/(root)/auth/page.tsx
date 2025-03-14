"use client";
import { useEffect, useCallback } from "react";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

const Auth = () => {
  const params = useSearchParams();
  const stytch = useStytch();
  const { session } = useStytchSession();
  const router = useRouter();
  // console.log("session at top:", session);
  // console.log("params:", params);
  const caseID = params.get("id");
  // console.log("id:", caseID);
  const caseIdPattern = /(\d+)/;
  const match = caseID.match(caseIdPattern);
  const sanitizedID = match[1];
  // console.log("final:", sanitizedID);

  const update = useCallback(() => {
    stytch.user.update({
      untrusted_metadata: {
        id: sanitizedID,
      },
    });
  }, [stytch]);
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
          update();

          alert(`successfully autheticated: ${params}`);

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
