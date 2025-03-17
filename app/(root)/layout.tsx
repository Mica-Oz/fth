"use client";
import React from "react";
import Nav from "@/app/components/nav";
// import { StytchProvider } from "@stytch/nextjs";
// import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
// const stytch = createStytchHeadlessClient(
//   process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
// );

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <StytchProvider stytch={stytch}> */}
      <Nav />

      <div>{children}</div>
      {/* </StytchProvider> */}
    </>
  );
};

export default Layout;
