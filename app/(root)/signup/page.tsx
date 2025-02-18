"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
// import { useState } from "react";

// import { useRouter } from "next/navigation";

// import { useStytchUser } from "@stytch/nextjs";
// import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";

const Signup = () => {
  // const router = useRouter();

  // const stytch = useStytch();
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(form.entries()); // FormData to Object

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
      console.log("response from front end", response);
      // if (!response.ok) {
      //   throw new Error("Failed to submit case");
      // }

      // const result = await response.json();
      // console.log("Case submitted successfully:");
    } catch (err) {
      // setError("There was an error submitting the case. Please try again.");
      console.error(err);
    }

    // finally {
    //   setIsLoading(false);
    // }
    // router.push("/awaitauth"); // Navigate to the 'about' page

    // await stytch.magicLinks.email.loginOrCreate(inputs.email as string);
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
