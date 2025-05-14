"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStytchSession } from "@stytch/nextjs";
import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { smsSchema, smsAuthSchema } from "@/app/schema/smsSchema";
import { z } from "zod";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import statusDict from "@/app/utilities/statusData/statusDict";

type smsInputs = z.infer<typeof smsSchema>;
type otpInputs = z.infer<typeof smsAuthSchema>;

const Page = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  console.log("login-session:", session);
  const { userData, setUserData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  // Track UI state and methodId
  const [codeSent, setCodeSent] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [methodId, setMethodId] = useState("");
  const [currentEnv, setCurrentEnv] = useState("");

  // Phone number form
  const phoneForm = useForm<smsInputs>({
    resolver: zodResolver(smsSchema),
  });

  // OTP form
  const otpForm = useForm<otpInputs>({
    resolver: zodResolver(smsAuthSchema),
  });

  // Check if userData is properly loaded
  useEffect(() => {
    if (userData && userData.data) {
      setIsLoading(false);
    }
  }, [userData]);

  // Only access caseID when userData is properly loaded
  const caseID = userData?.data?.CaseID;

  useEffect(() => {
    // This only runs in the browser
    const currentURL = window.location.href;
    if (currentURL.includes("local")) {
      setCurrentEnv("alpha");
    } else if (currentURL.includes("beta")) {
      setCurrentEnv("beta");
    } else if (currentURL.includes(".com")) {
      setCurrentEnv("prod");
    }
  }, []);
  console.log("env", currentEnv);

  const submitPhone = phoneForm.handleSubmit(async (data) => {
    setPhoneNum(data.CellPhone);
    try {
      // alpha environment call
      const response = await stytch.otps.sms.send("+1" + data.CellPhone, {
        expiration_minutes: 5,
      });
      // Reset the OTP form before showing it
      otpForm.reset({ otp: "" });
      // Store the methodId for authentication
      setMethodId(response.method_id);
      setCodeSent(true);
    } catch (err) {
      router.push("/signup"); // Navigate to the 'check email' page
      alert("error signing up" + err);
      console.log("err:", err);
    }
  });
  // Verify OTP code
  const submitOtp = otpForm.handleSubmit(async (data) => {
    console.log("caseid from context:", caseID);
    console.log("data:", data);

    setIsLoading(true);
    try {
      // Authenticate with the OTP code
      await stytch.otps.authenticate(data.otp, methodId, {
        session_duration_minutes: 60,
      });
    } catch (err) {
      setIsLoading(false);
      alert("Error verifying code! Try again");
      console.log("err:", err);
      setCodeSent(false);
      return;
    }
    //if it authenticates, add the number to IRS logics
    try {
      const response = await fetch("/api/case/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          CaseID: caseID,
        },
        body: JSON.stringify({ phone: phoneNum }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const resData = await response.json();
      console.log(
        "Case Updated successfully From phone verification---- response in front end::",
        resData
      );
      const updatedUser = await getLogicsUser(caseID);
      setUserData(updatedUser);
      const id = updatedUser.data.StatusID;
      const maritalStatus = updatedUser.data.MartialStatus;
      const type = updatedUser.data.TAX_RELIEF_TAX_TYPE;
      let route = statusDict[id as keyof typeof statusDict];
      if (id == 184 && maritalStatus === "Married Filing Jointly") {
        route = "status2-2";
      } else if (
        (type === "BUSINESS" || type === "PERSONAL AND BUSINESS") &&
        id == 184
      ) {
        route = "status2-3";
      }
      console.log(
        "sign in stuff, route:",
        route,
        "id:",
        id,
        "marital:",
        maritalStatus
      );
      router.push("/dashboard/" + route);
    } catch (err) {
      // setError("There was an error submitting the case. Please try again.");
      console.error(err);
      alert("There was an error creating your account, please try again.");
      router.refresh();
    }
  });
  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <>
      <div className="main-cont">
        <div className="bubble-cont login">
          <div className="bubble-header login">Verify Phone</div>
          <div className="bubble-header-back login"></div>
          <div className="bubble-front login">
            {!codeSent ? (
              <form className="create-form" onSubmit={submitPhone}>
                <div className="form-row-1">
                  <p>We take security seriously!</p>{" "}
                  <p>
                    {" "}
                    Please enter your phone number for Multi-Factor
                    Authentication. We will send you a code to enter in order to
                    verify that it&apos;s you.
                  </p>
                </div>
                <div className="form-row-6 input-row">
                  <input
                    {...phoneForm.register("CellPhone")}
                    name="CellPhone"
                    className="text-input"
                    type="text"
                    placeholder="Phone Number (Must be US number)"
                  />
                  {phoneForm.formState.errors.CellPhone && (
                    <p className="form-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {phoneForm.formState.errors.CellPhone.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="form-row-8">
                  VERIFY
                </button>
                <div className="form-row-9 phone-disclaimer">
                  <p>
                    By clicking “Verify”: I accept and agree to the Terms of Use
                    Agreement as well as acknowledge receipt of your Privacy
                    Policy. I consent to FreeTaxHistory.com sending a one-time
                    verification text, and communications about my account to
                    the phone number provided. Message and data rates may apply.
                  </p>
                </div>
                <div className="form-row-9">
                  <p>
                    Issues verifying phone?{" "}
                    <Link href={"/contact"} style={{ cursor: "pointer" }}>
                      Contact Support
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              // OTP verification form
              <form className="create-form" onSubmit={submitOtp}>
                <div className="form-row-1">
                  <p>We take security seriously!</p>
                  <p>
                    Please enter your One-Time Passcode to verify it&apos;s you.
                  </p>
                </div>
                <div className="form-row-6 input-row">
                  <input
                    {...otpForm.register("otp")}
                    name="otp"
                    className="text-input"
                    type="text"
                    placeholder="One-Time Passcode"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="form-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="form-row-8">
                  VERIFY
                </button>
                <div className="form-row-9 phone-disclaimer">
                  <p>
                    By clicking “Verify”: I accept and agree to the Terms of Use
                    Agreement as well as acknowledge receipt of your Privacy
                    Policy. I consent to FreeTaxHistory.com sending a one-time
                    verification text, and communications about my account to
                    the phone number provided. Message and data rates may apply.
                  </p>
                </div>

                <div className="form-row-9">
                  <p>
                    Didn&apos;t receive a code?{" "}
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCodeSent(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Try again
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
          <div className="bubble-back login"></div>
        </div>
      </div>
      <FooterDiag />
    </>
  );
};

export default Page;
