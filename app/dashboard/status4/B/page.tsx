// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash4 from "@/app/components/dashboard/status/4/status4-B";
import Nav from "@/app/components/nav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash4 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
