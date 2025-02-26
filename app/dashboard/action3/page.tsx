import React from "react";
// import Nav from "@/app/components/nav";
// import FooterBlock from "@/app/components/footerBlock";
// import Bubble from "@/app/components/dashboard/action/action1_1";
import Link from "next/link";
import Nav from "@/app/components/nav";

const Action1 = () => {
  return (
    <div>
      <Nav />

      <p>action 3</p>
      <Link href={"/dashboard/status5"}>Go to status 5</Link>
    </div>
  );
};

export default Action1;
