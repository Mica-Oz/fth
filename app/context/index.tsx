/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { getActivities } from "@/app/utilities/api/activities";
// Import the User type from Stytch
import { User } from "@stytch/vanilla-js";

// Define a proper type for your context
interface AppContextType {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  loadActivities: (caseID: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppWrapperProps {
  children: React.ReactNode;
  stytchUser: User | null;
}

export function AppWrapper({
  children,
  stytchUser,
}: Readonly<AppWrapperProps>) {
  const [userData, setUserData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  // Function to load activities that can be called from components
  const loadActivities = async (caseID: string) => {
    // Check if activities are already loaded
    if (
      userData?.currentLiability ||
      userData?.paymentStatus ||
      userData?.yearsUnfiled
    ) {
      console.log("Activities already loaded, skipping...");
      return;
    }

    try {
      console.log("Loading activities for case:", caseID);
      const activities = await getActivities(caseID);

      // Handle empty or null activities
      if (!activities || Object.keys(activities).length === 0) {
        console.log("No activities found for case:", caseID);
        return;
      }

      console.log("ACTIVITIES:", activities);

      // Process activities
      interface ActivityData {
        currentLiability?: string;
        yearsUnfiled?: string;
        paymentStatus?: string;
      }
      const activityData: ActivityData = {};
      for (const key in activities) {
        const subObj = activities[key];
        if (!subObj) continue;

        for (const activityKey in subObj) {
          if (activityKey === "ActivityType") {
            switch (subObj[activityKey]) {
              case "CurrLiab":
                if (subObj["Subject"]) {
                  activityData.currentLiability = subObj["Subject"];
                }
                break;
              case "YearsUnfiled":
                if (subObj["Subject"]) {
                  activityData.yearsUnfiled = subObj["Subject"];
                }
                break;
              case "PaymentStatus":
                if (subObj["Subject"]) {
                  activityData.paymentStatus = subObj["Subject"];
                }
                break;
            }
          }
        }
      }

      // Only update if we found activity data
      if (Object.keys(activityData).length > 0) {
        interface UserData {
          currentLiability?: string;
          yearsUnfiled?: string;
          paymentStatus?: string;
          [key: string]: any; // for other potential properties in prevData
        }

        setUserData((prevData: UserData) => ({
          ...prevData,
          ...activityData,
        }));
        console.log("Activities loaded successfully:", activityData);
      } else {
        console.log("No relevant activity data found");
      }
    } catch (error) {
      console.error("Failed to load activities:", error);
      // Don't throw - just log the error so user data still loads
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Only proceed if we have a user from Stytch
      if (stytchUser && stytchUser.untrusted_metadata?.id) {
        const caseID = stytchUser.untrusted_metadata.id as string;
        try {
          // Always load user data first
          const logicsUserData = await getLogicsUser(caseID);
          console.log("CONTEXT USE EFFECT FOR GETTING USER FROM IRS LOGICS");

          setUserData(logicsUserData);

          // Try to load activities, but don't block if they fail
          setTimeout(() => {
            loadActivities(caseID);
          }, 100); // Small delay to ensure user data is set first
        } catch (error) {
          console.error("Failed to fetch user data from CRM:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [stytchUser]);

  return (
    <AppContext.Provider
      value={{ userData, setUserData, loading, loadActivities }}
    >
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
