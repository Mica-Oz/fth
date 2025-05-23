import axios from "axios";

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/Find/FindCaseByEmail";
      const API_KEY = process.env.LOGICS_API_KEY;
      const email = req.headers.get("email") as string;
      // const data = await req.body;
      console.log("email:", email);

      // Make the request to the IRS Logics API
      const response = await axios.get(API_URL, {
        withCredentials: true,
        params: {
          apikey: API_KEY,
          Email: email,
        },
      });
      console.log(
        "Object.keys(response.data.data[0])",
        Object.keys(response.data.data)
      );
      console.log("length", response.data.data.length);
      const lastAcct = response.data.data.length - 1;

      console.log(
        "most recfent caseID",
        response.data.data[lastAcct]["CaseID"]
      );
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
