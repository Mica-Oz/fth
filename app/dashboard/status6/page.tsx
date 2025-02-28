// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash6 from "@/app/components/dashboard/status/6/status6";
import Nav from "@/app/components/authNav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash6 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
