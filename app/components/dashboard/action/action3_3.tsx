"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { action3_3_Schema } from "@/app/schema/action3_3_Schema";
import { z } from "zod";

type ActionInputs = z.infer<typeof action3_3_Schema>;

const Action = () => {
  const { userData } = useAppContext();
  const router = useRouter();

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionInputs>({
    resolver: zodResolver(action3_3_Schema),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = handleSubmit(async () => {
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
      // divLessInterest: (
      //   formRef.current.querySelector(
      //     'input[name="divLessInterest"]'
      //   ) as HTMLInputElement
      // )?.value,
      // rentalIncome: (
      //   formRef.current.querySelector(
      //     'input[name="rentalIncome"]'
      //   ) as HTMLInputElement
      // )?.value,
      // rentalExpenses: (
      //   formRef.current.querySelector(
      //     'input[name="rentalExpenses"]'
      //   ) as HTMLInputElement
      // )?.value,
      // distributions: (
      //   formRef.current.querySelector(
      //     'input[name="distributions"]'
      //   ) as HTMLInputElement
      // )?.value,
      // alimony: (
      //   formRef.current.querySelector(
      //     'input[name="alimony"]'
      //   ) as HTMLInputElement
      // )?.value,
      // childSupport: (
      //   formRef.current.querySelector(
      //     'input[name="childSupport"]'
      //   ) as HTMLInputElement
      // )?.value,
      // other: (
      //   formRef.current.querySelector('input[name="other"]') as HTMLInputElement
      // )?.value,
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
    router.push("/dashboard/action3/5");
  });
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-3 action-3-3"
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
                {...register("tpWages")}
                name="tpWages"
                id="tpWages"
                placeholder="Wages"
              />
              {errors.tpWages && (
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
                  {errors.tpWages.message}
                </p>
              )}
              <input
                type="text"
                {...register("tpSocialSecurity")}
                name="tpSocialSecurity"
                id="tpSocialSecurity"
                placeholder="Social Security"
              />
              {errors.tpSocialSecurity && (
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
                  {errors.tpSocialSecurity.message}
                </p>
              )}
              <input
                type="text"
                {...register("tpPension")}
                name="tpPension"
                id="tpPension"
                placeholder="Pension(s)"
              />
              {errors.tpPension && (
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
                  {errors.tpPension.message}
                </p>
              )}
            </div>
            <div className="form-cat">
              <p className="cat-title">
                Spouse/Other Contributors to the Household:
              </p>
              <input
                type="text"
                {...register("spWages")}
                name="spWages"
                id="spWages"
                placeholder="Wages"
              />
              {errors.spWages && (
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
                  {errors.spWages.message}
                </p>
              )}
              <input
                type="text"
                {...register("spSocialSecurity")}
                name="spSocialSecurity"
                id="spSocialSecurity"
                placeholder="Social Security"
              />
              {errors.spSocialSecurity && (
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
                  {errors.spSocialSecurity.message}
                </p>
              )}
              <input
                type="text"
                {...register("spPension")}
                name="spPension"
                id="spPension"
                placeholder="Pension(s)"
              />
              {errors.spPension && (
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
                  {errors.spPension.message}
                </p>
              )}
            </div>
            {/* <div className="form-cat">
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
            </div> */}
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
