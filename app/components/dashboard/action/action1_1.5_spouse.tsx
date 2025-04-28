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
        className="split-bubble-with-title action-bubble action-1-1 "
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax Form 8821</div>

        <div className="square">
          <p
            className="sub-heading"
            style={{ textIndent: "25px", marginRight: "105px" }}
          >
            On the following page, you will be asked to provide your signature
            for tax form 8821, which we will securely transmit to the IRS. This
            form allows us to contact the IRS on your behalf and pull your Tax
            History Report. <br />
            <strong>
              If you have any questions about this process, please feel free to{" "}
            </strong>
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
          {/* <p className="form-group">8821</p> */}
          <div
            className="report-cont pdf-cont"
            style={{
              overflowX: "scroll",
              position: "relative",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
            ref={containerRef}
          >
            {/* <Image alt={"icon"} src={"report"} width={800} className="icon3" /> */}
            <Image
              alt="8821"
              src="/f8821.png"
              width={1000}
              height={1224}
              className="icon3"
              // style={{
              //   width: "150%",
              //   // height: "auto",
              //   maxWidth: "100%",
              //   objectFit: "contain",
              // }}
            />
          </div>
          <Link
            href="/dashboard/action1/2/spouse"
            style={{ height: "50px !important", width: "300px !important" }}
            className="next-btn success"
          >
            SIGN NOW
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
