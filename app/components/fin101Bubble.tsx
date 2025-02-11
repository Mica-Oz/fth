import React from "react";
import blur3 from "@/public/blurbg3.jpg";

const SplitWith2 = () => {
  return (
    <>
      <div
        className="split-bubble-with-title fin101-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">FIN101</div>
        <div
          className="box-pic"
          id="resBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <h3>Financial Literacy for Everyone</h3>
            <p style={{ marginTop: "15px" }}>
              <strong>
                FIN101 is FreeTaxHistory.com’s platform for financial literacy.{" "}
              </strong>
              We offer tutorials, courses, seminars, and tons of exclusive
              content that will help you become the financial wizard you are
              meant to be!
            </p>
            <p style={{ marginTop: "10px" }}>
              It’s never too late to invest in yourself and grow your wealth!
            </p>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
