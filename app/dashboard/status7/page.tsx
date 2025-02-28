// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash7 from "@/app/components/dashboard/status/7/status7";
import Nav from "@/app/components/authNav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash7 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
