"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { action1_1_Spouse_Schema } from "@/app/schema/action1_1_Schema_Spouse";
import { z } from "zod";

const Action1_1 = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  // const [maritalStatus, setMaritalStatus] = useState("");

  // Check if userData is properly loaded
  useEffect(() => {
    if (userData && userData.data) {
      setIsLoading(false);
    }
  }, [userData]);
  useEffect(() => {
    console.log("userData just updated:", userData);
  }, [userData]);
  // Only access caseID when userData is properly loaded
  const caseID = userData?.data?.CaseID;
  // const maritalStatus = userData?.data?.MartialStatus;

  type ActionInputs = z.infer<typeof action1_1_Spouse_Schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionInputs>({
    resolver: zodResolver(action1_1_Spouse_Schema),
    // defaultValues: {
    //   agreeToTerms: false, // Add a default value
    // },
  });
  const submit = handleSubmit(async () => {
    // Check if form ref exists
    if (formRef.current && caseID) {
      console.log("form ref current:", formRef.current);
      // Create FormData from the form reference
      const form = new FormData(formRef.current);
      const inputs = Object.fromEntries(form.entries());

      console.log("action1-1 inputs:", inputs);
      console.log("caseid from context:", caseID);
      console.log("user data", userData);
      setIsLoading(true);

      try {
        const response = await fetch("/api/case/update/action1-1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            CaseID: caseID,
          },
          body: JSON.stringify(inputs),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(
          "Case Updated successfully From action1/1 SPOUSE---- response in front end::",
          data
        );
        const updatedUser = await getLogicsUser(caseID);
        setUserData(updatedUser);

        router.push("/dashboard/action1/1.5/spouse"); // Navigate to the 'check email' page
      } catch (err) {
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        alert("There was an error submitting this info, please try again.");
        router.refresh();
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
  });

  // Show loading state while userData is loading
  if (isLoading) {
    return <div style={{ width: "100vw", height: "100vh" }}>Loading...</div>;
  }
  // If userData doesn't have the data we need even after loading
  if (!caseID) {
    return (
      <div className="split-bubble-with-title action-bubble">
        <div className="header-bubble">Error</div>
        <div className="square">
          <p>
            Could not load your case information. Please try logging in again.
          </p>
          <div className="next-btn" onClick={() => router.push("/login")}>
            Return to Login
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action1-1"
        // data-aos="fade-right"
        // data-aos-delay="150"
      >
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square" style={{ height: "75%" }}>
          <p className="sub-heading">
            We just need a few more details before we can submit your request!
          </p>
          <form
            className="form-cont"
            action="submit"
            ref={formRef}
            onSubmit={submit}
          >
            <div className="form-cat">
              <p className="cat-title">Spouse Information:</p>
              <input
                type="text"
                id="sfname"
                {...register("sfname")}
                placeholder="First Name"
              />
              {errors.sfname && (
                <p className="form-error">
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
                  {errors.sfname.message}
                </p>
              )}
              <input
                type="text"
                id="slname"
                {...register("slname")}
                placeholder="Last Name"
              />
              {errors.slname && (
                <p className="form-error">
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
                  {errors.slname.message}
                </p>
              )}
              <input
                type="text"
                {...register("sdob")}
                id="sdob"
                placeholder="Date of Birth - MM/DD/YYYY"
              />
              {errors.sdob && (
                <p className="form-error">
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
                  {errors.sdob.message}
                </p>
              )}
              <input
                type="text"
                {...register("sssn")}
                id="sssn"
                placeholder="SSN"
              />
              {errors.sssn && (
                <p className="form-error">
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
                  {errors.sssn.message}
                </p>
              )}
            </div>

            {/* <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Street Address"
              />
              <input
                type="text"
                name="aptno"
                id="aptno"
                placeholder="Apartment Number"
              />
              <input type="text" name="city" id="city" placeholder="City" />
              <input type="text" name="state" id="state" placeholder="State" />
              <input type="text" name="zip" id="zip" placeholder="Zip Code" />
            </div> */}
            <button className="next-btn" type="submit">
              NEXT
            </button>
          </form>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square" style={{ height: "75%" }}></div>
      </div>
    </>
  );
};

export default Action1_1;
