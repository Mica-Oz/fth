import axios from "axios";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/casefile";
      const API_KEY = process.env.LOGICS_API_KEY;

      const data = await req.json();
      // const data = await req.body;
      console.log("data body:", data);

      // Make the request to the IRS Logics API
      const response = await axios.post(API_URL, data, {
        params: {
          apikey: API_KEY,
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
    // Handle unsupported methods
    return;
    //  res.status(405).json({
    //   error: "Method not allowed",
    //   data: "",
    //   message: "",
    // });
  }
}
