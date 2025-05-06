/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest } from "next/server";

import FormData from "form-data";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/documents/casedocument";
      const API_KEY = process.env.LOGICS_API_KEY;

      const id = req.headers.get("caseid");
      const type = req.headers.get("type");
      let fileName;
      if (type === "taxpayer") {
        fileName = "8821.pdf";
      } else if (type === "spouse") {
        fileName = "8821-spouse.pdf";
      } else if (type === "business") {
        fileName = "8821-business.pdf";
      }

      // Get the PDF binary data directly
      const pdfBuffer = Buffer.from(await req.arrayBuffer());

      // Create a new form-data instance for the outgoing request
      const outgoingForm = new FormData();
      // Add the PDF buffer to the form
      outgoingForm.append("file", pdfBuffer, {
        filename: fileName,
        contentType: "application/pdf",
      });

      // Make the request to the IRS Logics API
      const response = await axios.post(API_URL, outgoingForm, {
        headers: {
          ...outgoingForm.getHeaders(),
        },
        withCredentials: true,
        params: {
          apikey: API_KEY,
          CaseID: id,
          Comment: "8821",
        },
      });
      console.log("response data", response.data);
      console.log("response status", response.status);

      // Create and return a proper Response object
      return Response.json(response.data);
    } catch (error: any) {
      // Handle any errors (e.g., logging, custom error response)
      console.error("Error hitting IRS Logics API:", error);
      console.error("Error response:", error.response?.data); // Log error details
      console.error("Status code:", error.response?.status); // Check status code
      console.error("Error message:", error.message); // Check error message

      // Return a proper error Response
      return Response.json(
        { error: "An error occurred while processing your request" },
        { status: 500 }
      );
    }
  }
}
