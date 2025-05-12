import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubbleBook from "@/app/components/thrSuccessBubbleBook";
const THRSuccess = () => {
  return (
    <div className="await-auth-main">
      <THRSuccessBubbleBook />
      <FooterDiag page={"awaitauth"} />
    </div>
  );
};

export default THRSuccess;
