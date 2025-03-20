// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
"use client";
import FooterBlock from "@/app/components/footerBlock";
import Dash1 from "@/app/components/dashboard/status/1/status1";
import Nav from "@/app/components/nav";
// import { useAppContext } from "@/app/context";

const Authenticate = () => {
  // const { userData } = useAppContext();

  // const statusDict = {
  //   "183": Dash1,
  // };
  // const status = userData.data.StatusID;
  // let curView = statusDict[status]

  return (
    <div>
      <Nav />
      <Dash1 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
