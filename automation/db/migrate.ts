/**
 * Database Migration Script
 * Sets up the unified clients table and optionally migrates from old tables
 *
 * Usage:
 *   npx tsx automation/db/migrate.ts              # Create new schema only
 *   npx tsx automation/db/migrate.ts --migrate    # Create schema + migrate old data
 */

// Load env BEFORE importing db module
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import fs from "fs";
import { getPool, closePool, query } from "../../lib/db";

async function runSchema(): Promise<void> {
  console.log("\n  Running schema creation...\n");

  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  // Split by semicolons but keep CREATE OR REPLACE FUNCTION blocks together
  const statements = schema
    .split(/;\s*(?=\n|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const statement of statements) {
    if (statement.startsWith("--")) continue;

    try {
      await query(statement);
      // Log what we created
      const match = statement.match(
        /CREATE\s+(TABLE|INDEX|VIEW|FUNCTION|TRIGGER)\s+(IF NOT EXISTS\s+)?(?:OR REPLACE\s+)?(\w+)/i
      );
      if (match) {
        console.log(`    Created ${match[1].toLowerCase()}: ${match[3]}`);
      }
    } catch (error) {
      const err = error as Error;
      // Ignore "already exists" errors
      if (!err.message.includes("already exists")) {
        console.error(`  Error: ${err.message}`);
        console.error(`  Statement: ${statement.substring(0, 100)}...`);
      }
    }
  }

  console.log("\n  Schema creation complete!");
}

async function migrateFromOldTables(): Promise<void> {
  console.log("\n  Migrating data from old tables...\n");

  // Check if old tables exist
  const tablesResult = await query<{ tablename: string }>(`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN ('logics_clients', 'automation_clients')
  `);

  const existingTables = tablesResult.rows.map((r) => r.tablename);
  console.log(`  Found old tables: ${existingTables.join(", ") || "none"}`);

  // Migrate from logics_clients if it exists
  if (existingTables.includes("logics_clients")) {
    console.log("\n  Migrating from logics_clients...");

    const migrateLogicsSQL = `
      INSERT INTO clients (
        case_number, name, first_name, middle_name, last_name,
        email, phone, dob, ssn, address, apt_no, city, state, zip,
        irs_logics_status, status_id, tax_type, marital_status,
        ein, business_name, business_address, business_type, tax_liability,
        submission_date, created_at, updated_at
      )
      SELECT
        case_number, name, first_name, middle_name, last_name,
        email, phone, dob, ssn, address, apt_no, city, state, zip,
        irs_logics_status, status_id, tax_type, marital_status,
        ein, business_name, business_address, business_type, tax_liability,
        date, COALESCE(imported_at, CURRENT_TIMESTAMP), COALESCE(updated_at, CURRENT_TIMESTAMP)
      FROM logics_clients
      ON CONFLICT (case_number) DO UPDATE SET
        name = EXCLUDED.name,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        updated_at = CURRENT_TIMESTAMP
    `;

    const result = await query(migrateLogicsSQL);
    console.log(`    Migrated ${result.rowCount} records from logics_clients`);
  }

  // Migrate from automation_clients if it exists
  if (existingTables.includes("automation_clients")) {
    console.log("\n  Migrating from automation_clients...");

    // First check what columns exist in automation_clients
    const columnsResult = await query<{ column_name: string }>(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'automation_clients'
    `);
    const columns = columnsResult.rows.map((r) => r.column_name);

    // Build dynamic migration based on available columns
    const migrateAutomationSQL = `
      INSERT INTO clients (
        case_number,
        ${columns.includes("status") ? "status," : ""}
        ${columns.includes("first_seen") ? "first_seen," : ""}
        ${columns.includes("last_seen") ? "last_seen," : ""}
        ${columns.includes("last_attempt_date") ? "last_attempt_date," : ""}
        ${columns.includes("last_attempt_message") ? "last_attempt_message," : ""}
        ${columns.includes("transcripts_pulled") ? "transcripts_pulled," : ""}
        ${columns.includes("activities_created") ? "activities_created," : ""}
        updated_at
      )
      SELECT
        case_number,
        ${columns.includes("status") ? "status," : ""}
        ${columns.includes("first_seen") ? "first_seen::timestamp," : ""}
        ${columns.includes("last_seen") ? "last_seen::timestamp," : ""}
        ${columns.includes("last_attempt_date") ? "last_attempt_date::timestamp," : ""}
        ${columns.includes("last_attempt_message") ? "last_attempt_message," : ""}
        ${columns.includes("transcripts_pulled") ? "transcripts_pulled," : ""}
        ${columns.includes("activities_created") ? "activities_created," : ""}
        CURRENT_TIMESTAMP
      FROM automation_clients
      ON CONFLICT (case_number) DO UPDATE SET
        ${columns.includes("status") ? "status = COALESCE(EXCLUDED.status, clients.status)," : ""}
        ${columns.includes("transcripts_pulled") ? "transcripts_pulled = COALESCE(EXCLUDED.transcripts_pulled, clients.transcripts_pulled)," : ""}
        ${columns.includes("activities_created") ? "activities_created = COALESCE(EXCLUDED.activities_created, clients.activities_created)," : ""}
        updated_at = CURRENT_TIMESTAMP
    `.replace(/,\s*FROM/, " FROM").replace(/,\s*ON/, " ON"); // Clean up trailing commas

    try {
      const result = await query(migrateAutomationSQL);
      console.log(`    Migrated ${result.rowCount} records from automation_clients`);
    } catch (error) {
      const err = error as Error;
      console.error(`    Migration error: ${err.message}`);
    }
  }

  console.log("\n  Migration complete!");
}

async function showStats(): Promise<void> {
  console.log("\n" + "=".repeat(50));
  console.log("  DATABASE STATS");
  console.log("=".repeat(50));

  const totalResult = await query<{ count: string }>("SELECT COUNT(*) as count FROM clients");
  console.log(`\n  Total clients: ${totalResult.rows[0].count}`);

  const statusResult = await query<{ status: string; count: string }>(`
    SELECT status, COUNT(*) as count FROM clients GROUP BY status
  `);
  console.log("\n  By status:");
  statusResult.rows.forEach((r) => console.log(`    ${r.status}: ${r.count}`));

  const registryResult = await query<{ registry_type: string; count: string }>(`
    SELECT registry_type, COUNT(*) as count FROM clients GROUP BY registry_type
  `);
  console.log("\n  By registry type:");
  registryResult.rows.forEach((r) => console.log(`    ${r.registry_type}: ${r.count}`));

  console.log("\n" + "=".repeat(50));
}

async function main(): Promise<void> {
  const shouldMigrate = process.argv.includes("--migrate");

  try {
    console.log("  FTH Database Migration\n");
    console.log(`  Mode: ${shouldMigrate ? "Create schema + migrate old data" : "Create schema only"}`);

    getPool();

    // Test connection
    const testResult = await query<{ now: string }>("SELECT NOW()");
    console.log(`  Connected at: ${testResult.rows[0].now}`);

    // Run schema
    await runSchema();

    // Optionally migrate old data
    if (shouldMigrate) {
      await migrateFromOldTables();
    }

    // Show stats
    await showStats();

    console.log("\n  Done!");
  } catch (error) {
    const err = error as Error;
    console.error("\n  Migration failed:", err.message);
    console.error(err.stack);
  } finally {
    await closePool();
  }
}

main();
