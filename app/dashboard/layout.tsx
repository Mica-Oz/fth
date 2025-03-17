"use client";
import React from "react";
import PrivateRoute from "../components/privateRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PrivateRoute>
        <div>{children}</div>
      </PrivateRoute>
    </>
  );
};

export default Layout;
