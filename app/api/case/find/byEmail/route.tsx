import axios from "axios";

export async function POST(req: Request) {
  try {
    const API_URL =
      "https://freetaxhistory.logiqs.com/publicapi/V3/Find/FindCaseByEmail";
    const API_KEY = process.env.LOGICS_API_KEY;
    const SECRET_TOKEN = process.env.LOGICS_SECRET_KEY; // Retrieve your Secret Token

    if (!API_KEY || !SECRET_TOKEN) {
      console.error("LOGICS_API_KEY or LOGICS_SECRET_TOKEN is not defined");
      return new Response(
        JSON.stringify({ error: "API credentials not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Checking email:", email);

    // Construct the Basic Auth string as per documentation: "API_Key:Secret_Token"
    const credentials = `${API_KEY}:${SECRET_TOKEN}`;
    // Base64 encode the credentials
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    // Make the request to the IRS Logics API
    const response = await axios.get(API_URL, {
      params: {
        email: email,
      },
      headers: {
        Authorization: `Basic ${encodedCredentials}`, // Use the base64 encoded string
        "Content-Type": "application/json",
      },
    });

    // console.log("IRS Logics response:", response.data);

    // Check if user exists based on the response
    // Based on your Postman screenshots, it looks like it returns data when found
    const userExistsLogics =
      response.data && response.data.Data && response.data.Data.length > 0;

    console.log("User exists in IRS Logics:", userExistsLogics);
    return new Response(JSON.stringify({ userExistsLogics }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error checking email in IRS Logics:", error);
    console.error("Error response:", error.response?.data);
    console.error("Status code:", error.response?.status);

    // If it's a 404 or similar "not found" error, that means user doesn't exist
    // The API might return other status codes for "not found" depending on its implementation.
    // The provided Postman success screenshot shows a `Data` array, so checking its length is key.
    // However, if a 404 specifically indicates no user, we can handle that.
    if (error.response?.status === 404) {
      return new Response(JSON.stringify({ userExistsLogics: false }), {
        status: 200, // Return 200 as it's a successful check for existence, just that it doesn't exist
        headers: { "Content-Type": "application/json" },
      });
    }

    // For other errors, return a detailed error response
    return new Response(
      JSON.stringify({
        error: "Failed to check email with IRS Logics", // More descriptive error message
        details: error.response?.data || error.message,
        statusCode: error.response?.status, // Include the original status code for debugging
      }),
      {
        status: error.response?.status || 500, // Use original status code if available, else 500
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
