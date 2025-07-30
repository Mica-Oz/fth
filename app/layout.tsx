import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { StytchWrapper } from "@/app/components/stytchWrapper";
import Chat from "@/app/components/chat/component";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata = {
  title: "FreeTaxHistory.com",
  description: "Your confidential IRS tax report.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WLQBF98S" />
      <body>
        <AuthProvider>
          <StytchWrapper>{children}</StytchWrapper>
        </AuthProvider>

        <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" />
        <Chat />
      </body>
    </html>
  );
}
