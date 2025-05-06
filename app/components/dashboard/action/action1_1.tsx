"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { createActivity } from "@/app/utilities/api/activities";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAction1_1_Schema } from "@/app/schema/action1_1_Schema";
import { z } from "zod";

const Action1_1 = () => {
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState("");

  // Get values from userData
  const caseID = userData?.data?.CaseID;
  const maritalStatus = userData?.data?.MartialStatus;

  // Create schema with marital status directly from userData
  const schema = createAction1_1_Schema({
    maritalStatus: maritalStatus || "",
  });

  type ActionInputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      primary: "",
      dob: "",
      ssn: "",
      address: "",
      aptno: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  // Check if userData is properly loaded
  useEffect(() => {
    if (userData && userData.data) {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    console.log("userData just updated:", userData);
  }, [userData]);

  useEffect(() => {
    AOS.init();
  }, []);

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

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/case/update/action1-1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          CaseID: caseID || "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseData = await response.json();
      const updatedUser = await getLogicsUser(caseID || "");
      setUserData(updatedUser);

      let comment = `Marital Status: ${maritalStatus}`;
      if (maritalStatus === "Married Filing Jointly") {
        comment += `, Primary?: ${data.primary}`;
      }

      await createActivity(
        caseID || "",
        "Marital Info",
        comment,
        "MaritalInfo"
      );

      router.push("/dashboard/action1/1.5");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
      <div className="split-bubble-with-title action-bubble action-1-1 action1-1">
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square">
          <p className="sub-heading">
            We just need a few more details before we can submit your request!
          </p>
          <form className="form-cont" onSubmit={onSubmit}>
            <div className="form-cat">
              <p className="cat-title">Taxpayer Information:</p>

              <input
                type="text"
                {...register("dob")}
                placeholder="Date of Birth - MM/DD/YYYY"
              />
              {errors.dob && (
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
                  {errors.dob.message}
                </p>
              )}

              <input type="text" {...register("ssn")} placeholder="SSN" />
              {errors.ssn && (
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
                  {errors.ssn.message}
                </p>
              )}
            </div>

            {maritalStatus === "Married Filing Jointly" && (
              <div className="form-cat">
                <p className="cat-title">
                  If married Filing Jointly, are you the Primary Taxpayer?
                </p>
                <div className="radio-row">
                  <div className="radio-cont">
                    <input
                      type="radio"
                      id="yes"
                      value="yes"
                      {...register("primary")}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="radio-cont">
                    <input
                      type="radio"
                      id="no"
                      value="no"
                      {...register("primary")}
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
                {errors.primary && (
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
                    {errors.primary.message}
                  </p>
                )}
              </div>
            )}

            <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                {...register("address")}
                placeholder="Street Address"
              />
              {errors.address && (
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
                  {errors.address.message}
                </p>
              )}

              <input
                type="text"
                {...register("aptno")}
                placeholder="Apartment Number"
              />
              {errors.aptno && (
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
                  {errors.aptno.message}
                </p>
              )}

              <input type="text" {...register("city")} placeholder="City" />
              {errors.city && (
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
                  {errors.city.message}
                </p>
              )}

              <select
                {...register("state")}
                className="text-input"
                name="state"
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
              {errors.state && (
                <p className="form-error">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                  </svg>
                  {errors.state.message}
                </p>
              )}

              <input type="text" {...register("zip")} placeholder="Zip Code" />
              {errors.zip && (
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
                  {errors.zip.message}
                </p>
              )}
            </div>
            <button type="submit" className="next-btn">
              {isLoading ? "Loading..." : "NEXT"}
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
