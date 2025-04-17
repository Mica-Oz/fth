"use client";
import React, { FormEvent, useRef } from "react";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

const CreatePassword = () => {
  const router = useRouter();
  const stytch = useStytch();
  const { user } = useStytchUser();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  console.log("user heey", user);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    // Validate passwords match and meet requirements
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log("user email:", user?.emails[0].email);
    try {
      console.log("trying");
      const res = await stytch.passwords.strengthCheck({
        email: user?.emails[0].email,
        password: password,
      });
      if (res.breached_password === true) {
        alert(
          "Password appears in a list of breached passwords. Please choose somethning else."
        );
        // Clear password fields
        if (passwordRef.current) passwordRef.current.value = "";
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
        return;
      }
      if (res.valid_password === false) {
        alert(`${res.feedback.warning} \n ${res.feedback.suggestions}`);
        if (passwordRef.current) passwordRef.current.value = "";
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
        return;
      }
      console.log("res", res);
      console.log("keys", Object.keys(res));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle any errors (e.g., logging, custom error response)
      console.error("Error with password creation:", error);
      console.error("Error response:", error.response?.data); // Log error details
      console.error("Status code:", error.response?.status); // Check status code
      console.error("Error message:", error.message); // Check error message
      return error;
    }

    try {
      // Set password for the authenticated session
      const res = await stytch.passwords.resetBySession({
        password: password,
        session_duration_minutes: 60,
      });
      console.log("res2", res);
      // Redirect to dashboard or account page
      router.push("/dashboard/status1");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("type:", Object.keys(error));
      console.log("Error with password creation:", error);
      console.log("Error response:", error.message); // Log error details
      console.log("Status code:", error.status_code); // Check status code
      //console.log("Error message:", error.message); // Check error message
      if (error.status_code === 401) {
        alert(
          "Your session has expired - you must re-authenticate your email to set your password"
        );
        //only place that should route to /login - this is the login nthat only applies for someone whose session has timeout before resetting a password
        router.push("/login");

        return; // Stop execution here
      }
      //   alert("There was an error setting your password. Please try again.");
      return; // Stop execution here
    }

    // Clear password fields
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
  };

  return (
    <div className="password-creation-container">
      <h2>Create Your Password</h2>
      <p>Please create a password to secure your account.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            ref={passwordRef}
            type="password"
            placeholder="Create Password (8+ characters)"
            required
          />
        </div>
        <div className="input-row">
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default CreatePassword;
