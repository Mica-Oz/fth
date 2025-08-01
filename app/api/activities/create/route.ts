import axios from "axios";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/activity";
      const API_KEY = process.env.LOGICS_API_KEY;

      // const data = await req.json();
      // const data = await req.body;

      const id = req.headers.get("caseid") as string;
      const subject = req.headers.get("subject") as string;
      const comment = req.headers.get("comment") as string;
      const activityType = req.headers.get("activityType") as string;
      console.log("Create activities request - Case ID:", id);
      console.log("Activity:", subject, comment, activityType);
      const caseIdInt = await parseInt(id, 10);

      // Check if parsing was successful
      if (isNaN(caseIdInt)) {
        return new Response(
          JSON.stringify({ error: "Invalid CaseID format" }),
          { status: 400 }
        );
      }

      // Make the request to the IRS Logics API
      const response = await axios.post(
        API_URL,
        {
          CaseID: id,
          Subject: subject,
          Comment: comment,
          ActivityType: activityType,
        },
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response data TYPE", typeof Response.json(response.data));
      console.log("response status from get activities:", response.status);

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
