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
      IRS_plan: (
        formRef.current.querySelector(
          'input[name="q1"]:checked'
        ) as HTMLInputElement
      )?.value,
      state_plan: (
        formRef.current.querySelector(
          'input[name="q2"]:checked'
        ) as HTMLInputElement
      )?.value,
      bankruptcy: (
        formRef.current.querySelector(
          'input[name="q3"]:checked'
        ) as HTMLInputElement
      )?.value,
      rev_officer: (
        formRef.current.querySelector(
          'input[name="q4"]:checked'
        ) as HTMLInputElement
      )?.value,
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/7", userData?.data.CaseID);
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
      "Current Status",
      processedJSON,
      "FinancialInterview"
    );

    // Your existing routing logic
    router.push("/dashboard/action3/8");
  };
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-3 action-3-7"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble break">
          <div>Eligibility&nbsp;</div>
          <div>Request Form</div>
        </div>
        <div className="square">
          <p
            className="sub-heading hide"
            style={{ visibility: "hidden", marginBottom: "0" }}
          >
            We just need a few more details before we can submit your request!
          </p>
          <p className="form-group">Current Status</p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">
                Are you currently in a payment plan with the IRS?
              </p>
              <div className="radio-row">
                <div className="radio-cont">
                  <input type="radio" id="yes" name="q1" value="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="radio-cont">
                  <input type="radio" id="no" name="q1" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
            <div className="form-cat">
              <p className="cat-title">
                Are you currently in a payment plan with the State?
              </p>
              <div className="radio-row">
                <div className="radio-cont">
                  <input type="radio" id="yes" name="q2" value="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="radio-cont">
                  <input type="radio" id="no" name="q2" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
            <div className="form-cat">
              <p className="cat-title">Are you currently in bankruptcy?</p>
              <div className="radio-row">
                <div className="radio-cont">
                  <input type="radio" id="yes" name="q3" value="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="radio-cont">
                  <input type="radio" id="no" name="q3" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
            <div className="form-cat">
              <p className="cat-title">
                Do you currently have or are assigned to a Revenue officer?
              </p>
              <div className="radio-row">
                <div className="radio-cont">
                  <input type="radio" id="yes" name="q4" value="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="radio-cont">
                  <input type="radio" id="no" name="q4" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
          </form>
          <div className="action-btn-cont">
            <button onClick={submit} className="next-btn">
              Next
            </button>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
