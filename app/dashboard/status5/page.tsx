// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash5 from "@/app/components/dashboard/status/5/status5";
import Nav from "@/app/components/nav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash5 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
