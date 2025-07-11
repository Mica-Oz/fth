"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "@/app/utilities/pdf/trimCanvas";
import { PDFDocument } from "pdf-lib";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import updateStatus from "@/app/utilities/api/updateStatus";
import getLogicsUser from "@/app/utilities/api/getLogicsUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// Define schema for the form
const createAction1_2_Schema = () => {
  return z.object({
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms & Conditions",
    }),
  });
};

const Action1_2 = () => {
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INSIDE Action1/2 COMP:", userData);
  const sigCanvas = useRef(null);
  const { user } = useStytchUser();
  const caseID = user?.untrusted_metadata.id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureError, setSignatureError] = useState("");

  // Create the schema
  const schema = createAction1_2_Schema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  function clear() {
    console.log(" sigCanvas.current:", sigCanvas.current);
    sigCanvas.current.clear();
    setSignatureError("");
  }

  function undo() {
    console.log(" sigCanvas.current:", sigCanvas.current);
    let data = sigCanvas.current.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      sigCanvas.current.fromData(data);
    }
  }

  // Check if signature pad has data
  function hasSignature() {
    return sigCanvas.current && !sigCanvas.current.isEmpty();
  }

  async function fetchSpouse(caseID) {
    try {
      const response = await fetch("/api/spouse", {
        method: "GET",
        headers: {
          contentType: "application/pdf",
          caseID: caseID,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Get request submitted successfully---- response in front end::",
        data
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch spouse data");
    }
  }

  async function logicsPdfUpload(pdf, caseID) {
    if (pdf) {
      console.log("pdf:", pdf);
      try {
        const response = await fetch("/api/pdf", {
          method: "POST",
          headers: {
            contentType: "application/pdf",
            caseID: caseID,
            type: "spouse",
          },
          body: pdf,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("PDF upload successful:", data);
        return data;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to upload PDF");
      }
    }
  }

  async function logicsPdfFax(pdf, caseID) {
    if (pdf) {
      console.log("pdf:", pdf);
      try {
        const response = await fetch("/api/fax", {
          method: "POST",
          headers: {
            contentType: "application/pdf",
            caseID: caseID,
            state: userData?.data.State,
          },
          body: pdf,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fax request submitted successfully:", data);
        return data;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to send fax");
      }
    }
  }

  async function update_variables(spouseData) {
    console.log("spouseData in update:", spouseData);

    const spName = spouseData.SpouseFirstName + " " + spouseData.SpouseLastName;
    const box1String =
      spName +
      "\n" +
      userData.data.Address +
      " " +
      userData.data.AptNo +
      "\n" +
      userData.data.City +
      " " +
      userData.data.State +
      ", " +
      userData.data.Zip;

    const form_data = {
      "/8821-base.pdf": {
        "F8821_topmostSubform[0].Page1[0].f1_6[0]": {
          type: "PDFTextField",
          data: box1String,
        },
        "F8821_topmostSubform[0].Page1[0].f1_7[0]": {
          type: "PDFTextField",
          data: spouseData.SpouseSSN,
        },
        "F8821_topmostSubform[0].Page1[0].f1_8[0]": {
          type: "PDFTextField",
          data: userData.data.CellPhone,
        },
        "F8821_topmostSubform[0].Page1[0].#subform[2].f1_27[0]": {
          type: "PDFTextField",
          data: spName,
        },
      },
    };
    return form_data;
  }

  // Fixed submitForm function - handles ALL navigation
  async function submitForm() {
    console.log(" sigCanvas.current:", sigCanvas.current);

    try {
      const rawSpouseData = await fetchSpouse(caseID);
      console.log("rawSpouseData:", rawSpouseData);

      if (!rawSpouseData || !rawSpouseData.data) {
        throw new Error("No spouse data found");
      }

      const parsedData = JSON.parse(rawSpouseData.data);
      console.log("parsedData:", parsedData);

      // Basic completion check
      const missingFields = [];
      if (!parsedData.SpouseSSN || parsedData.SpouseSSN.trim() === "") {
        missingFields.push("Spouse SSN");
      }
      if (
        !parsedData.SpouseFirstName ||
        parsedData.SpouseFirstName.trim() === ""
      ) {
        missingFields.push("Spouse First Name");
      }
      if (
        !parsedData.SpouseLastName ||
        parsedData.SpouseLastName.trim() === ""
      ) {
        missingFields.push("Spouse Last Name");
      }

      // If missing required info, show helpful message and redirect
      if (missingFields.length > 0) {
        alert(
          `Missing required information: ${missingFields.join(", ")}.\n\n` +
            `Please go back to Step 1 to complete your information.`
        );
        router.push("/dashboard/action1/1/spouse");
        return; // CRITICAL: This stops ALL execution
      }

      // Continue with PDF processing only if validation passes
      var form_data = await update_variables(parsedData);
      console.log("formdata from submitform call:", form_data);

      const formUrl = "/8821-base.pdf";
      const formPdfBytes = await fetch(formUrl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(formPdfBytes, {
        ignoreEncryption: true,
      });

      const form = pdfDoc.getForm();
      console.log("get form call 304", form);

      for (const [fieldname, datadict] of Object.entries(form_data[formUrl])) {
        console.log("fieldname:", fieldname, "datadict:", datadict);
        var field = form.getField(fieldname);
        console.log("field:", field);
        switch (datadict["type"]) {
          case "PDFTextField":
            try {
              field.setText(datadict["data"]);
            } catch (error) {
              console.log(error);
            }
            break;
          case "PDFCheckBox":
            if (datadict["data"] == "check") {
              field.check();
            }
            break;
        }
      }

      // Get the raw canvas element from the signature component
      const rawCanvas = sigCanvas.current._canvas;
      const trimmedCanvas = trimCanvas(rawCanvas);
      const pngUrl = trimmedCanvas.toDataURL("image/png");
      const pngImageBytes = await fetch(pngUrl).then((res) =>
        res.arrayBuffer()
      );
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDims = pngImage.scale(0.25);
      const pages = pdfDoc.getPages();
      const page = pages[0];

      page.drawImage(pngImage, {
        x: 65,
        y: 130,
        width: pngDims.width,
        height: pngDims.height,
      });

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${month}/${day}/${year}`;

      console.log(formattedDate);
      page.drawText(`${formattedDate}`, { x: 450, y: 140, size: 10 });
      form.flatten();

      const pdfBytes = await pdfDoc.save();
      await logicsPdfUpload(pdfBytes, caseID);

      if (userData?.data.LastName !== "Test") {
        await logicsPdfFax(pdfBytes, caseID);
      }

      await updateStatus(185, caseID);
      const updatedUser = await getLogicsUser(caseID);
      setUserData(updatedUser);

      // SUCCESS NAVIGATION - Only happens if everything above succeeds
      console.log(" marital status", userData?.data.MartialStatus);

      if (
        userData.data.TAX_RELIEF_TAX_TYPE === "PERSONAL AND BUSINESS" ||
        userData.data.TAX_RELIEF_TAX_TYPE === "BUSINESS"
      ) {
        router.push("/dashboard/thr/success/business");
      } else {
        router.push("/dashboard/thr/success");
      }
    } catch (error) {
      console.error("Error in submitForm:", error);
      throw error; // Re-throw so onSubmit can handle it
    }
  }

  // Simplified onSubmit - NO navigation logic here
  const onSubmit = handleSubmit(async () => {
    if (!sigCanvas.current) {
      console.error("Signature canvas not initialized");
      alert("Please sign the document before submitting");
      return;
    }

    if (!hasSignature()) {
      setSignatureError("Please sign the document before submitting");
      return;
    }

    if (!userData?.data) {
      alert("Unable to load your information. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // submitForm handles ALL logic including navigation
      await submitForm();
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        error: error.toString(),
      });
      alert(`Error: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      {isSubmitting && (
        <div
          className="loading-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Processing your submission...</p>
        </div>
      )}
      <div
        className="split-bubble-with-title action-bubble action-1-1 action-1-2"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square">
          <p className="sub-heading">
            You&apos;re almost done!
            <br />
            Just E-sign below and we will begin generating your Free Tax History
            Report! <br />
            <strong>
              Note: Please provide a proper digital signature <u>on the line</u>{" "}
              that resembles your handwritten signature. Submissions using only
              symbols, dots, or lines may not be accepted and could delay
              processing. A valid signature is required to authorize Form 8821.
            </strong>
          </p>
          <form
            className="form-cont"
            style={{ height: "56%" }}
            onSubmit={onSubmit}
          >
            <div className="form-cat">
              <p className="cat-title">E-sign:</p>
              <div className="sig-pad-cont">
                <div id="signature-pad" className="signature-pad">
                  <div className="signature-pad--body">
                    <div style={{ display: isSubmitting ? "none" : "block" }}>
                      <SignatureCanvas ref={sigCanvas} />
                      <div className="sign-line">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#0a1763"
                          className="bi bi-x-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {signatureError && (
                    <p className="form-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {signatureError}
                    </p>
                  )}
                  <div className="signature-pad--footer">
                    <div className="signature-pad--actions">
                      <div>
                        <button
                          type="button"
                          className="button clear"
                          onClick={clear}
                        >
                          CLEAR
                        </button>

                        <button type="button" className="button" onClick={undo}>
                          UNDO
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sig-btm-cont">
              <input
                type="checkbox"
                id="termsAccepted"
                {...register("termsAccepted")}
              />
              <p>
                {" "}
                I agree to the{" "}
                <span
                  className="tandc"
                  style={{
                    color: "#5dacad",
                    textDecoration: "underline 1px #5dacad",
                    fontWeight: "600",
                  }}
                >
                  <Link
                    href="/terms"
                    style={{ cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </p>
              {errors.termsAccepted && (
                <p className="form-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                  </svg>
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>
            <div className="action-btn-cont">
              <button
                type="submit"
                className="next-btn"
                id="thrReqSubmit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_2;
