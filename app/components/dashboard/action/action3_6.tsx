"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";
import updateStatus from "@/app/utilities/api/updateStatus";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Action = () => {
  const { userData, setUserData } = useAppContext();
  const router = useRouter();

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);

  // const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;
    // if (!textAreaRef.current) return;
    // Collect form data using the form elements
    const formData = {
      contact: (
        formRef.current.querySelector(
          'input[name="contact"]:checked'
        ) as HTMLInputElement
      )?.value,
      // details: textAreaRef.current?.value, // Direct value access
    };

    console.log("Form Data:", formData);
    console.log("id from action  3/6", userData?.data.CaseID);
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
      "IRS Letter + Details",
      processedJSON,
      "FinancialInterview"
    );
    // update to status 5.1 if no fast track - eligibilityStarted !== true
    if (userData?.eligibilityStarted === true) {
      await updateStatus(192, userData?.data.CaseID);
      const updatedUser = await getLogicsUser(userData?.data.CaseID);
      setUserData(updatedUser);
      router.push("/dashboard/status2");
    } else {
      await updateStatus(189, userData?.data.CaseID);
      const updatedUser = await getLogicsUser(userData?.data.CaseID);
      setUserData(updatedUser);
      router.push("/dashboard/status6");
    }
  };
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action-3 action-3-6"
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
          <p className="form-group">IRS Letter</p>
          <form
            className="form-cont"
            id="textareaform"
            ref={formRef}
            style={{ height: "30%" }}
          >
            <div className="form-cat">
              <p className="cat-title">
                Have you received correspondence from the IRS?:
              </p>
              <div className="radio-row">
                <div className="radio-cont">
                  <input type="radio" id="yes" name="contact" value="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="radio-cont">
                  <input type="radio" id="no" name="contact" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
            {/* <div className="form-cat">
              <p className="cat-title">Details:</p>
              <input
                type="textarea"
                name="streetAddress1"
                id="streetAddress1"
                placeholder="Please include any details for why you are requesting your eligibility..."
                style={{ height: "70px" }}
              />
            </div> */}
          </form>
          {/* <textarea
            ref={textAreaRef}
            name="details"
            id="details"
            placeholder="Please include any details for why you are requesting your eligibility..."
            form="textareaform"
            wrap="soft"
            style={{ width: "70%", height: "150px" }}
          ></textarea> */}
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
