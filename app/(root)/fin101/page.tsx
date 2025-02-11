"use client";
import React, { useEffect } from "react";
import Bubble from "@/app/components/fin101Bubble";
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
        <Bubble />
      </div>
      <FooterDiag />
    </>
  );
};

export default Page;
