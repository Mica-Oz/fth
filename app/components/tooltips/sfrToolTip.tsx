import React, { useState, useEffect } from "react";

const SFRTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Close tooltip on any click
  useEffect(() => {
    if (showTooltip) {
      const handleClick = () => setShowTooltip(false);
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showTooltip]);

  const handleIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill=" rgb(235, 64, 52)"
        viewBox="0 0 16 16"
        style={{ cursor: "pointer" }}
        onClick={handleIconClick}
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
      </svg>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "-255px",
            left: "-135px",
            width: "300px",
            padding: "20px",
            backgroundColor: "#e2f1f1",
            border: "3px solid #0a1763",
            borderRadius: "50px",
            zIndex: 9999,
            fontSize: "14px",
            color: "#0a1763",
            textAlign: "center",
          }}
        >
          {/* <div style={{ fontWeight: "500", marginBottom: "12px" }}>
            What is an SFR?
          </div> */}
          <div style={{ marginBottom: "12px", fontWeight: "500" }}>
            An SFR (Substitute for Return) occurs when the IRS identifies a
            filing requirement but never receives your tax returns. In response,
            they will prepare returns on your behalf. However, these substitute
            returns are filed at the highest tax bracket regardless of your
            actual income, and they exclude all deductions, credits, write-offs,
            and expenses—ensuring you owe the maximum possible amount.
          </div>
          <div style={{ fontWeight: "500" }}>
            It&apos;s crucial to address this situation and file your actual
            returns before the IRS completes their substitute filings. Call
            (800) 805-3310 to speak with a representative about your options.
          </div>
        </div>
      )}
    </span>
  );
};

export default SFRTooltip;
