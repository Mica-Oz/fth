/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
// Import the User type from Stytch
import { User } from "@stytch/vanilla-js"; // Adjust the import path based on your setup

// Define a proper type for your context
interface AppContextType {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Update the props type to include stytchUser
interface AppWrapperProps {
  children: React.ReactNode;
  stytchUser: User | null; // Use the proper Stytch User type
}

export function AppWrapper({
  children,
  stytchUser,
}: Readonly<AppWrapperProps>) {
  const [userData, setUserData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Only proceed if we have a user from Stytch
      if (stytchUser && stytchUser.untrusted_metadata?.id) {
        const caseID = stytchUser.untrusted_metadata.id as string;
        try {
          // Fetch from CRM and update context state
          const logicsUserData = await getLogicsUser(caseID);
          console.log("CONTEXT USE EFFECT FOR GETTING USER FROM IRS LOGICS");
          setUserData(logicsUserData);
        } catch (error) {
          console.error("Failed to fetch user data from CRM:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [stytchUser]); // Re-run when the stytchUser changes

  return (
    <AppContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
