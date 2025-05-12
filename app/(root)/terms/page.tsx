// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
"use client";
import FooterBlock from "@/app/components/footerBlock";
import TermsAndPrivacy from "@/app/components/termsAndConditions";

// import { useAppContext } from "@/app/context";

const Terms = () => {
  // const { userData } = useAppContext();

  // const statusDict = {
  //   "183": Dash1,
  // };
  // const status = userData.data.StatusID;
  // let curView = statusDict[status]

  return (
    <div>
      <TermsAndPrivacy />
      <FooterBlock />
    </div>
  );
};

export default Terms;
