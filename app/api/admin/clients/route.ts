import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Client } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const registryType = searchParams.get("registry") || "all";
  const status = searchParams.get("status");

  try {
    let sql = "SELECT * FROM clients";
    const conditions: string[] = [];
    const params: string[] = [];

    // Filter by registry type
    if (registryType !== "all") {
      params.push(registryType);
      conditions.push(`registry_type = $${params.length}`);
    }

    // Filter by status
    // Problem children = failed clients first seen by automation over 1 month ago
    if (status === "problem_child") {
      conditions.push(`status = 'failed'`);
      conditions.push(`first_seen < NOW() - INTERVAL '1 month'`);
    } else if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY created_at DESC NULLS LAST, first_seen DESC NULLS LAST";

    const result = await query<Client>(sql, params);

    return NextResponse.json({
      success: true,
      clients: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    const error = err as Error;

    console.error("Database error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: `Database error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
