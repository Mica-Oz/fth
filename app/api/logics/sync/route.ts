import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { query } from "@/lib/db";

// IRS Logics status IDs - Status 1.x (No 8821)
const STATUS_1_IDS = [
  183, // Status 1.1 - Report Not Yet Requested
  198, // Status 1.2 - Action1-1 Submitted
  199, // Status 1.3 - Action1-1.5 Submitted
  200, // Status 1.2B - Business THR Not Yet Requested
  201, // Status 1.3B - Business THR Not Yet Requested
  202, // Status 1.2S - Spouse THR Not Yet Requested
  203, // Status 1.3S - Spouse THR Not Yet Requested
];

// IRS Logics status IDs - Status 2.x (8821 Submitted - pending transcript pull)
const STATUS_2_IDS = [
  184, // Status 2.1 - Individual THR Request Submitted
  185, // Status 2.2 - Spouse THR Request Submitted
  186, // Status 2.3 - Business THR Request Submitted
  192, // Status 2.4 - Fast Track
  194, // Status 2.R - Re-Sign Needed; Taxpayer
  195, // Status 2.RS - Re-Sign Needed; Spouse
  196, // Status 2.RB - Re-Sign Needed; Business
  197, // Status 2.FR - Full Re-Submit Needed; Taxpayer
];

// IRS Logics status IDs - Status 3+ (Transcripts pulled)
const STATUS_3_PLUS_IDS = [
  // Status 3.x
  187, // Status 3.1 - THR Live; Awaiting User Ack
  193, // Status 3.2 - THR Live; FAST TRACK; Fin Interview Complete
  204, // Status 3A - THR Live; No Eligibility
  205, // Status 3B - THR Live; Compliant; Owe
  206, // Status 3BF - THR Live; FAST TRACK; Compliant; Owe
  207, // Status 3C - THR Live; Not Compliant; Owe
  213, // Status 3D - THR Live; Not Compliant; Refund
  // Status 4.x
  188, // Status 4.1 - THR acknowledged; Awaiting Financial Interview
  208, // Status 4A - THR Acknowledged; Compliant; Do Not Owe
  209, // Status 4B - THR Acknowledged; Compliant; Owe; Financial Interview
  210, // Status 4BF - FAST TRACK; THR Acknowledged; Compliant; Owe; Resolution
  211, // Status 4C - THR Acknowledged; Not Compliant; Owe; Tax Settlement
  212, // Status 4D - THR Acknowledged; Not Compliant; Refund; Tax Settlement
  // Status 5.x
  189, // Status 5.1 - Financial Interview Submitted; Awaiting Contact
  190, // Status 5.2 - Financial Interview Submitted; Contact Made
];

// All status IDs combined
const ALL_STATUS_IDS = [...STATUS_1_IDS, ...STATUS_2_IDS, ...STATUS_3_PLUS_IDS];

interface LogicsCase {
  CaseID: number;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  DOB?: string;
  SSN?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  StatusID?: number;
  StatusName?: string;
  TaxType?: string;
  MaritalStatus?: string;
  CreatedDate?: string;
  // Add other fields as needed
}

async function getCasesByStatus(statusId: number): Promise<LogicsCase[]> {
  const API_URL = "https://freetaxhistory.logiqs.com/publicapi/V4/Case/GetCasesByStatus";
  const API_KEY = process.env.LOGICS_API_KEY;

  try {
    const response = await axios.get(API_URL, {
      params: { apikey: API_KEY },
      headers: { StatusID: statusId.toString() },
    });
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching status ${statusId}:`, error);
    return [];
  }
}

async function getCaseInfo(caseId: number): Promise<LogicsCase | null> {
  const API_URL = "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/caseinfo";
  const API_KEY = process.env.LOGICS_API_KEY;

  try {
    const response = await axios.get(API_URL, {
      params: { apikey: API_KEY, CaseID: caseId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching case ${caseId}:`, error);
    return null;
  }
}

function determineTranscriptStatus(_statusId: number | undefined, irsLogicsStatus: string | undefined): string {
  // Status 3+ means transcripts were pulled (manually before automation)
  if (irsLogicsStatus?.includes("[status-3]") ||
      irsLogicsStatus?.includes("[status-4]") ||
      irsLogicsStatus?.includes("[status-5]")) {
    return "success";
  }
  // Status 2 means 8821 submitted, pending transcript pull
  if (irsLogicsStatus?.includes("[status-2]")) {
    return "pending";
  }
  // Status 1 or anything else means no 8821
  return "no_8821";
}

