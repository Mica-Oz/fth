"use client";
import React, { useEffect } from "react";
import blur3 from "@/public/blurbg3.jpg";
// import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const SplitWith2 = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div
        className="split-bubble-with-title auth-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble auth">Success</div>
        <div
          className="box-pic"
          id="resBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont" style={{ paddingTop: "25px" }}>
            <h3>Tax History Report Successfully Requested!</h3>
            <p style={{ marginTop: "35px" }}>
              <strong>You&apos;re on your way </strong>
              to getting your Free Tax History Report
            </p>
          </div>
          <Link
            href="/dashboard/status1"
            style={{ width: "450px" }}
            className="next-btn"
          >
            GO TO DASHBOARD
          </Link>
        </div>
        <div className="header-bubble-back auth"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
