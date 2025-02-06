import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/casefile";
      const API_KEY = process.env.LOGICS_API_KEY; // Best practice: keep keys in environment variables

      // Prepare your request payload (based on what IRS Logics API expects)
      const data = await req.json();
      console.log("DATAAAAA>>>>", data);
      console.log("API Key:", process.env.LOGICS_API_KEY);

      // Make the request to the IRS Logics API
      const response = await axios.post(API_URL, data, {
        headers: {
          apikey: API_KEY, // Ensure you're passing the API key in the headers
        },
      });
      // Return the response from IRS Logics API
      //   return res.status(200).json(response.data);
      console.log(response.data); // If successful, log the response
    } catch (error) {
      // Handle any errors (e.g., logging, custom error response)
      console.error("Error hitting IRS Logics API:", error);
      console.error("Error response:", error.response?.data); // Log error details
      console.error("Status code:", error.response?.status); // Check status code
      console.error("Error message:", error.message); // Check error message
      //   return res.status(500).json({ error: "Failed to submit case" });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ error: "Method not allowed" });
  }
}
