"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import updateStatus from "@/app/utilities/api/updateStatus";
import { useStytchUser } from "@stytch/nextjs";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useAppContext } from "@/app/context";
import { useRouter } from "next/navigation";

const Action = () => {
  const { userData, setUserData } = useAppContext();
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signedURL, setSignedURL] = useState("");
  const router = useRouter();

  async function handleGetURL(caseID: string) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          caseID: caseID || "",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setSignedURL(""); // No report
          return { error: "not_found" };
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      return responseData; // Return the response data
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchURL = async () => {
      const responseData = await handleGetURL(caseID);
      if (responseData?.data?.uploadURL) {
        setSignedURL(responseData.data.uploadURL);
      }
    };

    fetchURL();
  }, [caseID]);

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
    const status = userData?.data.StatusID;
    let fastTrack = false;
    if (status === 193) {
      fastTrack = true;
    }

    //if fast track
    if (fastTrack === true) {
      await updateStatus(189, caseID);
    } else if (status === 187) {
      await updateStatus(188, caseID);
    } else if (status === 188 || status === 189) {
      //no update needed
    }
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);

    if (fastTrack === true) {
      router.push("/dashboard/status6");
    } else if (status === 187 || status === 188) {
      router.push("/dashboard/status4");
    } else if (status === 189) {
      router.push("/dashboard/status6");
    } else if (status === 191) {
      router.push("/dashboard/status7");
    }
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
            {isLoading ? (
              <div>Loading PDF...</div>
            ) : signedURL ? (
              <iframe
                ref={iframeRef}
                src={`${signedURL}#toolbar=0`}
                width={"100%"}
                height={300}
                className="icon3"
              ></iframe>
            ) : (
              <div style={{ color: "red", fontWeight: 500 }}>
                Report is not available. Please contact support.
              </div>
            )}
          </div>
          <div className="action-btn-cont">
            <button onClick={acknowledge} className="next-btn">
              BACK TO DASHBOARD
            </button>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action;
