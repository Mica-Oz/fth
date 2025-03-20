/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";

const Signup = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  console.log("signup-session:", session);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(form.entries()); // FormData to Object
    inputs.statusID = "183";
    inputs.statusName = "Status 1.1 - Report Not Yet Requested";

    console.log("Submitting Data:", inputs);
    // setIsLoading(true);

    try {
      const response = await fetch("/api/case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(
        "Case submitted successfully---- response in front end::",
        data
      );
      console.log("datadata::", data.data);
      const caseIdPattern = /(\d+)/;
      const match = data.data.match(caseIdPattern);
      const caseID = match[1];
      console.log("caseid just nums::", caseID);

      //local alpha environment call
      // await stytch.magicLinks.email.loginOrCreate(inputs.email as string, {
      //   login_magic_link_url: "http://localhost:3000/auth/login",
      //   login_expiration_minutes: 60,
      //   signup_magic_link_url:
      //     "http://localhost:3000/auth/signup?id={" + caseID + "}",
      //   signup_expiration_minutes: 60,
      // });

      //beta environment call
      await stytch.magicLinks.email.loginOrCreate(inputs.email as string, {
        login_magic_link_url: "https://fth-beta.vercel.app/auth/login",
        login_expiration_minutes: 60,
        signup_magic_link_url:
          "https://fth-beta.vercel.app/auth/signup?id={" + caseID + "}",
        signup_expiration_minutes: 60,
      });

      router.push("/awaitauth"); // Navigate to the 'check email' page
    } catch (err) {
      // setError("There was an error submitting the case. Please try again.");
      console.error(err);
      alert("There was an error creating your account, please try again.");
      router.refresh();
    }

    // finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <>
      <div className="main-cont">
        <div className="bubble-cont">
          <div className="bubble-header">CREATE ACCOUNT</div>
          <div className="bubble-header-back"></div>
          <div className="bubble-front">
            <form action="submit" className="create-form" onSubmit={submit}>
              <div className="form-row-1">
                <p>Welcome! Please fill in your details to get started.</p>
              </div>
              <div className="form-row-2 input-row">
                <input
                  name="email"
                  className="text-input"
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-row-3 input-row">
                <input
                  name="FirstName"
                  className="text-input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="form-row-4 input-row">
                <input
                  name="LastName"
                  className="text-input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              {/* <div className="form-row-5 input-row">
                <input
                  className="text-input"
                  type="password"
                  placeholder="Password - 8 Character Minimum"
                />
              </div> */}
              <div className="form-row-6 input-row">
                <input
                  name="CellPhone"
                  className="text-input"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-row-7">
                <input type="checkbox" className="checkbox"></input>
                <p>
                  I agree to the <a href="">Terms of Service</a> &
                  <a href="">Privacy Policy</a>
                </p>
              </div>
              <button type="submit" className="form-row-8">
                SIGN UP
              </button>
              <div className="form-row-9">
                <p>
                  Already have an account? <Link href={"/login"}>Log In</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="bubble-header-back"></div>
          <div className="bubble-back"></div>
        </div>
      </div>
      <FooterDiag />
    </>
  );
};

export default Signup;
