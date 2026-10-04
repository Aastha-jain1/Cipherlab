CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS operations (
  id BIGSERIAL PRIMARY KEY, user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  algorithm VARCHAR(32) NOT NULL, operation VARCHAR(16) NOT NULL CHECK (operation IN ('encrypt', 'decrypt', 'hash')),
  input_length INTEGER NOT NULL CHECK (input_length >= 0), output_length INTEGER NOT NULL CHECK (output_length >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS operations_created_at_idx ON operations (created_at DESC);