async function upsertClient(client: LogicsCase) {
  const name = [client.FirstName, client.MiddleName, client.LastName]
    .filter(Boolean)
    .join(" ");

  const irsLogicsStatus = client.StatusName || "";
  const transcriptStatus = determineTranscriptStatus(client.StatusID, irsLogicsStatus);

  const sql = `
    INSERT INTO clients (
      case_number, name, first_name, middle_name, last_name,
      email, phone, dob, ssn, address, city, state, zip,
      status_id, irs_logics_status, tax_type, marital_status,
      status, created_at, updated_at, logics_updated
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
      $14, $15, $16, $17, $18, NOW(), NOW(), NOW()
    )
    ON CONFLICT (case_number) DO UPDATE SET
      name = COALESCE(EXCLUDED.name, clients.name),
      first_name = COALESCE(EXCLUDED.first_name, clients.first_name),
      middle_name = COALESCE(EXCLUDED.middle_name, clients.middle_name),
      last_name = COALESCE(EXCLUDED.last_name, clients.last_name),
      email = COALESCE(EXCLUDED.email, clients.email),
      phone = COALESCE(EXCLUDED.phone, clients.phone),
      dob = COALESCE(EXCLUDED.dob, clients.dob),
      ssn = COALESCE(EXCLUDED.ssn, clients.ssn),
      address = COALESCE(EXCLUDED.address, clients.address),
      city = COALESCE(EXCLUDED.city, clients.city),
      state = COALESCE(EXCLUDED.state, clients.state),
      zip = COALESCE(EXCLUDED.zip, clients.zip),
      status_id = EXCLUDED.status_id,
      irs_logics_status = EXCLUDED.irs_logics_status,
      tax_type = COALESCE(EXCLUDED.tax_type, clients.tax_type),
      marital_status = COALESCE(EXCLUDED.marital_status, clients.marital_status),
      -- Only update transcript status if currently no_8821 (don't overwrite automation results)
      status = CASE
        WHEN clients.status IN ('success', 'failed') THEN clients.status
        ELSE EXCLUDED.status
      END,
      updated_at = NOW(),
      logics_updated = NOW()
  `;

  const params = [
    client.CaseID.toString(),
    name,
    client.FirstName || null,
    client.MiddleName || null,
    client.LastName || null,
    client.Email || null,
    client.Phone || null,
    client.DOB || null,
    client.SSN || null,
    client.Address || null,
    client.City || null,
    client.State || null,
    client.Zip || null,
    client.StatusID || null,
    irsLogicsStatus,
    client.TaxType || null,
    client.MaritalStatus || null,
    transcriptStatus,
  ];

  await query(sql, params);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const statusIds = body.statusIds || ALL_STATUS_IDS;

    let totalFetched = 0;
    let totalUpserted = 0;
    let newClients = 0;
    const errors: string[] = [];
    const statusBreakdown: Record<string, number> = {};

    // Fetch cases for each status
    for (const statusId of statusIds) {
      const cases = await getCasesByStatus(statusId);
      totalFetched += cases.length;
      statusBreakdown[statusId.toString()] = cases.length;

      console.log(`Status ${statusId}: ${cases.length} cases`);

      // Upsert each case
      for (const caseData of cases) {
        try {
          // Check if this is a new client
          const existsResult = await query<{ exists: boolean }>(
            "SELECT EXISTS(SELECT 1 FROM clients WHERE case_number = $1) as exists",
            [caseData.CaseID.toString()]
          );
          const isNew = !existsResult.rows[0].exists;

          // Get full case info for additional fields
          const fullCase = await getCaseInfo(caseData.CaseID);
          if (fullCase) {
            await upsertClient({ ...caseData, ...fullCase });
            totalUpserted++;
            if (isNew) {
              newClients++;
              console.log(`NEW CLIENT: ${caseData.CaseID} - ${fullCase.FirstName} ${fullCase.LastName}`);
            }
          }
        } catch (err) {
          errors.push(`Case ${caseData.CaseID}: ${(err as Error).message}`);
        }
      }
    }

    // Get updated count
    const countResult = await query<{ count: string }>("SELECT COUNT(*) as count FROM clients");
    const totalClients = parseInt(countResult.rows[0].count);

    console.log(`Sync complete: ${totalFetched} fetched, ${totalUpserted} upserted, ${newClients} new`);

    return NextResponse.json({
      success: true,
      fetched: totalFetched,
      upserted: totalUpserted,
      newClients,
      totalClients,
      statusBreakdown,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Sync error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint for quick sync status check
export async function GET() {
  try {
    const result = await query<{ count: string; last_updated: string }>(
      "SELECT COUNT(*) as count, MAX(logics_updated) as last_updated FROM clients"
    );

    return NextResponse.json({
      success: true,
      totalClients: parseInt(result.rows[0].count),
      lastSynced: result.rows[0].last_updated,
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
