"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import AuthContext from '../context/authContext';
// import { useAppContext } from "@/app/context";
import { useStytchSession } from "@stytch/nextjs";

function PrivateRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { userData } = useAppContext();
  const { session } = useStytchSession();
  const router = useRouter();
  console.log("session from private route:", session);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return session ? children : null;
}

export default PrivateRoute;
