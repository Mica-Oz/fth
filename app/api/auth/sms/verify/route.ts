// app/api/auth/sms/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { smsService } from "@/app/utilities/sms/smsService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, methodId, method_id } = body;

    // Accept both methodId and method_id for compatibility
    const actualMethodId = methodId || method_id;

    if (!code || !actualMethodId) {
      return NextResponse.json(
        { error: "Code and method ID are required" },
        { status: 400 }
      );
    }

    // Clean and validate code
    const cleanCode = code.replace(/\D/g, "");
    if (cleanCode.length !== 6) {
      return NextResponse.json(
        { error: "Invalid verification code format" },
        { status: 400 }
      );
    }

    // Verify OTP using our custom service
    const result = await smsService.authenticate(cleanCode, actualMethodId);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
          attemptsRemaining: result.attemptsRemaining,
        },
        { status: 400 }
      );
    }

    // Return Stytch-compatible success response
    return NextResponse.json({
      success: true,
      phoneNumber: result.phoneNumber,
      caseId: result.caseId,
      message: "Phone number verified successfully",
    });
  } catch (error) {
    console.error("SMS verify API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
