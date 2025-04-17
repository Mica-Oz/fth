"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStytchSession } from "@stytch/nextjs";
import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginPassSchema } from "@/app/schema/loginPassSchema";
import { z } from "zod";

type loginPassInputs = z.infer<typeof loginPassSchema>;

const Page = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  console.log("login-session:", session);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<loginPassInputs>({
    resolver: zodResolver(loginPassSchema),
  });

  const [currentEnv, setCurrentEnv] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

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

  const submit = handleSubmit(async (data) => {
    const password = watch("password");
    try {
      const res = await stytch.passwords.authenticate({
        email: data.email as string,
        password: password,
        session_duration_minutes: 60,
      });
      const session = res.session;
      console.log("keys", Object.keys(res));
      console.log("session", session);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   // Clear password fields
      if (passwordRef.current) passwordRef.current.value = "";
      alert("incorrect password");
      console.log("type:", Object.keys(error));
      console.log("Error with password creation:", error);
      console.log("Error response:", error.message); // Log error details
      console.log("Status code:", error.status_code); // Check status code
      return;
    }
    try {
      if (currentEnv === "alpha") {
        // alpha environment call
        await stytch.magicLinks.email.send(data.email as string, {
          login_magic_link_url: "http://localhost:3000/auth/loginPass",
          login_expiration_minutes: 60,
          signup_magic_link_url: "http://localhost:3000/oops",
          signup_expiration_minutes: 60,
        });
      } else if (currentEnv === "beta") {
        //beta environment call
        await stytch.magicLinks.email.send(data.email as string, {
          login_magic_link_url: "https://fth-beta.vercel.app/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url: "https://fth-beta.vercel.app/oops",
          signup_expiration_minutes: 60,
        });
      } else if (currentEnv === "prod") {
        //prod environment call
        await stytch.magicLinks.email.send(data.email as string, {
          login_magic_link_url: "https://freetaxhistory.com/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url: "https://freetaxhistory.com/oops",
          signup_expiration_minutes: 60,
        });
      }
      router.push("/awaitauth"); // Navigate to the 'check email' page
    } catch (err) {
      router.push("/signup"); // Navigate to the 'check email' page
      alert("error logging in" + err);
      console.log("err:", err);
      return;
    }
  });

  return (
    <>
      <div className="main-cont">
        <div className="bubble-cont login">
          <div className="bubble-header login">LOG IN</div>
          <div className="bubble-header-back login"></div>
          <div className="bubble-front login">
            <form className="create-form" onSubmit={submit}>
              <div className="form-row-1">
                <p>
                  Welcome Back! Please enter your Email Address and Password to
                  recieve your verification link to log in!
                </p>
              </div>
              <div className="form-row-2 input-row">
                <input
                  {...register("email")}
                  name="email"
                  className="text-input"
                  type="text"
                  placeholder="Email Address"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              <div className="form-row-3 input-row">
                <input
                  {...register("password")}
                  name="password"
                  className="text-input"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <button type="submit" className="form-row-8">
                LOG IN
              </button>
              <div className="form-row-9">
                <p>
                  Don&apos;t have an account yet?{" "}
                  <Link href={"/signup"} style={{ cursor: "pointer" }}>
                    Sign Up
                  </Link>
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
