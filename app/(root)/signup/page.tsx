/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterDiag from "@/app/components/footerDiag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schema/signupSchema";
import { z } from "zod";
import Typed from "typed.js";
import AOS from "aos";
import "aos/dist/aos.css";

type SignupInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const router = useRouter();
  const stytch = useStytch();
  const session = useStytchSession();
  const [maritalStatus, setMaritalStatus] = useState("");
  const [taxType, setTaxType] = useState("");
  console.log("signup-session:", session);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // Create reference to store the DOM element containing the animation
  const typer = React.useRef(null);
  useEffect(() => {
    const typed = new Typed(typer.current, {
      strings: ["Don't let what you owe be a mystery."],
      typeSpeed: 80,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // Add the handle select change function
  const handleTaxTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectElement = e.target;

    // Update the state when the selection changes
    setTaxType(selectElement.value);

    // Change text color based on selection
    if (selectElement.value) {
      selectElement.style.color = "#0a1763"; // Change text color to #0a1763
    } else {
      selectElement.style.color = "#5dacad"; // Default color if nothing is selected
    }
  };
  // Add the handle select change function
  const handleMaritalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectElement = e.target;

    // Update the state when the selection changes
    setMaritalStatus(selectElement.value);

    // Change text color based on selection
    if (selectElement.value) {
      selectElement.style.color = "#0a1763"; // Change text color to #0a1763
    } else {
      selectElement.style.color = "#5dacad"; // Default color if nothing is selected
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeToTerms: false, // Add a default value
    },
  });
  const [currentEnv, setCurrentEnv] = useState("");

  useEffect(() => {
    // This only runs in the browser
    const currentURL = window.location.href;
    if (currentURL.includes("local") || currentURL.includes("alpha")) {
      setCurrentEnv("alpha");
    } else if (currentURL.includes("beta")) {
      setCurrentEnv("beta");
    } else if (currentURL.includes(".com")) {
      setCurrentEnv("prod");
    }
  }, []);

  console.log("env", currentEnv);
  const submit = handleSubmit(async (data) => {
    data.statusID = "183";
    data.statusName = "Status 1.1 - Report Not Yet Requested";
    data.SETOfficerName = "James Grant";
    console.log("Submitting Data:", data);
    // setIsLoading(true);

    try {
      const response = await fetch("/api/case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const resJSON = await response.json();
      console.log(
        "Case submitted successfully---- response in front end::",
        resJSON
      );
      console.log("datadata::", resJSON.data);
      const caseIdPattern = /(\d+)/;
      const match = resJSON.data.match(caseIdPattern);
      const caseID = match[1];
      console.log("caseid just nums::", caseID);
      if (currentEnv === "alpha") {
        //local alpha environment call
        await stytch.magicLinks.email.loginOrCreate(data.email as string, {
          login_magic_link_url: "http://localhost:3000/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url:
            "http://localhost:3000/auth/signup?id={" + caseID + "}",
          signup_expiration_minutes: 60,
        });
      } else if (currentEnv === "beta") {
        //beta environment call
        await stytch.magicLinks.email.loginOrCreate(data.email as string, {
          login_magic_link_url: "https://fth-beta.vercel.app/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url:
            "https://fth-beta.vercel.app/auth/signup?id={" + caseID + "}",
          signup_expiration_minutes: 60,
        });
      } else if (currentEnv === "prod") {
        //prod environment call
        await stytch.magicLinks.email.loginOrCreate(data.email as string, {
          login_magic_link_url: "https://freetaxhistory.com/auth/login",
          login_expiration_minutes: 60,
          signup_magic_link_url:
            "https://freetaxhistory.com/auth/signup?id={" + caseID + "}",
          signup_expiration_minutes: 60,
        });
      }

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
  });

  return (
    <>
      <div className="main-cont signup-main">
        <div className="top-header" data-aos="fade-right" data-aos-delay="100">
          <h5>
            <span ref={typer}></span>
          </h5>
          <h3>
            Your confidential Free Tax History Report will clearly summarize a
            10+ year history of your IRS Individual Master File. We can identify
            any potential issues and help you find resolution safely and
            securely.
          </h3>
        </div>
        <div
          className="bubble-cont signup"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <div className="bubble-header">CREATE ACCOUNT</div>
          <div className="bubble-header-back"></div>
          <div className="bubble-front">
            <form action="submit" className="create-form" onSubmit={submit}>
              <div className="form-row-1">
                <p>Welcome! Please fill in your details to get started.</p>
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
              <div className="form-row-3 input-row">
                <input
                  {...register("FirstName")}
                  name="FirstName"
                  className="text-input"
                  type="text"
                  placeholder="First Name"
                />
                {errors.FirstName && (
                  <p className="form-error">
                    {" "}
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
                    {errors.FirstName.message}
                  </p>
                )}
              </div>
              <div className="form-row-4 input-row">
                <input
                  {...register("LastName")}
                  name="LastName"
                  className="text-input"
                  type="text"
                  placeholder="Last Name"
                />
                {errors.LastName && (
                  <p className="form-error">
                    {" "}
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
                    {errors.LastName.message}
                  </p>
                )}
              </div>
              <div className="form-row-4 input-row">
                <select
                  {...register("TAX_RELIEF_TAX_TYPE")}
                  className="text-input"
                  name="TAX_RELIEF_TAX_TYPE"
                  value={taxType}
                  onChange={handleTaxTypeChange}
                  style={{ color: taxType ? "#0a1763" : "#5dacad" }}
                >
                  <option value="" disabled>
                    Select Tax Type...
                  </option>
                  <option value="Personal">Personal</option>
                  {/* <option value="Business">Business</option> */}
                  <option value="Personal and Business">
                    Personal and Business
                  </option>
                </select>
                {errors.TAX_RELIEF_TAX_TYPE && (
                  <p className="form-error">
                    {" "}
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
                    {errors.TAX_RELIEF_TAX_TYPE.message}
                  </p>
                )}
              </div>
              {taxType == "Personal" && (
                <div className="form-row-4 input-row">
                  <select
                    {...register("Marital_Status")}
                    className="text-input"
                    name="Marital_Status"
                    value={maritalStatus}
                    onChange={handleMaritalChange}
                    style={{ color: maritalStatus ? "#0a1763" : "#5dacad" }}
                  >
                    <option value="" disabled>
                      Select Marital Status...
                    </option>
                    <option value="single">Single</option>
                    <option value="married filing jointly">
                      Married Filing Jointly
                    </option>
                    <option value="married filing separately">
                      Married Filing Separately
                    </option>
                    <option value="head of household">Head of Household</option>
                    {/* <option value="qualifying widow(er)">
                      Qualifying Widow
                    </option> */}
                  </select>
                  {errors.Marital_Status && (
                    <p className="form-error">
                      {" "}
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
                      {errors.Marital_Status.message}
                    </p>
                  )}
                </div>
              )}
              <div className="form-row-7">
                <input
                  type="checkbox"
                  className="checkbox"
                  {...register("agreeToTerms")}
                ></input>
                <p>
                  I agree to the <a href="">Terms of Service</a> &{" "}
                  <a href="">Privacy Policy</a>
                </p>
              </div>
              {errors.agreeToTerms && (
                <p className="form-error">
                  {" "}
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
                  {errors.agreeToTerms.message}
                </p>
              )}
              <button type="submit" className="form-row-8">
                SIGN UP
              </button>
              <div className="form-row-9">
                <p>
                  Already have an account?{" "}
                  <Link href={"/login"} style={{ cursor: "pointer" }}>
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="bubble-header-back"></div>
          <div className="bubble-back"></div>
        </div>
      </div>
      <FooterDiag page={"signup"} />
    </>
  );
};

export default Signup;
