"use client";
import React, { useEffect } from "react";
import blur3 from "@/public/blurbg3.jpg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

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
        <div className="header-bubble auth">Verify Your Account</div>
        <div
          className="box-pic"
          id="resBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont" style={{ paddingTop: "25px" }}>
            <h3>We have sent a verification link to your email!</h3>
            <p style={{ marginTop: "35px" }}>
              <strong>To complete logging in, </strong>
              please navigate to your email inbox and click the verification
              link we sent you.
            </p>

            <p style={{ fontSize: "16px" }}>
              If you are having trouble locating your verification link, please{" "}
              <Link href={"/contact"}>contact support.</Link>
            </p>
          </div>
        </div>
        <div className="header-bubble-back auth"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
