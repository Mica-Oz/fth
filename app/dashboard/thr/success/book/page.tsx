import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubbleBook from "@/app/components/thrSuccessBubbleBook";
import Nav from "@/app/components/nav";
const THRSuccess = () => {
  return (
    <>
      <Nav />
      <div className="await-auth-main">
        <THRSuccessBubbleBook />
        <FooterDiag page={"awaitauth"} />
      </div>
    </>
  );
};

export default THRSuccess;
