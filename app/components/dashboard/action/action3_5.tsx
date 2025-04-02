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
      under65: (
        formRef.current.querySelector(
          'input[name="under65"]'
        ) as HTMLSelectElement
      )?.value,
      over65: (
        formRef.current.querySelector(
          'input[name="over65"]'
        ) as HTMLInputElement
      )?.value,
      county: (
        formRef.current.querySelector(
          'input[name="county"]'
        ) as HTMLInputElement
      )?.value,
      lienMortgage1: (
        formRef.current.querySelector(
          'input[name="lienMortgage1"]'
        ) as HTMLInputElement
      )?.value,
      lienMortgage2: (
        formRef.current.querySelector(
          'input[name="lienMortgage2"]'
        ) as HTMLInputElement
      )?.value,
      rentPayment: (
        formRef.current.querySelector(
          'input[name="rentPayment"]'
        ) as HTMLInputElement
      )?.value,
      homeInsurance: (
        formRef.current.querySelector(
          'input[name="homeInsurance"]'
        ) as HTMLInputElement
      )?.value,
      propertyTax: (
        formRef.current.querySelector(
          'input[name="propertyTax"]'
        ) as HTMLInputElement
      )?.value,
      gas: (
        formRef.current.querySelector('input[name="gas"]') as HTMLInputElement
      )?.value,
      electricity: (
        formRef.current.querySelector(
          'input[name="electricity"]'
        ) as HTMLInputElement
      )?.value,
      water: (
        formRef.current.querySelector('input[name="water"]') as HTMLInputElement
      )?.value,
      sewer: (
        formRef.current.querySelector('input[name="sewer"]') as HTMLInputElement
      )?.value,
      cableEtc: (
        formRef.current.querySelector(
          'input[name="cableEtc"]'
        ) as HTMLInputElement
      )?.value,
      trash: (
        formRef.current.querySelector('input[name="trash"]') as HTMLInputElement
      )?.value,
      phone: (
        formRef.current.querySelector('input[name="phone"]') as HTMLInputElement
      )?.value,
      publicTransportation: (
        formRef.current.querySelector(
          'input[name="publicTransportation"]'
        ) as HTMLInputElement
      )?.value,
      vehicleCount: (
        formRef.current.querySelector(
          'input[name="vehicleCount"]'
        ) as HTMLInputElement
      )?.value,
      AutoOwnLeaseCost: (
        formRef.current.querySelector(
          'input[name="AutoOwnLeaseCost"]'
        ) as HTMLInputElement
      )?.value,
      autoExpense: (
        formRef.current.querySelector(
          'input[name="autoExpense"]'
        ) as HTMLInputElement
      )?.value,
      autoInsurance: (
        formRef.current.querySelector(
          'input[name="autoInsurance"]'
        ) as HTMLInputElement
      )?.value,
      totalTax: (
        formRef.current.querySelector(
          'input[name="totalTax"]'
        ) as HTMLInputElement
      )?.value,
      courtOrderedPayments: (
        formRef.current.querySelector(
          'input[name="courtOrderedPayments"]'
        ) as HTMLInputElement
      )?.value,
      ChildDependentCare: (
        formRef.current.querySelector(
          'input[name="ChildDependentCare"]'
        ) as HTMLInputElement
      )?.value,
      wholeLifeInsurance: (
        formRef.current.querySelector(
          'input[name="wholeLifeInsurance"]'
        ) as HTMLInputElement
      )?.value,
      termLifeInsurance: (
        formRef.current.querySelector(
          'input[name="termLifeInsurance"]'
        ) as HTMLInputElement
      )?.value,
      otherExpenseName1: (
        formRef.current.querySelector(
          'input[name="otherExpenseName1"]'
        ) as HTMLInputElement
      )?.value,
      otherExpenseAmt1: (
        formRef.current.querySelector(
          'input[name="otherExpenseAmt1"]'
        ) as HTMLInputElement
      )?.value,
      otherExpenseName2: (
        formRef.current.querySelector(
          'input[name="otherExpenseName2"]'
        ) as HTMLInputElement
      )?.value,
      otherExpenseAmt2: (
        formRef.current.querySelector(
          'input[name="otherExpenseAmt2"]'
        ) as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/5", userData?.data.CaseID);
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
      "Monthly Expenses",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/6");
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
          <p className="form-group">Monthly Expenses</p>
          <p
            className="sub-heading"
            style={{ marginBottom: "0", marginTop: "7px" }}
          >
            Feel free to use rough estimations for expenses - this can be
            updated in the future.
          </p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Household Details:</p>
              <input
                type="text"
                name="under65"
                id="under65"
                placeholder="Persons Under Age 65"
              />
              <input
                type="text"
                name="over65"
                id="over65"
                placeholder="Persons Age 65 or Older"
              />
              <input
                type="text"
                name="county"
                id="county"
                placeholder="County"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Housing and Utilities:</p>
              <input
                type="text"
                name="lienMortgage1"
                id="lienMortgage1"
                placeholder="1st Lien Mortgage"
              />
              <input
                type="text"
                name="lienMortgage2"
                id="lienMortgage2"
                placeholder="2nd Lien Mortgage"
              />
              <input
                type="text"
                name="rentPayment"
                id="rentPayment"
                placeholder="Rent Payment"
              />
              <input
                type="text"
                name="homeInsurance"
                id="homeInsurance"
                placeholder="Homeowner Insurance"
              />
              <input
                type="text"
                name="propertyTax"
                id="propertyTax"
                placeholder="Property Tax"
              />

              <input type="text" name="gas" id="gas" placeholder="Gas" />
              <input
                type="text"
                name="electricity"
                id="electricity"
                placeholder="Electricity"
              />
              <input type="text" name="water" id="water" placeholder="Water" />
              <input type="text" name="sewer" id="sewer" placeholder="Sewer" />
              <input
                type="text"
                name="cableEtc"
                id="cableEtc"
                placeholder="Cable, Internet Etc."
              />
              <input type="text" name="trash" id="trash" placeholder="Trash" />
              <input type="text" name="phone" id="phone" placeholder="Phone" />
            </div>
            <div className="form-cat">
              <p className="cat-title">Auto/Transportation:</p>
              <input
                type="text"
                name="publicTransportation"
                id="publicTransportation"
                placeholder="Public Transportation"
              />
              <input
                type="text"
                name="vehicleCount"
                id="vehicleCount"
                placeholder="Number of Vehicles"
              />
              <input
                type="text"
                name="AutoOwnLeaseCost"
                id="AutoOwnLeaseCost"
                placeholder="Auto Ownership/Lease Cost"
              />
              <input
                type="text"
                name="autoExpense"
                id="autoExpense"
                placeholder="Auto Expense"
              />
              <input
                type="text"
                name="autoInsurance"
                id="autoInsurance"
                placeholder="Auto Insurance"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Taxes:</p>
              <input
                type="text"
                name="totalTax"
                id="totalTax"
                placeholder="Total Federal, State, and Local Taxes"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Other Expenses:</p>
              <input
                type="text"
                name="courtOrderedPayments"
                id="courtOrderedPayments"
                placeholder="Court Ordered Payments"
              />
              <input
                type="text"
                name="ChildDependentCare"
                id="ChildDependentCare"
                placeholder="Child/Dependent Care"
              />
              <input
                type="text"
                name="wholeLifeInsurance"
                id="wholeLifeInsurance"
                placeholder="Whole Life Insurance Policy"
              />
              <input
                type="text"
                name="termLifeInsurance"
                id="termLifeInsurance"
                placeholder="Term Life Insurance Policy"
              />
              <input
                type="text"
                name="otherExpenseName1"
                id="otherExpenseName1"
                placeholder="Other Expense #1 Name"
              />
              <input
                type="text"
                name="otherExpenseAmt1"
                id="otherExpenseAmt1"
                placeholder="Other Expense #1 Amount"
              />
              <input
                type="text"
                name="otherExpenseName2"
                id="otherExpenseName2"
                placeholder="Other Expense #2 Name"
              />
              <input
                type="text"
                name="otherExpenseAmt2"
                id="otherExpenseAmt2"
                placeholder="Other Expense #2 Amount"
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
