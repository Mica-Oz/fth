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
      tpWages: (
        formRef.current.querySelector(
          'input[name="tpWages"]'
        ) as HTMLInputElement
      )?.value,
      tpSocialSecurity: (
        formRef.current.querySelector(
          'input[name="tpSocialSecurity"]'
        ) as HTMLInputElement
      )?.value,
      tpPension: (
        formRef.current.querySelector(
          'input[name="tpPension"]'
        ) as HTMLInputElement
      )?.value,
      spWages: (
        formRef.current.querySelector(
          'input[name="spWages"]'
        ) as HTMLInputElement
      )?.value,
      spSocialSecurity: (
        formRef.current.querySelector(
          'input[name="spSocialSecurity"]'
        ) as HTMLInputElement
      )?.value,
      spPension: (
        formRef.current.querySelector(
          'input[name="spPension"]'
        ) as HTMLInputElement
      )?.value,
      divLessInterest: (
        formRef.current.querySelector(
          'input[name="divLessInterest"]'
        ) as HTMLInputElement
      )?.value,
      rentalIncome: (
        formRef.current.querySelector(
          'input[name="rentalIncome"]'
        ) as HTMLInputElement
      )?.value,
      rentalExpenses: (
        formRef.current.querySelector(
          'input[name="rentalExpenses"]'
        ) as HTMLInputElement
      )?.value,
      distributions: (
        formRef.current.querySelector(
          'input[name="distributions"]'
        ) as HTMLInputElement
      )?.value,
      alimony: (
        formRef.current.querySelector(
          'input[name="alimony"]'
        ) as HTMLInputElement
      )?.value,
      childSupport: (
        formRef.current.querySelector(
          'input[name="childSupport"]'
        ) as HTMLInputElement
      )?.value,
      other: (
        formRef.current.querySelector('input[name="other"]') as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/3", userData?.data.CaseID);
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
      "Monthly Income",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/4");
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
          <p className="form-group">Monthly Income</p>
          <p
            className="sub-heading"
            style={{ marginBottom: "0", marginTop: "7px" }}
          >
            Feel free to use rough estimations for income - this can be updated
            in the future.
          </p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Primary Taxpayer:</p>
              <input
                type="text"
                name="tpWages"
                id="tpWages"
                placeholder="Wages"
              />
              <input
                type="text"
                name="tpSocialSecurity"
                id="tpSocialSecurity"
                placeholder="Social Security"
              />
              <input
                type="text"
                name="tpPension"
                id="tpPension"
                placeholder="Pension(s)"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">
                Spouse/Other Contributors to the Household:
              </p>
              <input
                type="text"
                name="spWages"
                id="spWages"
                placeholder="Wages"
              />
              <input
                type="text"
                name="spSocialSecurity"
                id="spSocialSecurity"
                placeholder="Social Security"
              />
              <input
                type="text"
                name="spPension"
                id="spPension"
                placeholder="Pension(s)"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Other:</p>
              <input
                type="text"
                name="divLessInterest"
                id="divLessInterest"
                placeholder="Dividends minus Interest"
              />
              <input
                type="text"
                name="rentalIncome"
                id="rentalIncome"
                placeholder="Rental Income"
              />
              <input
                type="text"
                name="rentalExpenses"
                id="rentalExpenses"
                placeholder="Rental Expenses"
              />
              <input
                type="text"
                name="distributions"
                id="distributions"
                placeholder="Distributions (K-1)"
              />
              <input
                type="text"
                name="alimony"
                id="alimony"
                placeholder="Alimony"
              />
              <input
                type="text"
                name="childSupport"
                id="childSupport"
                placeholder="Child Support"
              />
              <input
                type="text"
                name="other"
                id="other"
                placeholder="Other (Rent subsidy, Oil credit, etc.)"
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
