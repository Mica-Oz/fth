"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import scales from "@/public/scales-icon.png";
import { useAppContext } from "@/app/context";

const Dash = () => {
  const { userData, setUserData } = useAppContext();
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
              <p>Spouse 8821 Needs Re-Sign</p>
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>

        <div className="to-do-bubble">
          <div className="square-front">
            <p className="to-do-head">To Do:</p>
            <p className="to-do-msg">
              Your spouse&apos;s signature was not Accepted by the IRS.{" "}
            </p>
            <Link
              href="/dashboard/action1/2/spouse"
              className="tax-history-req-btn"
            >
              RE-SIGN <br />
              NOW
            </Link>
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
      <div className="row-6 bar-bubble">
        <div className="square-front">
          <Image alt={"icon"} src={scales} width={60} className="scale-icon" />
          <p>
            Looking for Tax Resolution? Schedule a{" "}
            <span style={{ color: "#2e5a7e" }}>
              {" "}
              <strong>
                free 15 minute <br />
                consultation{" "}
              </strong>
            </span>
            with our team of tax specialists.
          </p>
          <Link href={"/cal/consult"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">SCHEDULE NOW</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div>
    </div>
  );
};

export default Dash;
