import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubble from "@/app/components/thrSuccessBubble";
const THRSuccess = () => {
  return (
    <div className="await-auth-main">
      <THRSuccessBubble />
      <FooterDiag page={"awaitauth"} />
    </div>
  );
};

export default THRSuccess;
