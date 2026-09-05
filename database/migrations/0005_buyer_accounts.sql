CREATE TABLE IF NOT EXISTS buyer_accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS buyer_sessions (
  token_hash TEXT PRIMARY KEY,
  buyer_id TEXT NOT NULL REFERENCES buyer_accounts(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS buyer_sessions_expiry_idx ON buyer_sessions(expires_at);