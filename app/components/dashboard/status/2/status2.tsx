"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
// import scales from "@/public/scales-icon.png";
import { useAppContext } from "@/app/context";

const Dash = () => {
  const { userData, setUserData } = useAppContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  // console.log("USER DATA FROM CONTEXT BUT INIDE STATUS 2 COMP:", userData);

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
      <div className="row-6 bar-bubble compliance">
        <div className="square-front">
          {showTooltip && (
            <span
              ref={tooltipRef}
              id={"compliance-tip"}
              style={{
                position: "absolute",
                top: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                border: "1px solid #2e5a7e",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                width: "700px",
                marginTop: "8px",
                animation: "slideDown 0.3s ease-out forwards",
                color: "#333",
                lineHeight: "1.5",
                textAlign: "left",
                fontFamily: "filson-soft, sans-serif",
                fontStyle: "normal",
                fontSize: "16px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTooltip(false)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
                aria-label="Close tooltip"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
              <strong
                style={{
                  color: "#2e5a7e",
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "800",
                }}
              >
                What&apos;s included in your plan?
              </strong>
              Your Compliance Plan includes a 30 minute call with one of our top
              of the line tax specialists, who will go over with you in detail
              what steps you need to take to become compliant with the IRS. You
              will leave the call with a sense of empowerment and a clear
              step-by-step plan tailored to your unique situation, outlining
              exactly what you need to do to minimize penalties and get back on
              the right track with the IRS. Our specialists have extensive
              experience in dealing with the IRS and will provide you with
              expert guidance and support throughout the process. Don&apos;t
              wait until it&apos;s too late—get your personalized compliance
              plan today and take the first step towards financial peace of
              mind.
              {/* <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid #2e5a7e",
                }}
              /> */}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="red"
            className="bi bi-exclamation-diamond"
            viewBox="0 0 16 16"
          >
            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          <p>
            The IRS is already calculating penalties on your unfiled years.
            Interest accrues daily. For only $50, our tax specialists will give
            you a
            <span
              ref={triggerRef}
              onClick={() => setShowTooltip(!showTooltip)}
              style={{
                color: "#2e5a7e",
                cursor: "pointer",
                position: "relative",
                display: "inline",
              }}
            >
              {" "}
              <strong>clear, personalized plan </strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
                style={{ marginLeft: "0px", marginRight: "10px" }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </span>
            to become compliant—before enforcement action begins.{" "}
          </p>
          <Link
            href={"/dashboard/complianceplan"}
            style={{ marginLeft: "auto" }}
          >
            <div className="learn-more-btn">GET COMPLIANCE PLAN</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      <div className="row-2" style={{ zIndex: 1 }}>
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
      {/* <div className="row-3 bar-bubble">
        <div className="square-front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#0a1763"
            className="bi bi-patch-question"
            viewBox="0 0 16 16"
          >
            <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />
            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
          </svg>

          <p>Wondering what a Tax History Report will show you?</p>
          <Link href={"/about"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">LEARN MORE</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div> */}
      {/* commented out until i can secure the flow/status situation */}
      {userData?.data.StatusID != "192" && (
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
              Submit Eligibility Request Form to see what Fresh Start programs
              you are eligible for.
            </p>
            <Link
              href={"/dashboard/action3/1"}
              style={{ marginLeft: "auto" }}
              onClick={() =>
                setUserData((prev: typeof userData) => ({
                  ...prev,
                  eligibilityStarted: true,
                }))
              }
            >
              <div className="learn-more-btn">CHECK ELIGIBILITY</div>
            </Link>
          </div>
          <div className="square-back"></div>
        </div>
      )}
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
            Collection Status
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
    </div>
  );
};

export default Dash;
