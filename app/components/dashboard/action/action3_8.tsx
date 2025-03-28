"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";

const Action = () => {
  const { userData } = useAppContext();
  const router = useRouter();

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;
    // Collect form data using the form elements
    const formData = {
      firstName: (
        formRef.current.querySelector(
          'input[name="firstName"]'
        ) as HTMLInputElement
      )?.value,
      lastName: (
        formRef.current.querySelector(
          'input[name="lastName"]'
        ) as HTMLInputElement
      )?.value,
      dob: (
        formRef.current.querySelector('input[name="dob"]') as HTMLInputElement
      )?.value,
      ssn: (
        formRef.current.querySelector('input[name="ssn"]') as HTMLInputElement
      )?.value,
      relationship: (
        formRef.current.querySelector(
          'input[name="relationship"]'
        ) as HTMLInputElement
      )?.value,
      taxYears: (
        formRef.current.querySelector(
          'input[name="taxYears"]'
        ) as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/8", userData?.data.CaseID);
    console.log(
      "Form Data string:",
      JSON.stringify(formData)
        .replace(/,/g, `',\n'`)
        .replace(/["']+/g, "")
        .replace(/:/g, ": ")
        .replace(/[{}]+/g, "")
    );
    const processedJSON = JSON.stringify(formData)
      .replace(/,/g, `',<br/>'`)
      .replace(/["']+/g, "")
      .replace(/:/g, ": ")
      .replace(/[{}]+/g, "");

    createActivity(
      userData?.data.CaseID,
      "Dependents",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/9");
  };
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Eligibility Request Form</div>

        <div className="square">
          <p
            className="sub-heading"
            style={{ visibility: "hidden", marginBottom: "0" }}
          >
            We just need a few more details before we can submit your request!
          </p>
          <p className="form-group">Dependents</p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Dependent #1:</p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="dob"
                id="dob"
                placeholder="Date of Birth"
              />
              <input type="text" name="ssn" id="ssn" placeholder="SSN" />
              <input
                type="text"
                name="relationship"
                id="relationship"
                placeholder="Relationship"
              />
              <input
                type="text"
                name="taxYears"
                id="taxYears"
                placeholder="Tax Years"
              />
            </div>
          </form>
          <div className="addAnotherDepBtn">Add Another+</div>
          <button onClick={submit} className="next-btn">
            Next
          </button>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
