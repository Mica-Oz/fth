"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { useStytchUser } from "@stytch/nextjs";
import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";

const Page = () => {
  const router = useRouter();
  const stytch = useStytch();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(form.entries()); // FormData to Object
    try {
      await stytch.magicLinks.email.send(inputs.email as string);
      router.push("/awaitauth"); // Navigate to the 'check email' page
    } catch (err) {
      router.push("/signup"); // Navigate to the 'check email' page
      alert("no account found");
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
                  magic link to log in!.
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
