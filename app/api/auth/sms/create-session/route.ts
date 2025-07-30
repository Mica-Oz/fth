// app/api/auth/sms/create-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Make sure you have this in your .env.local
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export async function POST(request: NextRequest) {
  try {
    const { caseId, phoneNumber } = await request.json();

    // Validate required fields
    if (!caseId) {
      return NextResponse.json(
        { error: "Case ID is required" },
        { status: 400 }
      );
    }

    // Create JWT token with phone verification info
    const tokenPayload = {
      caseId,
      phoneVerified: true,
      phoneNumber: phoneNumber || null, // Optional: store which phone was verified
      verifiedAt: Date.now(),
      authMethod: "sms",
    };

    // Sign the token (expires in 7 days)
    const token = jwt.sign(tokenPayload, JWT_SECRET as string, {
      expiresIn: "1h",
      issuer: "freetaxhistory-sms-auth",
      audience: "freetaxhistory-users",
    });

    // Set secure httpOnly cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 60 * 60, // 1 hour in seconds (was 7 * 24 * 60 * 60)      path: "/",
    };

    const cookieStore = await cookies();
    cookieStore.set("sms-auth-session", token, cookieOptions);

    // Log successful session creation (with masked phone)
    console.log("📱 SMS session created:", {
      caseId,
      phoneNumber: phoneNumber
        ? phoneNumber.replace(/\d(?=\d{4})/g, "*")
        : "unknown",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "SMS authentication session created",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    });
  } catch (error) {
    console.error("SMS session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
