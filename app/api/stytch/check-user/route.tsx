import { NextResponse } from "next/server";
import * as stytchNode from "stytch";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    // Initialize the server-side Stytch client
    // Note: This uses different environment variables than your client-side implementation
    const stytchClient = new stytchNode.Client({
      project_id: process.env.STYTCH_PROJECT_ID || "",
      secret: process.env.STYTCH_SECRET || "",
      env:
        process.env.NODE_ENV === "production"
          ? stytchNode.envs.live
          : stytchNode.envs.test,
    });

    // Search for the user
    const response = await stytchClient.users.search({
      query: {
        operator: "AND",
        operands: [
          {
            filter_name: "email_address_fuzzy",
            filter_value: email,
          },
        ],
      },
    });

    const userExists = response.results?.length > 0;
    return NextResponse.json({ userExists });
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
