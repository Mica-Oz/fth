"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useStytchUser } from "@stytch/nextjs";
import { useAppContext } from "@/app/context";
import Image from "next/image";

const Action = () => {
  const { userData } = useAppContext();
  const { user } = useStytchUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caseID = user?.untrusted_metadata.id as string;
  const containerRef = useRef<HTMLDivElement>(null);

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
            <Image
              alt="8821"
              src="/f8821.png"
              width={600}
              height={764}
              className="icon3 "
            ></Image>
          </div>
          <Link
            href="/dashboard/action1/2"
            style={{ width: "450px" }}
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
