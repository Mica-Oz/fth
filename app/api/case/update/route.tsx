import axios from "axios";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // IRS Logics API endpoint and key
      const API_URL =
        "https://freetaxhistory.irslogics.com/api/updatecase.aspx";
      const API_KEY = process.env.LOGICS_API_KEY;
      const id = req.headers.get("caseid") as string;

      console.log("caseID", id);
      const caseIdInt = parseInt(id, 10);
      console.log("caseIdInt", caseIdInt);

      // Check if parsing was successful
      if (isNaN(caseIdInt)) {
        return new Response(
          JSON.stringify({ error: "Invalid CaseID format" }),
          { status: 400 }
        );
      }

      const data = await req.json();
      console.log("Update data:", data);

      // Dynamically build the params object
      const params: Record<string, string> = {
        apikey: API_KEY!,
        CaseID: id,
      };

      // Add specific parameters where name and api name dont match
      if (data.phone) params.CellPhone = data.phone;
      if (data.StatusID) params.StatusID = data.StatusID;
      if (data.StatusName) params.StatusName = data.StatusName;

      // Add any other potential parameters
      const possibleParams = [
        "Email",
        "FirstName",
        "LastName",
        "Address",
        "City",
        "State",
        "ZipCode",
        "DOB",
        "SSN",
        "sdob",
        "sssn",
      ];
      possibleParams.forEach((param) => {
        const key = param.toLowerCase();
        if (data[key] !== undefined) {
          params[param] = data[key];
        }
      });

      // Make the request to the IRS Logics API
      const response = await axios.post(API_URL, data, {
        withCredentials: true,
        params,
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      return Response.json(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle any errors
      console.error("Error hitting IRS Logics API:", error);
      console.error("Error response:", error.response?.data);
      console.error("Status code:", error.response?.status);
      console.error("Error message:", error.message);

      return new Response(
        JSON.stringify({
          error: "API request failed",
          message: error.message,
          details: error.response?.data || null,
        }),
        { status: error.response?.status || 500 }
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }
}
