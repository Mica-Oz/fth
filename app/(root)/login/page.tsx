"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStytchSession } from "@stytch/nextjs";
import { useStytch } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schema/loginSchema";
import { z } from "zod";
import AOS from "aos";
import "aos/dist/aos.css";

type loginPassInputs = z.infer<typeof loginSchema>;

const Page = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  console.log("login-session:", session);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPassInputs>({
    resolver: zodResolver(loginSchema),
  });
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
  useEffect(() => {
    AOS.init();
  }, []);
  console.log("env", currentEnv);

  const submit = handleSubmit(async (data) => {
    try {
      if (currentEnv === "alpha") {
        // alpha environment call
        await stytch.magicLinks.email.send(data.email as string, {
          login_magic_link_url: "http://localhost:3000/auth/login",
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
      // alert("error logging in" + err);
      alert("error logging in");
      console.log("err:", err);
    }
  });

  return (
    <>
      <div className="main-cont">
        <div
          className="bubble-cont login"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <div className="bubble-header login">LOG IN</div>
          <div className="bubble-header-back login"></div>
          <div className="bubble-front login">
            <form className="create-form" onSubmit={submit}>
              <div className="form-row-1">
                <p>
                  Welcome Back! Please enter your Email address to recive your
                  verification link to log in!
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
                  <p className="form-error">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    {errors.email.message}
                  </p>
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
