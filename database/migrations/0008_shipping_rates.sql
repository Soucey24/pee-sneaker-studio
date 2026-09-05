CREATE TABLE IF NOT EXISTS shipping_rates (
  location TEXT PRIMARY KEY COLLATE NOCASE,
  standard INTEGER NOT NULL CHECK (standard >= 0),
  express INTEGER NOT NULL CHECK (express >= 0),
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO shipping_rates (location, standard, express, updated_at) VALUES
  ('Accra', 12, 28, '2026-09-04'),
  ('Kumasi', 18, 35, '2026-09-04'),
  ('Other', 25, 45, '2026-09-04');