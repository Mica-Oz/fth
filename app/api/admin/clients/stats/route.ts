import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query<{
      total: string;
      active: string;
      success_bank: string;
      problem_child: string;
      pending: string;
      success: string;
      failed: string;
      transcripts_pulled: string;
      activities_created: string;
      sms_sent: string;
    }>(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE registry_type = 'active') as active,
        COUNT(*) FILTER (WHERE registry_type = 'success_bank') as success_bank,
        COUNT(*) FILTER (WHERE registry_type = 'problem_child') as problem_child,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'success') as success,
        COUNT(*) FILTER (WHERE status = 'failed') as failed,
        COUNT(*) FILTER (WHERE transcripts_pulled = TRUE) as transcripts_pulled,
        COUNT(*) FILTER (WHERE activities_created = TRUE) as activities_created,
        COUNT(*) FILTER (WHERE sms_sent = TRUE) as sms_sent
      FROM clients
    `);

    const row = result.rows[0];

    return NextResponse.json({
      success: true,
      stats: {
        total: parseInt(row.total),
        byRegistry: {
          active: parseInt(row.active),
          successBank: parseInt(row.success_bank),
          problemChild: parseInt(row.problem_child),
        },
        byStatus: {
          pending: parseInt(row.pending),
          success: parseInt(row.success),
          failed: parseInt(row.failed),
        },
        progress: {
          transcriptsPulled: parseInt(row.transcripts_pulled),
          activitiesCreated: parseInt(row.activities_created),
          smsSent: parseInt(row.sms_sent),
        },
      },
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
