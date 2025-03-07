"use client";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

const Action1_2 = () => {
  const sigCanvas = useRef(null);

  function clear() {
    sigCanvas.current.clear();
  }

  function undo() {
    let data = sigCanvas.current.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      sigCanvas.current.fromData(data);
    }
  }

  let downloadBlob, downloadURL;

  downloadBlob = function (data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
      type: mimeType,
    });
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };

  downloadURL = function (data, fileName) {
    let a;
    a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
  };

  async function fillForm() {
    //   var form_data = await update_variables();
    const formUrl = "/8821.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes, {
      ignoreEncryption: true,
    });

    const form = pdfDoc.getForm();

    //   for (const [fieldname, datadict] of Object.entries(form_data[path])) {
    //     var field = form.getField(fieldname);
    //     switch (datadict["type"]) {
    //       case "PDFTextField":
    //         try {
    //           field.setText(datadict["data"]);
    //         } catch {}
    //         break;
    //       case "PDFCheckBox":
    //         if (datadict["data"] == "check") {
    //           field.check();
    //         }
    //         break;
    //     }
    //   }

    const pngUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const pngDims = pngImage.scale(0.25);
    const pages = pdfDoc.getPages();
    const page = pages[0];

    page.drawImage(pngImage, {
      x: 65,
      y: 110,
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
    const pdfBytes = await pdfDoc.save();

    downloadBlob(pdfBytes, formUrl, "application/pdf");
  }

  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1"
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
                    <SignatureCanvas ref={sigCanvas} />
                  </div>
                  <div className="signature-pad--footer">
                    <div className="signature-pad--actions">
                      <div>
                        <button
                          type="button"
                          className="button clear"
                          onClick={clear}
                        >
                          Clear
                        </button>

                        <button type="button" className="button" onClick={undo}>
                          Undo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Link
            onClick={fillForm}
            href="/dashboard/status2"
            className="next-btn"
          >
            SUBMIT
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_2;
