"use client";
import React, { useEffect } from "react";
import SplitWith2 from "@/app/components/contactBubble";
import FooterDiag from "@/app/components/footerDiag";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="about-main">
        <SplitWith2 />
      </div>
      <FooterDiag />
    </>
  );
};

export default Page;
