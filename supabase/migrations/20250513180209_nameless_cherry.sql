/*
  # Create payment events table

  1. New Tables
    - `payment_events`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `event_type` (text)
      - `payment_id` (text)
      - `order_id` (text)
      - `status` (text)
      - `amount` (numeric)
      - `email` (text)
      - `raw_data` (jsonb)

  2. Security
    - Enable RLS on `payment_events` table
    - Add policy for authenticated users to read their own payment events
*/

CREATE TABLE IF NOT EXISTS payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  event_type text NOT NULL,
  payment_id text,
  order_id text,
  status text,
  amount numeric,
  email text,
  raw_data jsonb
);

ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payment events"
  ON payment_events
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);