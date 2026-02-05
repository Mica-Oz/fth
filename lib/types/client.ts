/**
 * Unified Client type
 * Combines fields from both automation_clients and logics_clients tables
 * Source of truth for client data structure across the entire application
 */

export type ClientStatus = "pending" | "success" | "failed";

export interface TranscriptUploads {
  taxAnalysis?: boolean;
  wageIncome?: boolean;
}

export interface PdfAnalysis {
  currentLiability?: number;
  yearsUnfiled?: number;
  collectionsStatus?: string;
  activitiesCreated?: boolean;
  taxAmountUpdated?: boolean;
}

export interface IrsLogicsUpdate {
  updated?: boolean;
  oldStatus?: string;
  newStatus?: string;
}

export interface CafCheck {
  status?: "pending" | "success" | "failed";
}

export interface LastAttemptDetails {
  transcriptUploads?: TranscriptUploads;
  pdfAnalysis?: PdfAnalysis;
  irsLogicsUpdate?: IrsLogicsUpdate;
  cafCheck?: CafCheck;
}

export interface Client {
  // Primary Key
  case_number: string;

  // Basic Info
  name?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  ssn?: string;

  // Address
  address?: string;
  apt_no?: string;
  city?: string;
  state?: string;
  zip?: string;

  // IRS Logics Data
  irs_logics_status?: string;
  status_id?: number;
  tax_type?: string;
  marital_status?: string;

  // Business Info (for business tax types)
  ein?: string;
  business_name?: string;
  business_address?: string;
  business_type?: string;
  tax_liability?: string;

  // Processing Status
  status?: ClientStatus;
  registry_type?: string;

  // Tracking
  date?: string; // Original submission date
  first_seen?: string;
  last_seen?: string;
  last_attempt_date?: string;
  last_attempt_message?: string;
  last_attempt_result?: string;
  last_attempt_details?: LastAttemptDetails;
  retry_after?: string;

  // Results
  transcripts_pulled?: boolean;
  activities_created?: boolean;
  activities_created_date?: string;
  activities_count?: number;

  // Timestamps
  created_at?: string;
  updated_at?: string;
  imported_at?: string;
}

/**
 * JSON Registry format (as used by automation scripts)
 */
export interface ClientRegistry {
  lastUpdated: string;
  clients: Record<string, RegistryClient>;
  stats: {
    total: number;
    success: number;
    failed: number;
    pending: number;
  };
}

/**
 * Client format in JSON registry (camelCase)
 * Used by automation scripts before DB sync
 */
export interface RegistryClient {
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
  statusID?: number;
  taxType?: string;
  maritalStatus?: string;
  ein?: string;
  businessName?: string;
  businessAddress?: string;
  businessType?: string;
  taxLiability?: string;
  status?: ClientStatus;
  registryType?: string;
  date?: string;
  firstSeen?: string;
  lastSeen?: string;
  lastAttemptDate?: string;
  lastAttemptMessage?: string;
  lastAttemptResult?: string;
  lastAttemptDetails?: LastAttemptDetails;
  retryAfter?: string;
  transcriptsPulled?: boolean;
  activitiesCreated?: boolean;
  activitiesCreatedDate?: string;
  activitiesCount?: number;
}

/**
 * Convert registry client (camelCase) to database client (snake_case)
 */
export function registryToDbClient(reg: RegistryClient): Client {
  return {
    case_number: reg.caseNumber,
    name: reg.name,
    first_name: reg.firstName,
    middle_name: reg.middleName,
    last_name: reg.lastName,
    email: reg.email,
    phone: reg.phone,
    dob: reg.dob,
    ssn: reg.ssn,
    address: reg.address,
    apt_no: reg.aptNo,
    city: reg.city,
    state: reg.state,
    zip: reg.zip,
    irs_logics_status: reg.irsLogicsStatus,
    status_id: reg.statusID,
    tax_type: reg.taxType,
    marital_status: reg.maritalStatus,
    ein: reg.ein,
    business_name: reg.businessName,
    business_address: reg.businessAddress,
    business_type: reg.businessType,
    tax_liability: reg.taxLiability,
    status: reg.status,
    registry_type: reg.registryType,
    date: reg.date,
    first_seen: reg.firstSeen,
    last_seen: reg.lastSeen,
    last_attempt_date: reg.lastAttemptDate,
    last_attempt_message: reg.lastAttemptMessage,
    last_attempt_result: reg.lastAttemptResult,
    last_attempt_details: reg.lastAttemptDetails,
    retry_after: reg.retryAfter,
    transcripts_pulled: reg.transcriptsPulled,
    activities_created: reg.activitiesCreated,
    activities_created_date: reg.activitiesCreatedDate,
    activities_count: reg.activitiesCount,
  };
}

/**
 * Convert database client (snake_case) to registry client (camelCase)
 */
export function dbToRegistryClient(db: Client): RegistryClient {
  return {
    caseNumber: db.case_number,
    name: db.name,
    firstName: db.first_name,
    middleName: db.middle_name,
    lastName: db.last_name,
    email: db.email,
    phone: db.phone,
    dob: db.dob,
    ssn: db.ssn,
    address: db.address,
    aptNo: db.apt_no,
    city: db.city,
    state: db.state,
    zip: db.zip,
    irsLogicsStatus: db.irs_logics_status,
    statusID: db.status_id,
    taxType: db.tax_type,
    maritalStatus: db.marital_status,
    ein: db.ein,
    businessName: db.business_name,
    businessAddress: db.business_address,
    businessType: db.business_type,
    taxLiability: db.tax_liability,
    status: db.status,
    registryType: db.registry_type,
    date: db.date,
    firstSeen: db.first_seen,
    lastSeen: db.last_seen,
    lastAttemptDate: db.last_attempt_date,
    lastAttemptMessage: db.last_attempt_message,
    lastAttemptResult: db.last_attempt_result,
    lastAttemptDetails: db.last_attempt_details,
    retryAfter: db.retry_after,
    transcriptsPulled: db.transcripts_pulled,
    activitiesCreated: db.activities_created,
    activitiesCreatedDate: db.activities_created_date,
    activitiesCount: db.activities_count,
  };
}
