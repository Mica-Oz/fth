"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { createActivity } from "@/app/utilities/api/activities";

const Action = () => {
  const { userData } = useAppContext();
  const router = useRouter();
  const [dependentCount, setDependentCount] = useState(0);

  // Create a ref for the form
  const formRef = useRef<HTMLFormElement>(null);

  // Handle change in dependent count
  const handleDependentCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(e.target.value);
    setDependentCount(count >= 0 ? count : 0);
  };

  // Generate dependent form fields
  const renderDependentFields = () => {
    const dependentFields = [];

    for (let i = 1; i <= dependentCount; i++) {
      dependentFields.push(
        <div className="form-cat" key={`dependent-${i}`}>
          <p className="cat-title">Dependent #{i}:</p>
          <input
            type="text"
            name={`firstName-${i}`}
            id={`firstName-${i}`}
            placeholder="First Name"
          />
          <input
            type="text"
            name={`lastName-${i}`}
            id={`lastName-${i}`}
            placeholder="Last Name"
          />
          <input
            type="text"
            name={`dob-${i}`}
            id={`dob-${i}`}
            placeholder="Date of Birth"
          />
          <input
            type="text"
            name={`ssn-${i}`}
            id={`ssn-${i}`}
            placeholder="SSN"
          />
          <input
            type="text"
            name={`relationship-${i}`}
            id={`relationship-${i}`}
            placeholder="Relationship"
          />
          <input
            type="text"
            name={`taxYears-${i}`}
            id={`taxYears-${i}`}
            placeholder="Tax Years"
          />
        </div>
      );
    }

    return dependentFields;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();

    // Check if form ref exists
    if (!formRef.current) return;

    // Collect form data for all dependents
    const dependentsData = [];

    for (let i = 1; i <= dependentCount; i++) {
      const dependentData = {
        firstName: (
          formRef.current.querySelector(
            `input[name="firstName-${i}"]`
          ) as HTMLInputElement
        )?.value,
        lastName: (
          formRef.current.querySelector(
            `input[name="lastName-${i}"]`
          ) as HTMLInputElement
        )?.value,
        dob: (
          formRef.current.querySelector(
            `input[name="dob-${i}"]`
          ) as HTMLInputElement
        )?.value,
        ssn: (
          formRef.current.querySelector(
            `input[name="ssn-${i}"]`
          ) as HTMLInputElement
        )?.value,
        relationship: (
          formRef.current.querySelector(
            `input[name="relationship-${i}"]`
          ) as HTMLInputElement
        )?.value,
        taxYears: (
          formRef.current.querySelector(
            `input[name="taxYears-${i}"]`
          ) as HTMLInputElement
        )?.value,
      };

      dependentsData.push(dependentData);
    }

    console.log("Form Data:", dependentsData);
    console.log("id from action  3/8", userData?.data.CaseID);

    // Process and format the JSON data for all dependents
    const processedJSON = dependentsData
      .map((dependent, index) => {
        return `Dependent #${index + 1}:<br/>${JSON.stringify(dependent)
          .replace(/,/g, `',<br/>'`)
          .replace(/["']+/g, "")
          .replace(/:/g, ": ")
          .replace(/[{}]+/g, "")}`;
      })
      .join("<br/><br/>");

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
          <p className="form-group">Dependents</p>
          <form className="form-cont" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Number of Dependents:</p>
              <input
                type="number"
                name="dependentCount"
                id="dependentCount"
                min="0"
                value={dependentCount}
                onChange={handleDependentCountChange}
                placeholder="How many dependents do you have?"
              />
            </div>

            {renderDependentFields()}
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
