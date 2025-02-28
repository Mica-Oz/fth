// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash3 from "@/app/components/dashboard/status/3/status3";
import Nav from "@/app/components/authNav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash3 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
