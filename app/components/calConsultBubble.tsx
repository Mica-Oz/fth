"use client";
import React, { useEffect } from "react";
import blur3 from "@/public/blurbg3.jpg";
// import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Cal from "@/app/components/calConsult";

const SplitWith2 = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div
        className="split-bubble-with-title cal-consult-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble auth">Book a Consultation!</div>
        <div
          className="box-pic"
          id="resBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <Cal />
          </div>
        </div>
        <div className="header-bubble-back auth"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
