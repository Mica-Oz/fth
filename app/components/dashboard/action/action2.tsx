"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import updateStatus from "@/app/utilities/api/updateStatus";
import { useStytchUser } from "@stytch/nextjs";
// import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useAppContext } from "@/app/context";
import { useRouter } from "next/navigation";

const Action = () => {
  const { userData } = useAppContext();
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signedURL, setSignedURL] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      // console.log("Response data:", responseData);
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

  // console.log("USER DATA FROM CONTEXT - INSIDE ACTION2:", userData);

  async function routeToDash() {
    const status = userData?.data.StatusID;
    let fastTrack = false;
    if (status === 193) {
      fastTrack = true;
    }

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

          {isMobile ? (
            // Mobile: Show button to open PDF in new tab
            <div
              className="report-cont pdf-cont"
              style={{
                textAlign: "center",
                padding: "20px",
                height: "auto",
                overflow: "hidden",
              }}
            >
              {isLoading ? (
                <div>Loading PDF...</div>
              ) : signedURL ? (
                <button
                  onClick={() => window.open(signedURL, "_blank")}
                  style={{
                    background: "#5dacad",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    fontFamily: "Halcom, sans-serif",
                    fontWeight: "500",
                    width: "100%",
                    minWidth: "180px",
                    height: "150px",
                  }}
                >
                  VIEW REPORT
                </button>
              ) : (
                <div style={{ color: "red", fontWeight: 500 }}>
                  Report is not available. Please contact support.
                </div>
              )}
            </div>
          ) : (
            // Desktop: Show iframe directly
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
          )}

          <div className="action-btn-cont" style={{ bottom: "60px" }}>
            <button onClick={routeToDash} className="next-btn">
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
