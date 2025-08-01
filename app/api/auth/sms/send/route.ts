// app/api/auth/sms/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { smsService } from "@/app/utilities/sms/smsService";

// Rate limiting per IP (additional protection layer)
const ipRateLimit = new Map<string, { count: number; resetAt: Date }>();
const IP_RATE_LIMIT = 10; // 10 requests per hour per IP
const IP_RATE_WINDOW = 60 * 60 * 1000;

function checkIPRateLimit(ip: string): boolean {
  const now = new Date();
  const existing = ipRateLimit.get(ip);

  if (!existing || now > existing.resetAt) {
    ipRateLimit.set(ip, {
      count: 1,
      resetAt: new Date(now.getTime() + IP_RATE_WINDOW),
    });
    return true;
  }

  if (existing.count >= IP_RATE_LIMIT) {
    return false;
  }

  existing.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    // NEW - TypeScript friendly
    const clientIP =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") || // Cloudflare
      "unknown";

    // Check IP rate limiting
    if (!checkIPRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests from this IP. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { phoneNumber, caseId } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Clean and validate phone number (US format)
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Invalid phone number format. Must be US number." },
        { status: 400 }
      );
    }

    // Send OTP using our custom service
    const result = await smsService.sendOTP(cleanPhone, caseId);

    if (!result.success) {
      const status = result.retryAfter ? 429 : 400;
      return NextResponse.json(
        {
          error: result.error,
          retryAfter: result.retryAfter,
        },
        { status }
      );
    }

    // Return Stytch-compatible response format
    return NextResponse.json({
      success: true,
      method_id: result.method_id, // Same format as Stytch!
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("SMS send API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
