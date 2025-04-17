import axios from "axios";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.irslogics.com/api/updatecase.aspx";
      const API_KEY = process.env.LOGICS_API_KEY;
      const id = req.headers.get("caseid") as string;

      console.log("caseID!!!!!!!!!!!!!!!!", id);
      const caseIdInt = parseInt(id, 10);
      console.log("caseIdInt!!!!!!!!!!!!!!!!", caseIdInt);

      // Check if parsing was successful
      if (isNaN(caseIdInt)) {
        return new Response(
          JSON.stringify({ error: "Invalid CaseID format" }),
          { status: 400 }
        );
      }
      const data = await req.json();
      console.log("dob test", data.dob);
      //   const data = await req.body;

      // Make the request to the IRS Logics API
      const response = await axios.post(API_URL, data, {
        withCredentials: true,
        params: {
          apikey: API_KEY,
          CaseID: id,
          CellPhone: data.phone,
        },
      });
      console.log("response data", response.data);
      console.log("response status", response.status);

      return Response.json(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle any errors (e.g., logging, custom error response)
      console.error("Error hitting IRS Logics API:", error);
      console.error("Error response:", error.response?.data); // Log error details
      console.error("Status code:", error.response?.status); // Check status code
      console.error("Error message:", error.message); // Check error message
      return error;
    }
  } else {
    return;
  }
}
