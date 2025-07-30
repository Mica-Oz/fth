// Optional: app/api/auth/sms/status/route.ts - For debugging/monitoring
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Simple health check endpoint
    return NextResponse.json({
      status: "operational",
      service: "custom-sms",
      timestamp: new Date().toISOString(),
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
  }
}
