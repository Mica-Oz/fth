// app/api/auth/sms/revoke-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Clear the JWT session cookie
    cookieStore.set({
      name: "sms-auth-session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    console.log("📱 SMS session revoked successfully");

    return NextResponse.json({
      success: true,
      message: "SMS session revoked successfully",
    });
  } catch (error) {
    console.error("SMS session revoke error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to revoke session" },
      { status: 500 }
    );
  }
}
