"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import scales from "@/public/scales-icon.png";
import LogoIcon from "@/public/fth-logo-icon-new.png";
import { useAppContext } from "@/app/context";
import { getActivities } from "@/app/utilities/api/activities";
import { useStytchUser } from "@stytch/nextjs";

const Dash = () => {
  const { userData, setUserData } = useAppContext();
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id as string;
  async function loadActivities() {
    const activities = await getActivities(caseID);
    console.log("ACTIVITIES:", activities);
    for (const key in activities) {
      const subObj = activities[key];
      for (const key in subObj) {
        if (key === "ActivityType" && subObj[key] === "CurrLiab") {
          console.log("activitytype:", subObj[key]);
          console.log("Subject", subObj["Subject"]);
          const currentLiability = subObj["Subject"];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUserData((prevData: any) => ({
            ...prevData,
            currentLiability,
          }));
        } else if (key === "ActivityType" && subObj[key] === "YearsUnfiled") {
          console.log("activitytype:", subObj[key]);
          console.log("Subject", subObj["Subject"]);
          const yearsUnfiled = subObj["Subject"];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUserData((prevData: any) => ({
            ...prevData,
            yearsUnfiled,
          }));
        } else if (key === "ActivityType" && subObj[key] === "PaymentStatus") {
          console.log("activitytype:", subObj[key]);
          console.log("Subject", subObj["Subject"]);
          const paymentStatus = subObj["Subject"];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUserData((prevData: any) => ({
            ...prevData,
            paymentStatus,
          }));
        }
      }
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  console.log("USER DATA FROM CONTEXT BUT INIDE STATUS 4 COMP:", userData);

  return (
    <div className="dash-cont">
      <div className="row-1">
        <p className="dash-greet">
          Welcome to your Dashboard,{" "}
          <strong style={{ color: "#2e5a7e" }}>
            {userData?.data.FirstName}!
          </strong>
        </p>
      </div>
      <div className="row-6 alert bar-bubble">
        <div className="square-front">
          <Image
            alt={"icon"}
            src={LogoIcon}
            width={60}
            className="scale-icon"
          />
          <p style={{ width: "100%" }}>
            <span style={{ color: "#2e5a7e" }}>Congratulations! </span>
            You are eligible for several Fresh Start Relief Programs!
          </p>
        </div>
        <div className="square-back"></div>
      </div>
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

              <div className="outer-circle complete"></div>

              <div className="outer-circle">
                <div className="inner-circle"></div>
              </div>

              <div className="outer-circle"></div>
            </div>
            <div className="line-cont"></div>
            <div className="status-bubble">
              <p>View Your Eligibility</p>
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>

        <div className="to-do-bubble">
          <div className="square-front">
            <p className="to-do-head">To Do:</p>
            <p className="to-do-msg">
              You are Eligible for multiple Fresh Start Payment Plans!
            </p>
            <Link href="/cal/consult" className="tax-history-req-btn rep">
              CONTACT OUR REPS
              <br />
              TO REVIEW PLANS
            </Link>
          </div>
          <div className="square-back"></div>
        </div>
      </div>
      <div className="row-3 bar-bubble">
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
          <Link href={"/dashboard/action2"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">VIEW HERE</div>
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
            <p className="active">{userData?.currentLiability || ""}</p>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
        <div className="detail-bubble">
          <div className="bubble-header break" style={{ fontSize: "30px" }}>
            Years Unfiled
          </div>

          <div className="square-front">
            <p className="active">
              {userData?.yearsUnfiled || ""}
              <br />
              Unfiled
            </p>
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
              {userData?.paymentStatus || ""}
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
