"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
// import { createActivity } from "@/app/utilities/api/activities";
import updateStatus from "@/app/utilities/api/updateStatus";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Action = () => {
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INIDE Action 3/9 COMP:", userData);

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;
    // Collect form data using the form elements
    const formData = {
      test: "test",
    };
    const caseID = userData?.data.CaseID;
    console.log("Form Data:", formData);
    console.log("id from action  3/9", userData?.data.CaseID);
    // console.log(
    //   "Form Data string:",
    //   JSON.stringify(formData)
    //     .replace(/,/g, `',\n'`)
    //     .replace(/["']+/g, "")
    //     .replace(/:/g, ": ")
    //     .replace(/[{}]+/g, "")
    // );
    // const processedJSON = JSON.stringify(formData)
    //   .replace(/,/g, `',<br/>'`)
    //   .replace(/["']+/g, "")
    //   .replace(/:/g, ": ")
    //   .replace(/[{}]+/g, "");

    // createActivity(
    //   userData?.data.CaseID,
    //   "Current Status",
    //   processedJSON,
    //   "FinancialInterview"
    // );
    await updateStatus(189, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
    // Your existing routing logic
    router.push("/dashboard/status6");
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
          <p className="form-group">Tax Years</p>
          <form className="form-cont" ref={formRef}></form>
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
