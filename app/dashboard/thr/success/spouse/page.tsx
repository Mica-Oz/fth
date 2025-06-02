import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubbleSpouse from "@/app/components/thrSuccessBubbleSpouse";
import Nav from "@/app/components/nav";
const THRSuccess = () => {
  return (
    <>
      <Nav />
      <div className="await-auth-main">
        <THRSuccessBubbleSpouse />
        <FooterDiag page={"awaitauth"} />
      </div>
    </>
  );
};

export default THRSuccess;
