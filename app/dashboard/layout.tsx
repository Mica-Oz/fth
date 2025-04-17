"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStytchSession } from "@stytch/nextjs";

function PrivateRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, isInitialized } = useStytchSession();
  const router = useRouter();
  console.log(
    "session from private route:",
    session,
    "initialized:",
    isInitialized
  );

  useEffect(() => {
    // Only redirect if Stytch has finished initializing and there's no session
    if (isInitialized && !session) {
      router.push("/login");
    }
  }, [session, isInitialized, router]);

  // Show loading or nothing while initializing
  if (!isInitialized) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return session ? children : null;
}

export default PrivateRoute;
