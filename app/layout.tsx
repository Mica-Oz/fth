"use client";
import { AppWrapper } from "@/app/context";
import Script from "next/script";
import "./globals.css";
import { StytchProvider, useStytchUser } from "@stytch/nextjs";
import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
import { GoogleTagManager } from "@next/third-parties/google";

const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

// Create an intermediate component that will use the Stytch hook
function AppWithStytch({ children }: { children: React.ReactNode }) {
  const { user } = useStytchUser();

  return <AppWrapper stytchUser={user}>{children}</AppWrapper>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WLQBF98S" />
      <body>
        <StytchProvider stytch={stytch}>
          <AppWithStytch>{children}</AppWithStytch>
        </StytchProvider>
        <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" />
      </body>
    </html>
  );
}
