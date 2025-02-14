import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import AwaitBubble from "@/app/components/awaitauthBubble";

const Awaitauth = () => {
  return (
    <div className="await-auth-main">
      <AwaitBubble />
      <FooterDiag />
    </div>
  );
};

export default Awaitauth;
