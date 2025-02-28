import React from "react";
import Link from "next/link";
import Image from "next/image";
import report from "@/public/report.png";

const Action = () => {
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1"
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
            <Image alt={"icon"} src={report} width={800} className="icon3" />
          </div>
          <Link
            href="/dashboard/status4"
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
