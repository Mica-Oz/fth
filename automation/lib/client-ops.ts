/**
 * Client Database Operations
 * All DB operations for client management in one place
 */

import { query } from "../../lib/db";
import type { Client } from "../../lib/types";

// ===========================================
// Types
// ===========================================

export interface ClientInsert {
  caseNumber: string;
  name?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  ssn?: string;
  address?: string;
  aptNo?: string;
  city?: string;
  state?: string;
  zip?: string;
  irsLogicsStatus?: string;
  statusId?: number;
  taxType?: string;
  maritalStatus?: string;
  ein?: string;
  businessName?: string;
  businessAddress?: string;
  businessType?: string;
  taxLiability?: string;
  submissionDate?: string;
}

export interface TranscriptResult {
  taxAnalysis: boolean;
  wageIncome: boolean;
}

export interface PdfAnalysisResult {
  currentLiability?: number;
  yearsUnfiled?: number;
  collectionsStatus?: string;
}

export interface ActivityResult {
  count: number;
}

// ===========================================
// Insert / Update Operations
// ===========================================

/**
 * Upsert a client from IRS Logics scrape
 */
export async function upsertClient(client: ClientInsert): Promise<boolean> {
  const result = await query<{ inserted: boolean }>(
    `
    INSERT INTO clients (
      case_number, name, first_name, middle_name, last_name,
      email, phone, dob, ssn, address, apt_no, city, state, zip,
      irs_logics_status, status_id, tax_type, marital_status,
      ein, business_name, business_address, business_type, tax_liability,
      submission_date, last_seen
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
      $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, CURRENT_TIMESTAMP
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
      apt_no = COALESCE(EXCLUDED.apt_no, clients.apt_no),
      city = COALESCE(EXCLUDED.city, clients.city),
      state = COALESCE(EXCLUDED.state, clients.state),
      zip = COALESCE(EXCLUDED.zip, clients.zip),
      irs_logics_status = COALESCE(EXCLUDED.irs_logics_status, clients.irs_logics_status),
      status_id = COALESCE(EXCLUDED.status_id, clients.status_id),
      tax_type = COALESCE(EXCLUDED.tax_type, clients.tax_type),
      marital_status = COALESCE(EXCLUDED.marital_status, clients.marital_status),
      ein = COALESCE(EXCLUDED.ein, clients.ein),
      business_name = COALESCE(EXCLUDED.business_name, clients.business_name),
      business_address = COALESCE(EXCLUDED.business_address, clients.business_address),
      business_type = COALESCE(EXCLUDED.business_type, clients.business_type),
      tax_liability = COALESCE(EXCLUDED.tax_liability, clients.tax_liability),
      last_seen = CURRENT_TIMESTAMP
    RETURNING (xmax = 0) AS inserted
  `,
    [
      client.caseNumber,
      client.name || null,
      client.firstName || null,
      client.middleName || null,
      client.lastName || null,
      client.email || null,
      client.phone || null,
      client.dob || null,
      client.ssn || null,
      client.address || null,
      client.aptNo || null,
      client.city || null,
      client.state || null,
      client.zip || null,
      client.irsLogicsStatus || null,
      client.statusId || null,
      client.taxType || null,
      client.maritalStatus || null,
      client.ein || null,
      client.businessName || null,
      client.businessAddress || null,
      client.businessType || null,
      client.taxLiability || null,
      client.submissionDate || null,
    ]
  );

  return result.rows[0]?.inserted ?? false;
}

/**
 * Bulk upsert clients from scrape
 */
export async function upsertClients(
  clients: ClientInsert[]
): Promise<{ inserted: number; updated: number }> {
  let inserted = 0;
  let updated = 0;

  for (const client of clients) {
    const wasInserted = await upsertClient(client);
    if (wasInserted) {
      inserted++;
    } else {
      updated++;
    }
  }

  return { inserted, updated };
}

// ===========================================
// Query Operations
// ===========================================

/**
 * Get pending clients ready for transcript pull
 */
export async function getPendingClients(limit = 10): Promise<Client[]> {
  const result = await query<Client>(
    `
    SELECT * FROM clients
    WHERE registry_type = 'active'
      AND status = 'pending'
      AND transcripts_pulled = FALSE
    ORDER BY first_seen ASC
    LIMIT $1
  `,
    [limit]
  );

  return result.rows;
}

/**
 * Get clients ready for SMS notification
 */
export async function getClientsForNotification(limit = 50): Promise<Client[]> {
  const result = await query<Client>(
    `
    SELECT * FROM clients
    WHERE status = 'success'
      AND sms_sent = FALSE
      AND phone IS NOT NULL
      AND phone != ''
    ORDER BY activities_created_date ASC
    LIMIT $1
  `,
    [limit]
  );

  return result.rows;
}

/**
 * Get problem children (failed > 1 month)
 */
export async function getProblemChildren(): Promise<Client[]> {
  const result = await query<Client>(`
    SELECT * FROM clients
    WHERE status = 'failed'
      AND registry_type = 'active'
      AND first_seen < CURRENT_TIMESTAMP - INTERVAL '1 month'
    ORDER BY first_seen ASC
  `);

  return result.rows;
}

/**
 * Get client by case number
 */
