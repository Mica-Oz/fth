"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Action1_1 = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [businessType, setBusinessType] = useState("");

  // Check if userData is properly loaded
  useEffect(() => {
    if (userData && userData.data) {
      setIsLoading(false);
    }
  }, [userData]);
  useEffect(() => {
    console.log("userData just updated:", userData);
  }, [userData]);
  // Only access caseID when userData is properly loaded
  const caseID = userData?.data?.CaseID;
  // const maritalStatus = userData?.data?.MartialStatus;
  // Add the handle select change function
  const handleBusinessTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectElement = e.target;

    // Update the state when the selection changes
    setBusinessType(selectElement.value);

    // Change text color based on selection
    if (selectElement.value) {
      selectElement.style.color = "#0a1763"; // Change text color to #0a1763
    } else {
      selectElement.style.color = "#5dacad"; // Default color if nothing is selected
    }
  };

  const submit: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    // Check if form ref exists
    if (formRef.current && caseID) {
      console.log("form ref current:", formRef.current);
      // Create FormData from the form reference
      const form = new FormData(formRef.current);
      const inputs = Object.fromEntries(form.entries());

      console.log("action1-1 inputs:", inputs);
      console.log("caseid from context:", caseID);
      console.log("user data", userData);
      setIsLoading(true);

      try {
        const response = await fetch("/api/case/update/action1-1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            CaseID: caseID,
          },
          body: JSON.stringify(inputs),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(
          "Case Updated successfully From action1/1 SPOUSE---- response in front end::",
          data
        );
        const updatedUser = await getLogicsUser(caseID);
        setUserData(updatedUser);

        router.push("/dashboard/action1/1.5/business"); // Navigate to the 'check email' page
      } catch (err) {
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        alert("There was an error submitting this info, please try again.");
        router.refresh();
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
  };
  // Show loading state while userData is loading
  if (isLoading) {
    return <div style={{ width: "100vw", height: "100vh" }}>Loading...</div>;
  }
  // If userData doesn't have the data we need even after loading
  if (!caseID) {
    return (
      <div className="split-bubble-with-title action-bubble">
        <div className="header-bubble">Error</div>
        <div className="square">
          <p>
            Could not load your case information. Please try logging in again.
          </p>
          <div className="next-btn" onClick={() => router.push("/login")}>
            Return to Login
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action1-1"
        // data-aos="fade-right"
        // data-aos-delay="150"
      >
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square">
          <p className="sub-heading">
            We just need a few more details before we can submit your request!
          </p>
          <form className="form-cont" action="submit" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Business Information:</p>
              <input
                type="text"
                name="BusinessName"
                id="BusinessName"
                placeholder="Business Name"
              />
              <div className="form-row-4 input-row" style={{ width: "100%" }}>
                <select
                  className="text-input"
                  name="BusinessType"
                  value={businessType}
                  onChange={handleBusinessTypeChange}
                  style={{ color: businessType ? "#0a1763" : "#5dacad" }}
                >
                  <option value="" disabled>
                    Select Business Type...
                  </option>
                  <option value="1">Sole Proprietership</option>
                  <option value="2">Partnership</option>
                  <option value="3">LLP</option>
                  <option value="4">LLC (single)</option>
                  <option value="5">LLC (multiple)</option>
                  <option value="6">S Corp</option>
                  <option value="7">C Corp </option>
                </select>
              </div>
              <input
                type="text"
                name="BusinessEIN"
                id="BusinessEIN"
                placeholder="Business EIN"
              />
            </div>

            <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                name="BusinessAddress"
                id="BusinessAddress"
                placeholder="Business Street Address"
              />
              <input
                type="text"
                name="BusinessAptNo"
                id="BusinessAptNo"
                placeholder="Apartment Number"
              />
              <input
                type="text"
                name="BusinessCity"
                id="BusinessCity"
                placeholder="City"
              />
              <input
                type="text"
                name="BusinessState"
                id="BusinessState"
                placeholder="State"
              />
              <input
                type="text"
                name="BusinessZip"
                id="BusinessZip"
                placeholder="Zip Code"
              />
            </div>
          </form>
          <div className="next-btn" onClick={submit}>
            NEXT
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_1;
