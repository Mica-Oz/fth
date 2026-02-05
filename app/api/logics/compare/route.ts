import { NextResponse } from "next/server";
import axios from "axios";
import { query } from "@/lib/db";

// All the status IDs we're currently syncing
const STATUS_1_IDS = [183, 198, 199, 200, 201, 202, 203];
const STATUS_2_IDS = [184, 185, 186, 192, 194, 195, 196, 197];
const STATUS_3_PLUS_IDS = [187, 193, 204, 205, 206, 207, 213, 188, 208, 209, 210, 211, 212, 189, 190];
const ALL_STATUS_IDS = [...STATUS_1_IDS, ...STATUS_2_IDS, ...STATUS_3_PLUS_IDS];

interface LogicsCase {
  CaseID: number;
  StatusID?: number;
  StatusName?: string;
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

export async function GET() {
  try {
    // Get counts from our database
    const dbResult = await query<{ count: string }>("SELECT COUNT(*) as count FROM clients");
    const dbCount = parseInt(dbResult.rows[0].count);

    // Get all case IDs from our database
    const dbCases = await query<{ case_number: string }>("SELECT case_number FROM clients");
    const dbCaseNumbers = new Set(dbCases.rows.map(r => r.case_number));

    // Get counts from IRS Logics API for each status
    const statusCounts: Record<string, { count: number; cases: number[] }> = {};
    const allApiCaseIds = new Set<number>();
    let totalApiCases = 0;

    for (const statusId of ALL_STATUS_IDS) {
      const cases = await getCasesByStatus(statusId);
      statusCounts[statusId.toString()] = {
        count: cases.length,
        cases: cases.map(c => c.CaseID),
      };
      cases.forEach(c => allApiCaseIds.add(c.CaseID));
      totalApiCases += cases.length;
    }

    // Find cases in API but not in DB
    const missingFromDb: number[] = [];
    allApiCaseIds.forEach(caseId => {
      if (!dbCaseNumbers.has(caseId.toString())) {
        missingFromDb.push(caseId);
      }
    });

    // Find cases in DB but not in API (might be in other statuses)
    const notInApiStatuses: string[] = [];
    dbCaseNumbers.forEach(caseNumber => {
      if (!allApiCaseIds.has(parseInt(caseNumber))) {
        notInApiStatuses.push(caseNumber);
      }
    });

    return NextResponse.json({
      success: true,
      comparison: {
        dbCount,
        totalApiCases,
        uniqueApiCases: allApiCaseIds.size,
        discrepancy: allApiCaseIds.size - dbCount,
      },
      missingFromDb: {
        count: missingFromDb.length,
        caseIds: missingFromDb.slice(0, 50), // First 50 for inspection
      },
      notInApiStatuses: {
        count: notInApiStatuses.length,
        caseNumbers: notInApiStatuses.slice(0, 50),
        note: "These cases might be in statuses we're not syncing (inactive, bad, etc.)",
      },
      statusBreakdown: Object.entries(statusCounts).map(([id, data]) => ({
        statusId: id,
        count: data.count,
      })),
    });
  } catch (err) {
    const error = err as Error;
    console.error("Compare error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
