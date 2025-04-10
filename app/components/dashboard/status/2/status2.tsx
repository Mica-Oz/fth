"use client";

import React from "react";
import Link from "next/link";
// import Image from "next/image";
// import scales from "@/public/scales-icon.png";
import { useAppContext } from "@/app/context";

const Dash = () => {
  const { userData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INIDE STATUS 2 COMP:", userData);

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
      <div className="row-2">
        <div className="progress-bubble">
          <div className="bubble-header break">
            <div>Tax History&nbsp;</div>
            <div> Report Progress</div>
          </div>
          <div className="square-front">
            <div className="circle-cont">
              <div className="outer-circle complete"></div>
              <div className="outer-circle">
                <div className="inner-circle"></div>
              </div>

              <div className="outer-circle"></div>

              <div className="outer-circle"></div>

              <div className="outer-circle"></div>

              <div className="outer-circle"></div>

              <div className="outer-circle"></div>
            </div>
            <div className="line-cont"></div>
            <div className="status-bubble">
              <p>Generating Tax History Report</p>
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>

        <div className="to-do-bubble">
          <div className="square-front">
            <p className="to-do-head">To Do:</p>
            <p className="to-do-msg">
              Sit back and relax while we generate your tax history report.
            </p>
            <p className="to-do-msg highlight">
              We will notify you by email and text when your report is ready for
              review!
            </p>
          </div>
          <div className="square-back"></div>
        </div>
      </div>
      <div className="row-3 bar-bubble long">
        <div className="square-front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#0a1763"
            className="bi bi-clipboard2-check-fill"
            viewBox="0 0 16 16"
          >
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
          </svg>
          <p>
            <span className="highlight">Get ahead on your next step!</span>{" "}
            Submit Eligibility Request Form to see what Fresh Start programs you
            are eligible for.
          </p>
          <Link href={"/dashboard/action3/1"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">CHECK ELIGIBILITY</div>
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
            <p>
              Awaiting
              <br />
              Tax
              <br />
              History
              <br /> Report
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
            <p>
              Awaiting
              <br />
              Tax
              <br />
              History
              <br /> Report
            </p>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
        <div className="detail-bubble">
          <div className="bubble-header break" style={{ fontSize: "30px" }}>
            Payment Status
          </div>

          <div className="square-front">
            <p>
              Awaiting
              <br />
              Tax
              <br />
              History
              <br /> Report
            </p>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>
      </div>
      <div className="row-5 bar-bubble" style={{ marginBottom: "90px" }}>
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
      </div>
    </div>
  );
};

export default Dash;
