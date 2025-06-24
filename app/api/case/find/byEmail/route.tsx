import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  // IRS Logics API endpoint and key
  const API_URL =
    "https://freetaxhistory.logiqs.com/publicapi/V3/Find/FindCaseByEmail";
  const API_KEY = process.env.LOGICS_API_KEY;

  try {
    // Search for the user
    // Make the request to the IRS Logics API
    const response = await axios.get(API_URL, {
      withCredentials: true,
      params: {
        apikey: API_KEY,
        email: email,
      },
    });

    console.log("response data", response.data);
    console.log("response status", response.status);

    const userExists = false;
    return NextResponse.json({ userExists });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error querying Stytch API:", error);

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to search users",
        details: error.message || String(error),
        // Include error type if available
        errorType: error.error_type || null,
      },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   if (req.method === "POST") {
//     try {
//       // IRS Logics API endpoint and key
//       const API_URL =
//         "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/casefile";
//       const API_KEY = process.env.LOGICS_API_KEY;

//       const data = await req.json();
//       // const data = await req.body;
//       console.log("data body:", data);

//       // Make the request to the IRS Logics API
//       const response = await axios.post(API_URL, data, {
//         withCredentials: true,
//         params: {
//           apikey: API_KEY,
//         },
//       });
//       console.log("response data", response.data);
//       console.log("response status", response.status);

//       return Response.json(response.data);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // Handle any errors (e.g., logging, custom error response)
//       console.error("Error hitting IRS Logics API:", error);
//       console.error("Error response:", error.response?.data); // Log error details
//       console.error("Status code:", error.response?.status); // Check status code
//       console.error("Error message:", error.message); // Check error message
//       return error;
//     }
//   } else {
//     return;
//   }
// }
// // export async function GET(req: Request) {
//   if (req.method === "GET") {
//     try {
//       // IRS Logics API endpoint and key
//       const API_URL =
//         "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/caseinfo";
//       const API_KEY = process.env.LOGICS_API_KEY;

//       // const data = await req.json();
//       // const data = await req.body;
//       const id = (await req.headers.get("caseid")) as string;
//       console.log("caseID!!!!!!!!!!!!!!!!", id);
//       const caseIdInt = await parseInt(id, 10);
//       console.log("caseIdInt!!!!!!!!!!!!!!!!", caseIdInt);
//       // Check if parsing was successful
//       if (isNaN(caseIdInt)) {
//         return new Response(
//           JSON.stringify({ error: "Invalid CaseID format" }),
//           { status: 400 }
//         );
//       }

//       // Make the request to the IRS Logics API
//       const response = await axios.get(API_URL, {
//         withCredentials: true,

//         params: {
//           apikey: API_KEY,
//           CaseID: id,
//         },
//       });
//       console.log("response data TYPE", typeof Response.json(response.data));
//       console.log("response status", response.status);

//       return Response.json(response.data);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // Handle any errors (e.g., logging, custom error response)
//       console.error("Error hitting IRS Logics API:", error);
//       console.error("Error response:", error.response?.data); // Log error details
//       console.error("Status code:", error.response?.status); // Check status code
//       console.error("Error message:", error.message); // Check error message
//       return error;
//     }
//   } else {
//     return;
//   }
// }
