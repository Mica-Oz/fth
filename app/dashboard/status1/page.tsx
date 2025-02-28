// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash1 from "@/app/components/dashboard/status/1/status1";
import Nav from "@/app/components/authNav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash1 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
