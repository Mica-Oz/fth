/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest } from "next/server";

import FormData from "form-data";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/fax/sendfax";
      const API_KEY = process.env.LOGICS_API_KEY;

      const id = req.headers.get("caseid");
      const state = req.headers.get("state");
      let faxNum;
      if (
        state === "AL" ||
        state === "AR" ||
        state === "CT" ||
        state === "DE" ||
        state === "DC" ||
        state === "FL" ||
        state === "GA" ||
        state === "IL" ||
        state === "IN" ||
        state === "KY" ||
        state === "LA" ||
        state === "ME" ||
        state === "MD" ||
        state === "MA" ||
        state === "MI" ||
        state === "MS" ||
        state === "NH" ||
        state === "NJ" ||
        state === "NY" ||
        state === "NC" ||
        state === "OH" ||
        state === "PA" ||
        state === "RI" ||
        state === "SC" ||
        state === "TN" ||
        state === "VT" ||
        state === "VA" ||
        state === "WV"
      ) {
        faxNum = "8552147519";
      } else if (
        state === "AL" ||
        state === "AZ" ||
        state === "CA" ||
        state === "CO" ||
        state === "HI" ||
        state === "ID" ||
        state === "IA" ||
        state === "KS" ||
        state === "MN" ||
        state === "MO" ||
        state === "MT" ||
        state === "NB" ||
        state === "NV" ||
        state === "NM" ||
        state === "ND" ||
        state === "OK" ||
        state === "OR" ||
        state === "SD" ||
        state === "TX" ||
        state === "UT" ||
        state === "WA" ||
        state === "WI" ||
        state === "WY"
      ) {
        faxNum = "8552147522";
      }

      // Get the PDF binary data directly
      const pdfBuffer = Buffer.from(await req.arrayBuffer());

      // Create a new form-data instance for the outgoing request
      const outgoingForm = new FormData();
      // Add the PDF buffer to the form
      outgoingForm.append("file", pdfBuffer, {
        filename: "8821.pdf",
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
          faxNumber: faxNum,
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
