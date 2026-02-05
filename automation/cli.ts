/**
 * FTH Automation CLI
 * Simple command-line interface for common database operations
 *
 * Usage:
 *   npx tsx automation/cli.ts stats              # Show database stats
 *   npx tsx automation/cli.ts pending [limit]    # Get pending clients
 *   npx tsx automation/cli.ts archive-success    # Move successful to success bank
 *   npx tsx automation/cli.ts archive-problems   # Move old failures to problem bank
 *   npx tsx automation/cli.ts notify-ready       # Get clients ready for SMS
 *   npx tsx automation/cli.ts sql "QUERY"        # Run raw SQL
 */

import path from "path";
import dotenv from "dotenv";
import { getPool, closePool, query } from "../lib/db";
import {
  getStats,
  getPendingClients,
  getClientsForNotification,
  archiveSuccessful,
  archiveProblemChildren,
} from "./lib/client-ops";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function showStats(): Promise<void> {
  const stats = await getStats();

  console.log("\n" + "=".repeat(50));
  console.log("  CLIENT DATABASE STATS");
  console.log("=".repeat(50));

  console.log(`\n  Total clients: ${stats.total}`);

  console.log("\n  By Registry Type:");
  console.log(`    Active:        ${stats.active}`);
  console.log(`    Success Bank:  ${stats.successBank}`);
  console.log(`    Problem Child: ${stats.problemChild}`);

  console.log("\n  By Status:");
  console.log(`    Pending: ${stats.pending}`);
  console.log(`    Success: ${stats.success}`);
  console.log(`    Failed:  ${stats.failed}`);

  console.log("\n  Processing Progress:");
  console.log(`    Transcripts Pulled: ${stats.transcriptsPulled}`);
  console.log(`    Activities Created: ${stats.activitiesCreated}`);
  console.log(`    SMS Sent:           ${stats.smsSent}`);

  console.log("\n" + "=".repeat(50));
}

async function showPending(limit: number): Promise<void> {
  const clients = await getPendingClients(limit);

  console.log(`\n  Pending Clients (${clients.length} of ${limit} requested):\n`);

  if (clients.length === 0) {
    console.log("  No pending clients found.");
    return;
  }

  console.table(
    clients.map((c) => ({
      case_number: c.case_number,
      name: c.name?.substring(0, 25),
      email: c.email?.substring(0, 30),
      first_seen: c.first_seen,
    }))
  );
}

async function showNotifyReady(): Promise<void> {
  const clients = await getClientsForNotification(50);

  console.log(`\n  Clients Ready for SMS (${clients.length}):\n`);

  if (clients.length === 0) {
    console.log("  No clients ready for notification.");
    return;
  }

  console.table(
    clients.map((c) => ({
      case_number: c.case_number,
      name: c.name?.substring(0, 25),
      phone: c.phone,
      activities_created_date: c.activities_created_date,
    }))
  );
}

async function doArchiveSuccess(): Promise<void> {
  const count = await archiveSuccessful();
  console.log(`\n  Archived ${count} successful clients to success bank.`);
}

async function doArchiveProblems(): Promise<void> {
  const count = await archiveProblemChildren();
  console.log(`\n  Archived ${count} problem children (failed > 1 month).`);
}

async function runSql(sql: string): Promise<void> {
  console.log(`\n  Executing: ${sql}\n`);

  const result = await query(sql);

  if (result.rows.length === 0) {
    console.log("  No results returned.");
  } else {
    console.table(result.rows);
    console.log(`\n  ${result.rows.length} row(s) returned.`);
  }
}

function showHelp(): void {
  console.log(`
  FTH Automation CLI

  Usage: npx tsx automation/cli.ts <command> [args]

  Commands:
    stats                Show database statistics
    pending [limit]      List pending clients (default: 10)
    notify-ready         List clients ready for SMS notification
    archive-success      Move successful clients to success bank
    archive-problems     Move old failures to problem child bank
    sql "QUERY"          Run a raw SQL query

  Examples:
    npx tsx automation/cli.ts stats
    npx tsx automation/cli.ts pending 20
    npx tsx automation/cli.ts sql "SELECT COUNT(*) FROM clients"
  `);
}

async function main(): Promise<void> {
  const command = process.argv[2];

  if (!command || command === "help" || command === "--help") {
    showHelp();
    return;
  }

  try {
    getPool();

    switch (command) {
      case "stats":
        await showStats();
        break;

      case "pending":
        const limit = parseInt(process.argv[3] || "10");
        await showPending(limit);
        break;

      case "notify-ready":
        await showNotifyReady();
        break;

      case "archive-success":
        await doArchiveSuccess();
        break;

      case "archive-problems":
        await doArchiveProblems();
        break;

      case "sql":
        const sql = process.argv[3];
        if (!sql) {
          console.error("  Error: SQL query required");
          console.error('  Usage: npx tsx automation/cli.ts sql "SELECT * FROM clients LIMIT 5"');
          process.exit(1);
        }
        await runSql(sql);
        break;

      default:
        console.error(`  Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    const err = error as Error;
    console.error("\n  Error:", err.message);
  } finally {
    await closePool();
  }
}

main();
