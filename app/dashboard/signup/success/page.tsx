import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import SignupSuccessBubble from "@/app/components/singupSuccessBubble";

const SignupSuccess = () => {
  return (
    <div className="await-auth-main">
      <SignupSuccessBubble />
      <FooterDiag page={"awaitauth"} />
    </div>
  );
};

export default SignupSuccess;
