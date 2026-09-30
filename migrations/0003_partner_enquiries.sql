CREATE TABLE IF NOT EXISTS partner_enquiries (
  id TEXT PRIMARY KEY NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_website TEXT NOT NULL DEFAULT '',
  partnership_types_json TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL,
  team_notification_status TEXT NOT NULL DEFAULT 'pending' CHECK (team_notification_status IN ('pending', 'sent', 'failed')),
  team_notification_message_id TEXT,
  confirmation_status TEXT NOT NULL DEFAULT 'pending' CHECK (confirmation_status IN ('pending', 'sent', 'failed')),
  confirmation_message_id TEXT
);

CREATE INDEX IF NOT EXISTS partner_enquiries_submitted_at_idx
  ON partner_enquiries (submitted_at DESC);
