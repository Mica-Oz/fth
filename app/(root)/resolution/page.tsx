"use client";
import React, { useEffect } from "react";
import SplitWith2 from "@/app/components/resBubble";
import FooterDiag from "@/app/components/footerDiag";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="about-main resolution">
        <SplitWith2 />
      </div>
      <FooterDiag page={"resolution"} />
    </>
  );
};

export default Page;
