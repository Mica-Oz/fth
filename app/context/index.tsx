/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable prefer-const */
import { createContext, useContext, useState } from "react";

// type Context = {};
//<Context>

const AppContext = createContext<any>(undefined);

export function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let [userData, setUserData] = useState(undefined);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
