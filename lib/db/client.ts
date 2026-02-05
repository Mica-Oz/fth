import { Pool, PoolClient } from "pg";

/**
 * Get database configuration from environment variables
 * Called lazily to allow dotenv to load first
 */
function getDbConfig() {
  return {
    host: process.env.POSTGRES_HOST || process.env.RDS_HOST,
    port: parseInt(process.env.POSTGRES_PORT || process.env.RDS_PORT || "5432"),
    database: process.env.POSTGRES_DATABASE || process.env.RDS_DATABASE || "postgres",
    user: process.env.POSTGRES_USER || process.env.RDS_USER,
    password: process.env.POSTGRES_PASSWORD || process.env.RDS_PASSWORD,
    ssl:
      process.env.POSTGRES_SSL === "true" || process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
    // Connection pool settings
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

// Singleton pool instance
let pool: Pool | null = null;

/**
 * Get the database connection pool
 * Creates a new pool if one doesn't exist
 */
export function getPool(): Pool {
  if (!pool) {
    const dbConfig = getDbConfig();
    pool = new Pool(dbConfig);

    // Log connection errors
    pool.on("error", (err) => {
      console.error("Unexpected database pool error:", err);
    });
  }
  return pool;
}

/**
 * Get a client from the pool for transactions
 * Remember to call client.release() when done
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return pool.connect();
}

/**
 * Execute a query using the pool
 */
export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  const pool = getPool();
  const result = await pool.query(text, params);
  return { rows: result.rows as T[], rowCount: result.rowCount };
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const dbConfig = getDbConfig();
    const pool = getPool();
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected:", {
      host: dbConfig.host,
      database: dbConfig.database,
      time: result.rows[0].now,
    });
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

/**
 * Close the pool (for graceful shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Export the pool for direct access if needed
export { pool };
