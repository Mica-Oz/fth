-- ===========================================
-- FTH Unified Clients Schema
-- Single table for all client data
-- ===========================================

-- Drop old tables if migrating
-- DROP TABLE IF EXISTS logics_clients;
-- DROP TABLE IF EXISTS automation_clients;

CREATE TABLE IF NOT EXISTS clients (
  -- Primary Key
  case_number VARCHAR(50) PRIMARY KEY,

  -- Basic Info
  name VARCHAR(255),
  first_name VARCHAR(255),
  middle_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  dob VARCHAR(50),
  ssn VARCHAR(50),

  -- Address
  address TEXT,
  apt_no VARCHAR(50),
  city VARCHAR(255),
  state VARCHAR(10),
  zip VARCHAR(20),

  -- IRS Logics Data
  irs_logics_status TEXT,
  status_id INTEGER,
  tax_type VARCHAR(100),
  marital_status VARCHAR(50),

  -- Business Info
  ein VARCHAR(50),
  business_name VARCHAR(255),
  business_address TEXT,
  business_type VARCHAR(100),
  tax_liability VARCHAR(100),

  -- Processing Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  registry_type VARCHAR(50) DEFAULT 'active' CHECK (registry_type IN ('active', 'success_bank', 'problem_child')),

  -- Tracking
  submission_date VARCHAR(50),  -- Original submission date from IRS Logics
  first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_attempt_date TIMESTAMP,
  last_attempt_message TEXT,
  last_attempt_result VARCHAR(100),
  retry_after TIMESTAMP,

  -- Transcript Processing
  transcripts_pulled BOOLEAN DEFAULT FALSE,
  transcript_tax_analysis BOOLEAN DEFAULT FALSE,
  transcript_wage_income BOOLEAN DEFAULT FALSE,

  -- PDF Analysis Results
  current_liability NUMERIC(12, 2),
  years_unfiled INTEGER,
  collections_status VARCHAR(100),

  -- Activity Creation
  activities_created BOOLEAN DEFAULT FALSE,
  activities_created_date TIMESTAMP,
  activities_count INTEGER DEFAULT 0,

  -- IRS Logics Update Tracking
  logics_updated BOOLEAN DEFAULT FALSE,
  logics_old_status VARCHAR(100),
  logics_new_status VARCHAR(100),

  -- CAF Check
  caf_status VARCHAR(20) CHECK (caf_status IN ('pending', 'success', 'failed')),

  -- Notifications
  sms_sent BOOLEAN DEFAULT FALSE,
  sms_sent_date TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_registry_type ON clients(registry_type);
CREATE INDEX IF NOT EXISTS idx_clients_status_id ON clients(status_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_first_seen ON clients(first_seen);
CREATE INDEX IF NOT EXISTS idx_clients_tax_type ON clients(tax_type);

-- Composite index for active pending clients (main automation query)
CREATE INDEX IF NOT EXISTS idx_clients_active_pending
  ON clients(registry_type, status)
  WHERE registry_type = 'active' AND status = 'pending';

-- ===========================================
-- Useful Views
-- ===========================================

-- Active clients needing processing
CREATE OR REPLACE VIEW active_clients AS
SELECT * FROM clients
WHERE registry_type = 'active'
ORDER BY first_seen ASC;

-- Pending clients ready for transcript pull
CREATE OR REPLACE VIEW pending_transcripts AS
SELECT * FROM clients
WHERE registry_type = 'active'
  AND status = 'pending'
  AND transcripts_pulled = FALSE
ORDER BY first_seen ASC;

-- Success clients ready for notification
CREATE OR REPLACE VIEW ready_for_notification AS
SELECT * FROM clients
WHERE status = 'success'
  AND sms_sent = FALSE
  AND phone IS NOT NULL
  AND phone != ''
ORDER BY activities_created_date ASC;

-- Failed clients older than 1 month (problem children)
CREATE OR REPLACE VIEW problem_children AS
SELECT * FROM clients
WHERE status = 'failed'
  AND registry_type = 'active'
  AND first_seen < CURRENT_TIMESTAMP - INTERVAL '1 month'
ORDER BY first_seen ASC;

-- ===========================================
-- Helper Functions
-- ===========================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- Common Operations (for reference)
-- ===========================================

-- Move successful clients to success bank:
-- UPDATE clients SET registry_type = 'success_bank' WHERE status = 'success' AND registry_type = 'active';

-- Move problem children (failed > 1 month):
-- UPDATE clients SET registry_type = 'problem_child' WHERE status = 'failed' AND registry_type = 'active' AND first_seen < CURRENT_TIMESTAMP - INTERVAL '1 month';

-- Get next batch of pending clients:
-- SELECT * FROM pending_transcripts LIMIT 10;

-- Mark transcript as pulled:
-- UPDATE clients SET transcripts_pulled = TRUE, transcript_tax_analysis = TRUE, last_attempt_date = CURRENT_TIMESTAMP WHERE case_number = $1;

-- Mark as success:
-- UPDATE clients SET status = 'success', activities_created = TRUE, activities_created_date = CURRENT_TIMESTAMP, activities_count = $2 WHERE case_number = $1;

-- Mark as failed:
-- UPDATE clients SET status = 'failed', last_attempt_message = $2, last_attempt_result = 'failed' WHERE case_number = $1;
