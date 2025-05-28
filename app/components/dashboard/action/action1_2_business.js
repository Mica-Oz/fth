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
  console.log("USER DATA FROM CONTEXT BUT INIDE Action1/2 COMP:", userData);
  const sigCanvas = useRef(null);
  const { user } = useStytchUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // let downloadBlob, downloadURL;

  // downloadBlob = function (data, fileName, mimeType) {
  //   var blob, url;
  //   blob = new Blob([data], {
  //     type: mimeType,
  //   });
  //   url = window.URL.createObjectURL(blob);
  //   downloadURL(url, fileName);
  //   setTimeout(function () {
  //     return window.URL.revokeObjectURL(url);
  //   }, 1000);
  // };

  // downloadURL = function (data, fileName) {
  //   let a;
  //   a = document.createElement("a");
  //   a.href = data;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.style = "display: none";
  //   a.click();
  //   a.remove();
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function logicsPdfUpload(pdf, caseID) {
    if (pdf) {
      console.log("pdf:", pdf);
      try {
        const response = await fetch("/api/pdf", {
          method: "POST",
          headers: {
            contentType: "application/pdf",
            caseID: caseID,
            type: "business",
          },
          body: pdf,
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
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        router.push("/oops");
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

        console.log(
          "Fax request submitted successfully---- response in front end::",
          data
        );
        return data;
      } catch (err) {
        // setError("There was an error submitting the case. Please try again.");
        console.error(err);
        router.push("/oops");
      }
    }
  }
  async function update_variables() {
    const formUrl = "/8821-base-bus.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      console.log(`${type}: ${name}`);
      console.log("typof:", typeof name);
    });
    const box1String =
      userData.data.BusinessName + "\n" + userData.data.BusinessAddress;
    const form_data = {
      "/8821-base-bus.pdf": {
        "F8821_topmostSubform[0].Page1[0].f1_6[0]": {
          type: "PDFTextField",
          data: box1String,
        },
        "F8821_topmostSubform[0].Page1[0].f1_7[0]": {
          type: "PDFTextField",
          data: userData.data.EIN,
        },
        "F8821_topmostSubform[0].Page1[0].f1_8[0]": {
          type: "PDFTextField",
          data: userData.data.CellPhone,
        },
        "F8821_topmostSubform[0].Page1[0].#subform[2].f1_27[0]": {
          type: "PDFTextField",
          data: userData.data.FirstName + " " + userData.data.LastName,
        },
      },
    };
    return form_data;
  }

  async function submitForm() {
    console.log(" sigCanvas.current:", sigCanvas.current);
    var form_data = await update_variables();
    console.log("formdata from submitform call:", form_data);
    const formUrl = "/8821-base-bus.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

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

    // Apply the trim function to get a trimmed canvas
    const trimmedCanvas = trimCanvas(rawCanvas);

    // Get the data URL from the trimmed canvas
    const pngUrl = trimmedCanvas.toDataURL("image/png");

    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
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
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);
    page.drawText(`${formattedDate}`, { x: 450, y: 140, size: 10 });
    form.flatten();

    //call api

    const pdfBytes = await pdfDoc.save();
    await logicsPdfUpload(pdfBytes, caseID);
    if (userData?.data.LastName !== "Test") {
      await logicsPdfFax(pdfBytes, caseID);
    }
    await updateStatus(186, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
    // downloadBlob(pdfBytes, formUrl, "application/pdf");
  }

  const onSubmit = handleSubmit(async () => {
    // Validate signature separately since it's not part of the form state managed by react-hook-form
    if (!hasSignature()) {
      setSignatureError("Please sign the document before submitting");
      return;
    }

    // Hide the signature canvas during processing
    setIsSubmitting(true);

    try {
      await submitForm(); // Wait for form submission to complete
      console.log(" marital status", userData?.data.MartialStatus);

      router.push("/dashboard/thr/success");
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        error: error.toString(),
      });
      alert(`Error: ${error.message || "Unknown error occurred"}`);
      setIsSubmitting(false); // Show the canvas again if there's an error
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
              />{" "}
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
                    Terms & Condtitions
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
                onClick={handleSubmit}
                className="next-btn"
                id="thrReqSubmit"
              >
                SUBMIT
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
