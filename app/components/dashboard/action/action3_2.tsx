"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";

const Action = () => {
  const { userData } = useAppContext();
  const router = useRouter();

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);

  // Add state to manage selected values
  const [employmentType, setEmploymentType] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update the appropriate state based on the select's name
    if (name === "employmentType") {
      setEmploymentType(value);
    } else if (name === "paymentFrequency") {
      setPaymentFrequency(value);
    }

    // Check if the selected option has a value (not null or empty)
    if (value) {
      e.target.style.color = "#0a1763"; // Change text color to #0a1763
    } else {
      e.target.style.color = "#5dacad"; // Default color if nothing is selected
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    console.log("Submit function called!"); // Debugging log
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;

    // Collect form data using the form elements
    const formData = {
      employmentType,
      occupation: (
        formRef.current.querySelector(
          'input[name="occupation"]'
        ) as HTMLInputElement
      )?.value,
      employerName: (
        formRef.current.querySelector(
          'input[name="employerName"]'
        ) as HTMLInputElement
      )?.value,
      startDate: (
        formRef.current.querySelector(
          'input[name="startDate"]'
        ) as HTMLInputElement
      )?.value,
      grossIncome: (
        formRef.current.querySelector(
          'input[name="grossIncome"]'
        ) as HTMLInputElement
      )?.value,
      netIncome: (
        formRef.current.querySelector(
          'input[name="netIncome"]'
        ) as HTMLInputElement
      )?.value,
      paymentFrequency,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/2", userData?.data.CaseID);
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
      "Employment Info",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/3");
  };

  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-3"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Eligibility Request Form</div>

        <div className="square">
          <p
            className="sub-heading hide"
            style={{ visibility: "hidden", marginBottom: "0" }}
          >
            We just need a few more details before we can submit your request!
          </p>
          <p className="form-group">Employment Details</p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Employment:</p>
              <select
                name="employmentType"
                value={employmentType} // Controlled value for the select input
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select Employment Type...
                </option>
                <option value="1">W2 Wage Earner</option>
                <option value="2">1099 Self Employed</option>
                <option value="3">Both: W2 & 1099</option>
                <option value="4">Unemployed</option>
                <option value="5">Retired</option>
                <option value="6">Disabled</option>
              </select>
              <input
                type="text"
                name="occupation"
                id="occupation"
                placeholder="Occupation"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Employer:</p>
              <input
                type="text"
                name="employerName"
                id="employerName"
                placeholder="Employer Name"
              />
              <input
                type="text"
                name="startDate"
                id="startDate"
                placeholder="Start Date"
              />
              <input
                type="text"
                name="grossIncome"
                id="grossIncome"
                placeholder="Gross Income"
              />
              <input
                type="text"
                name="netIncome"
                id="netIncome"
                placeholder="Net Income"
              />
              <select
                name="paymentFrequency"
                value={paymentFrequency} // Controlled value for the select input
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select Payment Frequency...
                </option>
                <option value="1">Weekly</option>
                <option value="2">Bi-Weekly</option>
                <option value="3">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="5">Yearly</option>
                <option value="6">Other</option>
              </select>
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
