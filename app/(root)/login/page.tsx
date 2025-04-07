"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useStytchSession } from "@stytch/nextjs";
import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";

const Page = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  console.log("login-session:", session);
  const [currentEnv, setCurrentEnv] = useState("");

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

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(form.entries()); // FormData to Object
    try {
      if (currentEnv === "alpha") {
        // alpha environment call
        await stytch.magicLinks.email.send(inputs.email as string, {
          login_magic_link_url: "http://localhost:3000/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url: "http://localhost:3000/oops",
          signup_expiration_minutes: 60,
        });
      } else if (currentEnv === "beta") {
        //beta environment call
        await stytch.magicLinks.email.send(inputs.email as string, {
          login_magic_link_url: "https://fth-beta.vercel.app/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url: "https://fth-beta.vercel.app/oops",
          signup_expiration_minutes: 60,
        });
      }
      router.push("/awaitauth"); // Navigate to the 'check email' page
    } catch (err) {
      router.push("/signup"); // Navigate to the 'check email' page
      alert("error logging in" + err);
      console.log("err:", err);
    }
  };

  return (
    <>
      <div className="main-cont">
        <div className="bubble-cont">
          <div className="bubble-header login">LOG IN</div>
          <div className="bubble-header-back login"></div>
          <div className="bubble-front login">
            <form className="create-form" onSubmit={submit}>
              <div className="form-row-1">
                <p>
                  Welcome Back! Please enter your Email address to recive your
                  magic link to log in!
                </p>
              </div>
              <div className="form-row-2 input-row">
                <input
                  name="email"
                  className="text-input"
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              {/* <div className="form-row-3 input-row">
                <input
                  name="password"
                  className="text-input"
                  type="password"
                  placeholder="Password"
                />
              </div> */}
              {/* <div className="form-row-7">
                <input
                  name="check"
                  type="checkbox"
                  className="checkbox"
                ></input>
                <p>
                  <a href="">Forgot Password</a>
                </p>
              </div> */}
              <button type="submit" className="form-row-8">
                LOG IN
              </button>
              <div className="form-row-9">
                <p>
                  Don&apos;t have an account yet?{" "}
                  <Link href={"/signup"}>Sign Up</Link>
                </p>
              </div>
            </form>
          </div>

          <div className="bubble-back login"></div>
        </div>
      </div>
      <FooterDiag />
    </>
  );
};

export default Page;
