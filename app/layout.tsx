"use client";
import { AppWrapper } from "@/app/context";
// import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { StytchProvider } from "@stytch/nextjs";
import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
const stytch = createStytchHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

// export const metadata: Metadata = {
//   title: "FreeTaxHistory.com",
//   description: "Get your Free Tax History Report",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StytchProvider stytch={stytch}>
          <AppWrapper>{children}</AppWrapper>
        </StytchProvider>
        <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" />
      </body>
    </html>
  );
}
