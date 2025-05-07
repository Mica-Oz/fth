/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import scales from "@/public/scales-icon.png";
import { useStytchUser } from "@stytch/nextjs";
import { useAppContext } from "@/app/context";

const Dash = () => {
  const { isInitialized } = useStytchUser();
  // const { session } = useStytchSession();
  const { userData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INIDE STATUS 1 COMP:", userData);
  // console.log("USER SESSION INIDE STATUS 1 COMP:", session);

  console.log(
    "At render time - isInitialized:",
    isInitialized,
    "userData:",
    userData
  );
  const result = (
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
            <div>Tax History </div>
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
              <p style={{ color: "#2e5a7e" }}>Step 1 Part 2:</p>
              <p>Request Business Tax History Report</p>
            </div>
          </div>
          <div className="bubble-header-back"></div>
          <div className="square-back"></div>
        </div>

        <div className="to-do-bubble">
          <div className="square-front">
            <p className="to-do-head">To Do:</p>
            <p className="to-do-msg">
              Fill out Tax History Report Request Form{" "}
            </p>
            <Link
              href="/dashboard/action1/1/business"
              className="tax-history-req-btn"
            >
              REQUEST BUSINESS <br />
              TAX HISTORY REPORT
            </Link>
          </div>
          <div className="square-back"></div>
        </div>
      </div>
      <div className="row-3 bar-bubble">
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
      {/* <div className="row-5 bar-bubble">
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
            with our team of tax lawyers.
          </p>
          <Link href={"/contact"} style={{ marginLeft: "auto" }}>
            <div className="learn-more-btn">SCHEDULE NOW</div>
          </Link>
        </div>
        <div className="square-back"></div>
      </div>
    </div>
  );
  console.log(
    "Before returning - isInitialized - isInitialized:",
    isInitialized,
    "caseID:",
    userData?.data.CaseID
  );
  return result;
};

export default Dash;
