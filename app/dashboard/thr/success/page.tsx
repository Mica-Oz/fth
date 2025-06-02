import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubble from "@/app/components/thrSuccessBubble";
import Nav from "@/app/components/nav";
const THRSuccess = () => {
  return (
    <>
      <Nav />
      <div className="await-auth-main">
        <THRSuccessBubble />
        <FooterDiag page={"awaitauth"} />
      </div>
    </>
  );
};

export default THRSuccess;
