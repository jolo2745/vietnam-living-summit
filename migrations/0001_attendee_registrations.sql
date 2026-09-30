CREATE TABLE IF NOT EXISTS attendee_registrations (
  id TEXT PRIMARY KEY NOT NULL,
  registered_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT NOT NULL,
  residency_status TEXT NOT NULL,
  role TEXT NOT NULL,
  interests_json TEXT NOT NULL,
  heard_from TEXT NOT NULL,
  future_updates INTEGER NOT NULL DEFAULT 0 CHECK (future_updates IN (0, 1)),
  consultation TEXT NOT NULL,
  consultation_area TEXT NOT NULL DEFAULT '',
  consultation_question TEXT NOT NULL DEFAULT '',
  urgency TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'en',
  confirmation_status TEXT NOT NULL DEFAULT 'pending' CHECK (confirmation_status IN ('pending', 'sent', 'failed')),
  confirmation_message_id TEXT
);

CREATE INDEX IF NOT EXISTS attendee_registrations_registered_at_idx
  ON attendee_registrations (registered_at DESC);
