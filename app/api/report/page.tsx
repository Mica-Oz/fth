// import type { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ name: "John Doe" });
// }
// import axios from "axios";

export async function GET(req: Request) {
  if (req.method === "GET") {
    //     try {
    //       // IRS Logics API endpoint and key
    //       const API_URL =
    //         "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/activity";
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
    //       console.log("response status from get activities:", response.status);
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
  }
}
