"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import updateStatus from "@/app/utilities/api/updateStatus";
import { useStytchUser } from "@stytch/nextjs";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useAppContext } from "@/app/context";

const Action = () => {
  const { userData, setUserData } = useAppContext();
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  console.log("USER DATA FROM CONTEXT - INSIDE ACTION2:", userData);
  useEffect(() => {
    // Handle only right-click on the container
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block specific keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S, Ctrl+P, Ctrl+Shift+E, etc.
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "p" || e.key === "e")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners directly to container instead of using an overlay
    if (containerRef.current) {
      containerRef.current.addEventListener("contextmenu", handleRightClick);
    }

    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "contextmenu",
          handleRightClick
        );
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  async function acknowledge() {
    await updateStatus(188, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
  }
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1 action-2"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax History Report</div>

        <div className="square">
          <p className="sub-heading">
            Here is your Tax History Report! If you have any questions about
            your report, <br />
            please{" "}
            <Link
              href={"/contact"}
              style={{
                color: "#5dacad",
                textDecoration: "underline 2px #5dacad",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              contact support.
            </Link>
          </p>
          <p className="form-group">Report</p>
          <div
            className="report-cont pdf-cont"
            style={{ overflow: "hidden", position: "relative" }}
            ref={containerRef}
          >
            {/* <Image alt={"icon"} src={"report"} width={800} className="icon3" /> */}
            <iframe
              ref={iframeRef}
              src={
                "https://fththr001.s3.us-west-1.amazonaws.com/10127.pdf#toolbar=0"
              }
              // src="https://docs.google.com/viewer?url=https://fththr001.s3.us-west-1.amazonaws.com/10127.pdf&embedded=true"
              width={"100%"}
              height={300}
              className="icon3 "
            ></iframe>
          </div>
          <Link
            href="/dashboard/status4"
            onClick={acknowledge}
            className="next-btn"
          >
            BACK TO DASHBOARD
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
