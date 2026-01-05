"use client";
import React, { useEffect } from "react";
import AdminMain from "@/app/components/admin/main";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="admin-main">
        <AdminMain />
      </div>
    </>
  );
};

export default Page;
