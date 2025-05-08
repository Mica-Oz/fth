import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import CalBubble from "@/app/components/calConsultBubble";

const ConsultCal = () => {
  return (
    <div className="await-auth-main">
      <CalBubble />
      <FooterDiag page={"cal"} />
    </div>
  );
};

export default ConsultCal;