export async function getClient(caseNumber: string): Promise<Client | null> {
  const result = await query<Client>(
    "SELECT * FROM clients WHERE case_number = $1",
    [caseNumber]
  );

  return result.rows[0] || null;
}

// ===========================================
// Status Update Operations
// ===========================================

/**
 * Mark transcript as pulled
 */
export async function markTranscriptPulled(
  caseNumber: string,
  result: TranscriptResult
): Promise<void> {
  await query(
    `
    UPDATE clients SET
      transcripts_pulled = TRUE,
      transcript_tax_analysis = $2,
      transcript_wage_income = $3,
      last_attempt_date = CURRENT_TIMESTAMP,
      last_attempt_result = 'success'
    WHERE case_number = $1
  `,
    [caseNumber, result.taxAnalysis, result.wageIncome]
  );
}

/**
 * Record PDF analysis results
 */
export async function recordPdfAnalysis(
  caseNumber: string,
  analysis: PdfAnalysisResult
): Promise<void> {
  await query(
    `
    UPDATE clients SET
      current_liability = $2,
      years_unfiled = $3,
      collections_status = $4
    WHERE case_number = $1
  `,
    [
      caseNumber,
      analysis.currentLiability || null,
      analysis.yearsUnfiled || null,
      analysis.collectionsStatus || null,
    ]
  );
}

/**
 * Mark activities as created
 */
export async function markActivitiesCreated(
  caseNumber: string,
  result: ActivityResult
): Promise<void> {
  await query(
    `
    UPDATE clients SET
      activities_created = TRUE,
      activities_created_date = CURRENT_TIMESTAMP,
      activities_count = $2
    WHERE case_number = $1
  `,
    [caseNumber, result.count]
  );
}

/**
 * Mark client as success
 */
export async function markSuccess(caseNumber: string): Promise<void> {
  await query(
    `
    UPDATE clients SET
      status = 'success',
      last_attempt_date = CURRENT_TIMESTAMP,
      last_attempt_result = 'success'
    WHERE case_number = $1
  `,
    [caseNumber]
  );
}

/**
 * Mark client as failed
 */
export async function markFailed(
  caseNumber: string,
  message: string
): Promise<void> {
  await query(
    `
    UPDATE clients SET
      status = 'failed',
      last_attempt_date = CURRENT_TIMESTAMP,
      last_attempt_result = 'failed',
      last_attempt_message = $2
    WHERE case_number = $1
  `,
    [caseNumber, message]
  );
}

/**
 * Mark SMS as sent
 */
export async function markSmsSent(caseNumber: string): Promise<void> {
  await query(
    `
    UPDATE clients SET
      sms_sent = TRUE,
      sms_sent_date = CURRENT_TIMESTAMP
    WHERE case_number = $1
  `,
    [caseNumber]
  );
}

/**
 * Record IRS Logics status update
 */
export async function recordLogicsUpdate(
  caseNumber: string,
  oldStatus: string,
  newStatus: string
): Promise<void> {
  await query(
    `
    UPDATE clients SET
      logics_updated = TRUE,
      logics_old_status = $2,
      logics_new_status = $3,
      irs_logics_status = $3
    WHERE case_number = $1
  `,
    [caseNumber, oldStatus, newStatus]
  );
}

// ===========================================
// Registry Management Operations
// ===========================================

/**
 * Move successful clients to success bank
 */
export async function archiveSuccessful(): Promise<number> {
  const result = await query(`
    UPDATE clients
    SET registry_type = 'success_bank'
    WHERE status = 'success'
      AND registry_type = 'active'
  `);

  return result.rowCount || 0;
}

/**
 * Move problem children to problem child bank
 */
export async function archiveProblemChildren(): Promise<number> {
  const result = await query(`
    UPDATE clients
    SET registry_type = 'problem_child'
    WHERE status = 'failed'
      AND registry_type = 'active'
      AND first_seen < CURRENT_TIMESTAMP - INTERVAL '1 month'
  `);

  return result.rowCount || 0;
}

/**
 * Reactivate a client (move back to active)
 */
export async function reactivateClient(caseNumber: string): Promise<void> {
  await query(
    `
    UPDATE clients SET
      registry_type = 'active',
      status = 'pending',
      last_attempt_date = NULL,
      last_attempt_message = NULL,
      last_attempt_result = NULL
    WHERE case_number = $1
  `,
    [caseNumber]
  );
}

// ===========================================
// Stats Operations
// ===========================================

export interface ClientStats {
  total: number;
  active: number;
  successBank: number;
  problemChild: number;
  pending: number;
  success: number;
  failed: number;
  transcriptsPulled: number;
  activitiesCreated: number;
  smsSent: number;
}

/**
 * Get comprehensive stats
 */
export async function getStats(): Promise<ClientStats> {
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
  return {
    total: parseInt(row.total),
    active: parseInt(row.active),
    successBank: parseInt(row.success_bank),
    problemChild: parseInt(row.problem_child),
    pending: parseInt(row.pending),
    success: parseInt(row.success),
    failed: parseInt(row.failed),
    transcriptsPulled: parseInt(row.transcripts_pulled),
    activitiesCreated: parseInt(row.activities_created),
    smsSent: parseInt(row.sms_sent),
  };
}
