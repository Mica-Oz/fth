"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useStytchUser } from "@stytch/nextjs";
import { useAppContext } from "@/app/context";
import Image from "next/image";
import updateStatus from "@/app/utilities/api/updateStatus";

const Action = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userData } = useAppContext();
  const { user } = useStytchUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caseID = user?.untrusted_metadata.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log("USER DATA FROM CONTEXT - INSIDE ACTION2:", userData);

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

    // Prevent scrolling when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up event listeners on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "contextmenu",
          handleRightClick
        );
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Modal */}
      {isModalOpen ? (
        <div
          className="split-bubble-with-title tax-form open action-bubble action-1-1"
          // data-aos="fade-right"
          // data-aos-delay="150"
        >
          <div className="header-bubble">Tax Form 8821</div>

          <div className="square">
            <div className="tax-form-cont">
              <div className="close-btn-cont">
                <button onClick={closeModal}>×</button>
              </div>
              <div ref={containerRef}>
                <Image
                  alt="8821"
                  src="/f8821.png"
                  width={600}
                  height={800}
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            <div className="action-btn-cont">
              <Link
                href="/dashboard/action1/2"
                style={{ height: "50px !important", width: "300px !important" }}
                className="next-btn success"
                onClick={async () => {
                  await updateStatus(199, caseID);
                }}
              >
                SIGN NOW
              </Link>
            </div>
          </div>
          <div className="header-bubble-back"></div>
          <div className="back-square"></div>
        </div>
      ) : (
        <div
          className="split-bubble-with-title tax-form action-bubble action-1-1"
          // data-aos="fade-right"
          // data-aos-delay="150"
        >
          <div className="header-bubble">Tax Form 8821</div>

          <div className="square">
            <p className="sub-heading" style={{ textIndent: "25px" }}>
              On the following page, you will be asked to provide your signature
              for{" "}
              <strong
                style={{
                  color: "#5dacad",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={openModal}
              >
                {" "}
                Tax Form 8821
              </strong>{" "}
              , which we will securely transmit to the IRS. This form allows us
              to contact the IRS on your behalf and pull your Tax History
              Report. By clicking &quot;SIGN NOW&quot; and agreeing to the terms
              on the next page you are acknowledging and consenting to this.{" "}
              <br />
              <strong>
                If you have any questions about this process, please feel free
                to{" "}
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

            <div className="action-btn-cont">
              <Link
                href="/dashboard/action1/2"
                style={{ height: "50px !important", width: "300px !important" }}
                className="next-btn success"
                onClick={async () => {
                  await updateStatus(199, caseID);
                }}
              >
                SIGN NOW
              </Link>
            </div>
          </div>
          <div className="header-bubble-back"></div>
          <div className="back-square"></div>
        </div>
      )}
    </>
  );
};

export default Action;
