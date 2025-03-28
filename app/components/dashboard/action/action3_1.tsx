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
      maritalStatus: (
        formRef.current.querySelector(
          'select[name="marital-status"]'
        ) as HTMLSelectElement
      )?.value,
      spouseFirstName: (
        formRef.current.querySelector(
          'input[name="firstName"]'
        ) as HTMLInputElement
      )?.value,
      spouseMiddleInit: (
        formRef.current.querySelector(
          'input[name="middleInit"]'
        ) as HTMLInputElement
      )?.value,
      spouseLastName: (
        formRef.current.querySelector(
          'input[name="lastName"]'
        ) as HTMLInputElement
      )?.value,
      spouseDOB: (
        formRef.current.querySelector('input[name="dob"]') as HTMLInputElement
      )?.value,
      spouseSSN: (
        formRef.current.querySelector('input[name="ssn"]') as HTMLInputElement
      )?.value,
      householdSize: (
        formRef.current.querySelector(
          'input[name="householdSize"]'
        ) as HTMLInputElement
      )?.value,
      dependentNumber: (
        formRef.current.querySelector(
          'input[name="dependentNumber"]'
        ) as HTMLInputElement
      )?.value,
      spouseDependents: (
        formRef.current.querySelector(
          'input[name="spouseDependents"]'
        ) as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/1", userData?.data.CaseID);
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
      "Taxpayer Home Info",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/2");
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
          <p className="sub-heading">
            We just need a few more details before we can submit your request!
          </p>
          <p className="form-group">Taxpayer Information</p>

          {/* Add ref to the form */}
          <form ref={formRef} className="form-cont">
            <div className="form-cat">
              <p className="cat-title">Marital Status:</p>
              <select name="marital-status">
                <option value="1">Single</option>
                <option value="2">Married Filing Jointly</option>
                <option value="3">Married Filing Seperately</option>
                <option value="4">Head of Household</option>
                <option value="4">Qualifying Widow</option>
              </select>
            </div>
            <div className="form-cat">
              <p className="cat-title">Spouse Information:</p>

              <input
                type="text"
                name="spouseFirstName"
                id="firstName"
                placeholder="First Name"
              />
              <input
                type="text"
                name="spouseMiddleInit"
                id="middleInit"
                placeholder="Middle Initial"
              />
              <input
                type="text"
                name="spouseLastName"
                id="spouseLastName"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="dob"
                id="dob"
                placeholder="Date of Birth"
              />
              <input type="text" name="ssn" id="ssn" placeholder="SSN" />
            </div>
            <div className="form-cat">
              <p className="cat-title">Household Size:</p>
              <input
                type="text"
                name="householdSize"
                id="householdSize"
                placeholder="# of People In Your Household"
              />
              <input
                type="text"
                name="dependentNumber"
                id="dependentNumber"
                placeholder="Number of dependents you will claim on your next tax return"
              />
              <input
                type="text"
                name="spouseDependents"
                id="spouseDependents"
                placeholder="If you file separate, how many dependents will your spouse claim?"
              />
            </div>
          </form>
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
