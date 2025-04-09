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
    console.log("Submit function called!"); // Debugging log
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;

    // Collect form data using the form elements
    const formData = {
      bankAccounts: (
        formRef.current.querySelector(
          'select[name="bankAccounts"]'
        ) as HTMLSelectElement
      )?.value,
      cashOnHand: (
        formRef.current.querySelector(
          'input[name="cashOnHand"]'
        ) as HTMLInputElement
      )?.value,
      investments: (
        formRef.current.querySelector(
          'input[name="investments"]'
        ) as HTMLInputElement
      )?.value,
      lifeInsurance: (
        formRef.current.querySelector(
          'input[name="lifeInsurance"]'
        ) as HTMLInputElement
      )?.value,
      retirementAccount: (
        formRef.current.querySelector(
          'input[name="retirementAccount"]'
        ) as HTMLInputElement
      )?.value,
      realEstate: (
        formRef.current.querySelector(
          'input[name="realEstate"]'
        ) as HTMLInputElement
      )?.value,
      vehicles: (
        formRef.current.querySelector(
          'input[name="vehicles"]'
        ) as HTMLInputElement
      )?.value,
      personalEffects: (
        formRef.current.querySelector(
          'input[name="personalEffects"]'
        ) as HTMLInputElement
      )?.value,
      other: (
        formRef.current.querySelector('input[name="other"]') as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/4", userData?.data.CaseID);
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
      "Assets",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/5");
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
          <p className="form-group">Assets</p>{" "}
          <p
            className="sub-heading"
            style={{ marginBottom: "0", marginTop: "7px" }}
          >
            Feel free to use rough estimations for assets - this can be updated
            in the future.
          </p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Personal Assets:</p>
              <input
                type="text"
                name="bankAccounts"
                id="bankAccounts"
                placeholder="Bank Accounts"
              />
              <input
                type="text"
                name="cashOnHand"
                id="cashOnHand"
                placeholder="Cash On Hand"
              />
              <input
                type="text"
                name="investments"
                id="investments"
                placeholder="Investments"
              />
              <input
                type="text"
                name="lifeInsurance"
                id="lifeInsurance"
                placeholder="Life Insurance"
              />
              <input
                type="text"
                name="retirementAccount"
                id="retirementAccount"
                placeholder="Retirement Account"
              />
              <input
                type="text"
                name="realEstate"
                id="realEstate"
                placeholder="Real Estate"
              />
              <input
                type="text"
                name="vehicles"
                id="vehicles"
                placeholder="Vehicles"
              />
              <input
                type="text"
                name="personalEffects"
                id="personalEffects"
                placeholder="Personal Effects"
              />
              <input type="text" name="other" id="other" placeholder="Other" />
            </div>
          </form>
          <button className="next-btn" onClick={submit}>
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
