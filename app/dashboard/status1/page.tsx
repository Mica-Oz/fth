// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
"use client";
import FooterBlock from "@/app/components/footerBlock";
import Dash1 from "@/app/components/dashboard/status/1/status1";
import Nav from "@/app/components/authNav";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

const Authenticate = () => {
  return (
    <StytchProvider stytch={stytch}>
      <div>
        <Nav />

        <Dash1 />
        <FooterBlock />
      </div>
    </StytchProvider>
  );
};

export default Authenticate;
