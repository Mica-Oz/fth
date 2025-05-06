"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { action1_1_Business_Schema } from "@/app/schema/action1_1_Schema_Business";
import { z } from "zod";

type ActionInputs = z.infer<typeof action1_1_Business_Schema>;

const Action1_1 = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [businessType, setBusinessType] = useState("");
  const [state, setState] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionInputs>({
    resolver: zodResolver(action1_1_Business_Schema),
    defaultValues: {
      BusinessName: "",
      BusinessAddress: "",
      BusinessAptNo: "",
      BusinessCity: "",
      BusinessState: "",
      BusinessZip: "",
      BusinessType: "",
      BusinessEIN: "",
    },
  });
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectElement = e.target;

    // Update the state when the selection changes
    setState(selectElement.value);

    // Change text color based on selection
    if (selectElement.value) {
      selectElement.style.color = "#0a1763"; // Change text color to #0a1763
    } else {
      selectElement.style.color = "#5dacad"; // Default color if nothing is selected
    }
  };

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
  const submit = handleSubmit(async (data) => {
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
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(
          "Case Updated successfully From action1/1 SPOUSE---- response in front end::",
          responseData
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
  });
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
          <form
            className="form-cont"
            action="submit"
            ref={formRef}
            onSubmit={submit}
          >
            <div className="form-cat">
              <p className="cat-title">Business Information:</p>
              <input
                type="text"
                {...register("BusinessName")}
                id="BusinessName"
                placeholder="Business Name"
              />
              {errors.BusinessName && (
                <p className="form-error">
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
                  {errors.BusinessName.message}
                </p>
              )}
              <div className="form-row-4 input-row" style={{ width: "100%" }}>
                <select
                  className="text-input"
                  {...register("BusinessType")}
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
                {errors.BusinessType && (
                  <p className="form-error">
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
                    {errors.BusinessType.message}
                  </p>
                )}
              </div>
              <input
                type="text"
                {...register("BusinessEIN")}
                id="BusinessEIN"
                placeholder="Business EIN"
              />
              {errors.BusinessEIN && (
                <p className="form-error">
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
                  {errors.BusinessEIN.message}
                </p>
              )}
            </div>

            <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                {...register("BusinessAddress")}
                id="BusinessAddress"
                placeholder="Business Street Address"
              />
              {errors.BusinessAddress && (
                <p className="form-error">
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
                  {errors.BusinessAddress.message}
                </p>
              )}
              <input
                type="text"
                {...register("BusinessAptNo")}
                id="BusinessAptNo"
                placeholder="Apartment Number"
              />
              {errors.BusinessAptNo && (
                <p className="form-error">
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
                  {errors.BusinessAptNo.message}
                </p>
              )}
              <input
                type="text"
                {...register("BusinessCity")}
                id="BusinessCity"
                placeholder="City"
              />
              {errors.BusinessCity && (
                <p className="form-error">
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
                  {errors.BusinessCity.message}
                </p>
              )}

              <select
                {...register("BusinessState")}
                className="text-input"
                name="BusinessState"
                value={state}
                onChange={handleStateChange}
                style={{ color: state ? "#0a1763" : "#5dacad" }}
              >
                <option value="" disabled>
                  Select State...
                </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
                <option value="DC">District of Columbia</option>
              </select>
              {errors.BusinessState && (
                <p className="form-error">
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
                  {errors.BusinessState.message}
                </p>
              )}
              <input
                type="text"
                {...register("BusinessZip")}
                id="BusinessZip"
                placeholder="Zip Code"
              />
              {errors.BusinessZip && (
                <p className="form-error">
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
                  {errors.BusinessZip.message}
                </p>
              )}
            </div>
            <button className="next-btn" type="submit">
              NEXT
            </button>
          </form>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_1;
