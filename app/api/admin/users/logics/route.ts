import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Client } from "@/lib/types";

export async function GET() {
  console.log("API route hit: /api/admin/users/logics");

  try {
    console.log("Executing query...");

    const result = await query<Client>("SELECT * FROM logics_clients");

    console.log("Query successful, found rows:", result.rows.length);

    return NextResponse.json({
      success: true,
      users: result.rows,
    });
  } catch (err) {
    const error = err as Error & {
      code?: string;
      errno?: number;
      syscall?: string;
      address?: string;
      port?: number;
    };

    console.error("Database error details:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      address: error.address,
      port: error.port,
    });

    return NextResponse.json(
      {
        success: false,
        error: `Database connection failed: ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}
