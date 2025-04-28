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

const Action1_2 = () => {
  const router = useRouter();
  const { userData, setUserData } = useAppContext();
  console.log("USER DATA FROM CONTEXT BUT INIDE Action1/2 COMP:", userData);
  const sigCanvas = useRef(null);
  const { user } = useStytchUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caseID = user?.untrusted_metadata.id;

  const [isSubmitting, setIsSubmitting] = useState(false);

  function clear() {
    console.log(" sigCanvas.current:", sigCanvas.current);
    //test

    sigCanvas.current.clear();
  }

  function undo() {
    console.log(" sigCanvas.current:", sigCanvas.current);

    let data = sigCanvas.current.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      sigCanvas.current.fromData(data);
    }
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
  async function update_variables() {
    const formUrl = "/8821-base.pdf";
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
      userData.data.FirstName +
      " " +
      userData.data.LastName +
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
          data: userData.data.SSN,
        },
        "F8821_topmostSubform[0].Page1[0].f1_8[0]": {
          type: "PDFTextField",
          data: userData.data.CellPhone,
        },
      },
    };
    return form_data;
  }

  async function submitForm() {
    console.log(" sigCanvas.current:", sigCanvas.current);
    var form_data = await update_variables();
    console.log("formdata from submitform call:", form_data);
    const formUrl = "/8821-base.pdf";
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
    logicsPdfUpload(pdfBytes, caseID);
    await updateStatus(185, caseID);
    const updatedUser = await getLogicsUser(caseID);
    setUserData(updatedUser);
    // downloadBlob(pdfBytes, formUrl, "application/pdf");
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default navigation

    if (!sigCanvas.current) {
      console.error("Signature canvas not initialized");
      alert("Please sign the document before submitting");
      return;
    }
    // Hide the signature canvas during processing
    setIsSubmitting(true);

    try {
      await submitForm(); // Wait for form submission to complete
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
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        error: error.toString(),
      });
      alert(`Error: ${error.message || "Unknown error occurred"}`);
      setIsSubmitting(false); // Show the canvas again if there's an error
    }
  };

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
            Report!
          </p>
          <form className="form-cont" style={{ height: "56%" }}>
            <div className="form-cat">
              <p className="cat-title">E-sign:</p>
              <div className="sig-pad-cont">
                <div id="signature-pad" className="signature-pad">
                  <div className="signature-pad--body">
                    <div style={{ display: isSubmitting ? "none" : "block" }}>
                      <SignatureCanvas ref={sigCanvas} />
                    </div>
                  </div>
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
          </form>
          <div className="sig-btm-cont">
            <input type="checkbox"></input>
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
                Terms & Condtitions
              </span>
            </p>
            <button
              onClick={handleSubmit}
              className="next-btn"
              id="thrReqSubmit"
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_2;
