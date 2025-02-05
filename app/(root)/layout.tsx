"use client";
import React from "react";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
import Nav from "@/app/components/nav";
const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StytchProvider stytch={stytch}>
      <Nav />
      <div>{children}</div>
    </StytchProvider>
  );
};

export default layout;
