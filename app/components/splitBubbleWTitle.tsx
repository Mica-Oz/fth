import React from "react";
import blur3 from "@/public/blurbg3.jpg";

const SplitWith = () => {
  return (
    <>
      <div
        className="split-bubble-with-title"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">About</div>
        <div
          className="box-pic"
          id="aboutBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <h3>What is a Tax History Report?</h3>
            <p>
              <strong>A tax history report from the IRS </strong>provides a
              detailed overview of your tax records, including all filed
              returns, payments made, outstanding balances, penalties, and
              interest accrued over time. This report gives you a comprehensive
              look at your tax obligations, showing any discrepancies,
              adjustments, or unresolved issues with the IRS. It also includes
              information about your account status, such as whether you have
              any liens, levies, or audits in progress. Reviewing your tax
              history report helps you understand your current tax position,
              identify potential areas for resolution, and ensure that your
              records are accurate and up-to-date, providing you with the
              necessary information to address any outstanding tax matters.
            </p>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith;
