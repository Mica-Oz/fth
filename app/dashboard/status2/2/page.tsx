// import React, { useEffect } from "react";
// import { useStytch, useStytchSession } from "@stytch/nextjs";
import FooterBlock from "@/app/components/footerBlock";
import Dash2_2 from "@/app/components/dashboard/status/2/status2_2";
import Nav from "@/app/components/nav";

const Authenticate = () => {
  return (
    <div>
      <Nav />
      <Dash2_2 />
      <FooterBlock />
    </div>
  );
};

export default Authenticate;
