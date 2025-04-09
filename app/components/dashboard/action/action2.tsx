"use client";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
// import report from "@/public/report.png";
import updateStatus from "@/app/utilities/api/updateStatus";
import { useStytchUser } from "@stytch/nextjs";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useAppContext } from "@/app/context";

const Action = () => {
  const { userData, setUserData } = useAppContext();
  const { user } = useStytchUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caseID = user?.untrusted_metadata.id as string;

  console.log("USER DATA FROM CONTEXT BUT INIDE Action2 COMP:", userData);

  async function acknowledge() {
    await updateStatus(188, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
  }
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action-2"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax History Report</div>

        <div className="square">
          <p className="sub-heading">
            Here is your Tax History Report! If you have any questions about
            your report, <br />
            please{" "}
            <Link
              href={"/contact"}
              style={{
                color: "#5dacad",
                textDecoration: "underline 2px #5dacad",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              contact support.
            </Link>
          </p>
          <p className="form-group">Report</p>
          <div className="report-cont">
            {/* <Image alt={"icon"} src={"report"} width={800} className="icon3" /> */}
            <iframe
              // src={"https://fththr001.s3.us-west-1.amazonaws.com/10127.pdf"}
              src="https://docs.google.com/viewer?url=https://fththr001.s3.us-west-1.amazonaws.com/10127.pdf&embedded=true"
              width={"100%"}
              height={300}
              className="icon3"
            ></iframe>
          </div>
          <Link
            href="/dashboard/status4"
            onClick={acknowledge}
            style={{ width: "450px" }}
            className="next-btn"
          >
            BACK TO DASHBOARD
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
