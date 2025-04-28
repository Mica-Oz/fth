import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import THRSuccessBubbleSpouse from "@/app/components/thrSuccessBubbleBusiness";
const THRSuccess = () => {
  return (
    <div className="await-auth-main">
      <THRSuccessBubbleSpouse />
      <FooterDiag page={"awaitauth"} />
    </div>
  );
};

export default THRSuccess;
