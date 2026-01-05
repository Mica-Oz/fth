import { NextResponse } from "next/server";
import { Pool, PoolClient } from "pg";

// Create a new pool instance with optimized settings
const pool = new Pool({
  host: "fth-db.c7k68cw20tsr.us-west-1.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  user: "fthdbadmin",
  password: "Monst3rM4sh!",
  ssl: { rejectUnauthorized: false },
  // Connection settings
  connectionTimeoutMillis: 10000, // 10 seconds
  // Pool settings
  max: 5, // maximum number of clients
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle
});

export async function GET() {
  console.log("API route hit: /api/admin/users");

  let client: PoolClient | null = null;
  try {
    // Test if we can connect
    console.log("Attempting to connect to database...");
    client = await Promise.race([
      pool.connect(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Connection timeout after 10s")),
          10000
        )
      ),
    ]);

    console.log("Database connection successful, executing query...");

    // Execute query with timeout
    const result = await Promise.race([
      client.query("SELECT * FROM automation_clients"),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 10s")), 10000)
      ),
    ]);

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
  } finally {
    if (client) {
      console.log("Releasing database connection");
      client.release();
    }
  }
}
