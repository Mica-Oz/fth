"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Action1_1 = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  const caseID = userData.data.CaseID;

  const submit: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    // Check if form ref exists
    if (formRef.current) {
      // Create FormData from the form reference
      const form = new FormData(formRef.current);
      const inputs = Object.fromEntries(form.entries());

      console.log("action1-1 inputs:", inputs);
      console.log("caseid from context:", caseID);

      // setIsLoading(true);

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
          "Case Updated successfully From action1/1---- response in front end::",
          data
        );
        const updatedUser = await getLogicsUser(caseID);
        setUserData(updatedUser);

        router.push("/dashboard/action1/2"); // Navigate to the 'check email' page
      } catch (err) {
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        alert("There was an error creating your account, please try again.");
        router.refresh();
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
  };
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action1-1"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square">
          <p className="sub-heading">
            We just need a few more details before we can submit your request!
          </p>
          <form className="form-cont" action="submit" ref={formRef}>
            <div className="form-cat">
              <p className="cat-title">Taxpayer Information:</p>

              <input
                type="text"
                name="dob"
                id="dob"
                placeholder="Date of Birth - MM/DD/YYYY"
              />
              <input type="text" name="ssn" id="ssn" placeholder="SSN" />
            </div>
            <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Street Address"
              />
              <input
                type="text"
                name="aptno"
                id="aptno"
                placeholder="Apartment Number"
              />
              <input type="text" name="city" id="city" placeholder="City" />
              <input type="text" name="state" id="state" placeholder="State" />
              <input type="text" name="zip" id="zip" placeholder="Zip Code" />
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
