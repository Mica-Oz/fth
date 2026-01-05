/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import scales from "@/public/scales-icon.png";
import LogoIcon from "@/public/fth-logo-icon-new.png";
import { useAppContext } from "@/app/context";
import { getActivities } from "@/app/utilities/api/activities";
import { useStytchUser } from "@stytch/nextjs";
// Import the component at the top
import SFRTooltip from "../../../tooltips/sfrToolTip"; // adjust path as needed
// import updateStatus from "@/app/utilities/api/updateStatus";
// import getLogicsUser from "@/app/utilities/api/getLogicsUser";

const Dash = () => {
  const { userData, setUserData } = useAppContext();
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id as string;

  const [isLoading, setIsLoading] = useState(true);

  async function loadActivities() {
    setIsLoading(true);
    const activities = await getActivities(caseID);
    console.log("ACTIVITIES:", activities);

    // Find the most recent activity for each activity type
    const mostRecentActivities = {
      CurrLiab: null as any,
      YearsUnfiled: null as any,
      PaymentStatus: null as any,
      SFRinQ: null as any,
    };

    // Iterate through activities to find the most recent for each type
    for (const key in activities) {
      const activity = activities[key];
      const activityType = activity.ActivityType;
      const createdDate = new Date(activity.CreatedDate);

      if (
        activityType === "CurrLiab" ||
        activityType === "YearsUnfiled" ||
        activityType === "PaymentStatus" ||
        activityType === "SFRinQ"
      ) {
        const current =
          mostRecentActivities[
            activityType as keyof typeof mostRecentActivities
          ];

        if (!current || createdDate > new Date(current.CreatedDate)) {
          mostRecentActivities[
            activityType as keyof typeof mostRecentActivities
          ] = activity;
        }
      }
    }

    // Now update userData with the most recent values
    const updates: any = {};

    if (mostRecentActivities.CurrLiab) {
      console.log("Most recent CurrLiab:", mostRecentActivities.CurrLiab);
      updates.currentLiability = mostRecentActivities.CurrLiab.Subject;
    }

    if (mostRecentActivities.YearsUnfiled) {
      console.log(
        "Most recent YearsUnfiled:",
        mostRecentActivities.YearsUnfiled
      );
      updates.yearsUnfiled = mostRecentActivities.YearsUnfiled.Subject;
    }

    if (mostRecentActivities.PaymentStatus) {
      console.log(
        "Most recent PaymentStatus:",
        mostRecentActivities.PaymentStatus
      );
      updates.paymentStatus = mostRecentActivities.PaymentStatus.Subject;
    }

    if (mostRecentActivities.SFRinQ) {
      console.log("Most recent SFRinQ:", mostRecentActivities.SFRinQ);
      updates.sfrInQueue = mostRecentActivities.SFRinQ.Subject;
    }

    // Single state update with all the new values
    if (Object.keys(updates).length > 0) {
      setUserData((prevData: any) => ({
        ...prevData,
        ...updates,
      }));
    }

    setIsLoading(false);
  }
  useEffect(() => {
    if (caseID) {
      loadActivities();
    }
  }, [caseID, setUserData]); // Add setUserData here

  // async function acknowledge() {
  //   const status = userData?.data.StatusID;

  //   let isLegacyUserPath = false;
  //   if (status === 187 || status === 193) {
  //     isLegacyUserPath = true;
  //   }
  //   if (isLegacyUserPath) {
  //     let fastTrack = false;
  //     if (status === 193) {
  //       fastTrack = true;
  //     }
  //     //if fast track
  //     if (fastTrack === true) {
  //       await updateStatus(189, caseID);
  //     } else if (status === 187) {
  //       await updateStatus(188, caseID);
  //     } else if (status === 188 || status === 189) {
  //       //no update needed
  //     }
  //   } else {
  //     if (status === 204) {
  //       await updateStatus(208, caseID);
  //     } else if (status === 205) {
  //       await updateStatus(209, caseID);
  //     } else if (status === 206) {
  //       await updateStatus(210, caseID);
  //     } else if (status === 207) {
  //       await updateStatus(211, caseID);
  //     } else if (status === 213) {
  //       await updateStatus(212, caseID);
  //     }
  //   }
  //   const updatedUser = await getLogicsUser(caseID);
  //   setUserData(updatedUser);
  // }
  // console.log("USER DATA FROM CONTEXT BUT INIDE STATUS 3 COMP:", userData);

  return (
    <div className="dash-cont">
      <div className="row-1">
        <p className="dash-greet">
          Welcome to your Dashboard,{" "}
          <strong style={{ color: "#2e5a7e" }}>
            {userData?.data?.FirstName || ""}!
          </strong>
        </p>
      </div>
      {userData?.data?.TaxLiability > 0 ? (
        //|| userData?.yearsUnfiled >0
        <div className="row-6 alert bar-bubble">
          <div
            className="square-front"
            style={{ backgroundColor: "#eb4034", border: "#eb4034" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#0a1763"
              className="bi bi-exclamation-circle"
              viewBox="0 0 16 16"
              id="call-us-alert-icon"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <p>
              We have found details in your <strong>Tax History Report</strong>{" "}
              that require your attention immediately.
            </p>
          </div>
          <div className="square-back"></div>
        </div>
      ) : (
        <div className="row-6 alert bar-bubble">
          <div className="square-front">
            <Image
              alt={"icon"}
              src={LogoIcon}
              width={60}
              className="scale-icon"
            />
            <p>
              <span style={{ color: "#2e5a7e" }}>Congratulations! </span>
              Your Tax History Report is complete!
            </p>
          </div>
          <div className="square-back"></div>
        </div>
      )}

      <div className="row-2">
        <div className="progress-bubble">
          <div className="bubble-header break">
            <div>Tax History&nbsp;</div>
            <div> Report Progress</div>
          </div>
          <div className="square-front">
            <div className="circle-cont">
              <div className="outer-circle complete"></div>
              <div className="outer-circle complete"></div>
              <div className="outer-circle complete"></div>
              <div className="outer-circle complete"></div>

              <div className="outer-circle">
                <div className="inner-circle"></div>
              </div>

              <div className="outer-circle"></div>

              <div className="outer-circle"></div>
            </div>
            <div className="line-cont"></div>
            <div className="status-bubble">
              <p>Review Tax History Report</p>
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>

        <div className="to-do-bubble">
          <div className="square-front">
            <p className="to-do-head">To Do:</p>
            {userData?.data?.TaxLiability >= 10000 ? (
              <p className="to-do-msg">
                Your Tax Report History is complete and requires your attention!
              </p>
            ) : (
              <p className="to-do-msg">Your Tax Report History is complete!</p>
            )}
            <div id="call-us-to-do">
              CALL US @ (800)-805-3310
              <br />
              to Review Tax History Report
            </div>
          </div>
          <div className="square-back"></div>
        </div>
      </div>
      <div className="row-6 bar-bubble">
        <div className="square-front">
          <Image alt={"icon"} src={scales} width={60} className="scale-icon" />
          <p>
            Can&apos;t call now?{" "}
            <span style={{ color: "#2e5a7e" }}>
              {" "}
              <strong>
                schedule a call <br />
                with a tax specialist{" "}
              </strong>
            </span>
            to review your Tax History Report.
          </p>
          <Link href={"/cal/consult"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">SCHEDULE NOW</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div>
      <div className="row-4">
        <div className="detail-bubble">
          <div className="bubble-header break" style={{ fontSize: "30px" }}>
            Current Liability
          </div>

          <div className="square-front">
            <p className="active">
              {isLoading ? "Loading..." : userData?.currentLiability}
            </p>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
        <div className="detail-bubble">
          <div className="bubble-header break" style={{ fontSize: "30px" }}>
            Years Unfiled
          </div>

          <div className="square-front">
            <div className="active" id="sfr-in-queue-active">
              {isLoading ? "Loading..." : userData?.yearsUnfiled} Years Unfiled
              {userData?.sfrInQueue !== null && (
                <span style={{ fontSize: "25px" }}>
                  <>
                    {/* <br /> */}
                    {/* - */}
                    <br />
                    <span
                      style={{
                        color: " rgb(235, 64, 52)",
                      }}
                    >
                      {isLoading ? "Loading..." : userData?.sfrInQueue}
                    </span>
                    <br />
                    <SFRTooltip />
                  </>
                </span>
              )}
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
        <div className="detail-bubble">
          <div className="bubble-header break" style={{ fontSize: "30px" }}>
            Collection Status
          </div>

          <div className="square-front">
            <p className="active">
              {isLoading ? "Loading..." : userData?.paymentStatus}

              {/* Unpaid
              <br />
              -
              <br />
              No Payment
              <br />
              Plan Yet */}
            </p>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
      </div>
      {/* <div className="row-5 bar-bubble" style={{ marginBottom: "90px" }}>
        <div className="square-front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#0a1763"
            className="bi bi-speedometer score-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
            <path
              fillRule="evenodd"
              d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
            />
          </svg>
          <p>Check your credit score for free while you wait!</p>
          <Link href={"/credit"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">GET MY SCORE</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div> */}
    </div>
  );
};

export default Dash;
