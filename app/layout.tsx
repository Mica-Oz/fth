import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreeTaxHistory.com",
  description: "Get your Free Tax History Report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" />
      </body>
    </html>
  );
}
