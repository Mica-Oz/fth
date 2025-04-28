"use client";

import { StytchProvider, useStytchUser } from "@stytch/nextjs";
import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
import { AppWrapper } from "@/app/context";

const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

// Separate inner component that uses the hook
function StytchContent({ children }: { children: React.ReactNode }) {
  const { user } = useStytchUser();
  return <AppWrapper stytchUser={user}>{children}</AppWrapper>;
}

// Main wrapper that provides the Stytch context
export function StytchWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StytchProvider stytch={stytch}>
      <StytchContent>{children}</StytchContent>
    </StytchProvider>
  );
}
