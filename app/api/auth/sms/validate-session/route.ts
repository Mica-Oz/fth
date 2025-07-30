import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

// Interface for our JWT payload
interface SMSAuthPayload {
  caseId: string;
  phoneVerified: boolean;
  phoneNumber?: string;
  verifiedAt: number;
  authMethod: string;
  iat?: number; // JWT issued at
  exp?: number; // JWT expires at
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sms-auth-session")?.value;

    // No token found
    if (!token) {
      return NextResponse.json({
        valid: false,
        error: "No SMS authentication session found",
      });
    }

    // Verify and decode the JWT token
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string, {
        issuer: "freetaxhistory-sms-auth",
        audience: "freetaxhistory-users",
      }) as SMSAuthPayload;

      // Token is valid, return session info
      return NextResponse.json({
        valid: true,
        session: {
          caseId: decoded.caseId,
          phoneVerified: decoded.phoneVerified,
          phoneNumber: decoded.phoneNumber,
          verifiedAt: decoded.verifiedAt,
          authMethod: decoded.authMethod,
          expiresAt: decoded.exp ? decoded.exp * 1000 : null, // Convert to milliseconds
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (jwtError: any) {
      // Token is invalid (expired, malformed, wrong signature, etc.)
      let errorMessage = "Invalid session token";

      if (jwtError.name === "TokenExpiredError") {
        errorMessage = "Session has expired";
      } else if (jwtError.name === "JsonWebTokenError") {
        errorMessage = "Invalid token format";
      }

      // Clear the invalid cookie
      const cookieStore = await cookies();
      cookieStore.delete("sms-auth-session");

      return NextResponse.json({
        valid: false,
        error: errorMessage,
        expired: jwtError.name === "TokenExpiredError",
      });
    }
  } catch (error) {
    console.error("SMS session validation error:", error);
    return NextResponse.json(
      {
        valid: false,
        error: "Session validation failed",
      },
      { status: 500 }
    );
  }
}

// Optional: Also support POST method for consistency
export async function POST(request: NextRequest) {
  return GET(request);
}
