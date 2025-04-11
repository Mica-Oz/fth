"use client";
import React, { useEffect } from "react";
import SplitWith from "@/app/components/splitBubbleWTitle";
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
        <SplitWith />
      </div>
      <FooterDiag page={"about"} />
    </>
  );
};

export default Page;
