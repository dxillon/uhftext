-- Drop existing objects if they exist
DROP VIEW IF EXISTS payment_analytics;
DROP INDEX IF EXISTS idx_payment_events_payment_id;
DROP TABLE IF EXISTS payment_events CASCADE;

-- Create payment events table
CREATE TABLE IF NOT EXISTS payment_events (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  event_type TEXT NOT NULL,
  payment_id TEXT NOT NULL,
  status TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  email TEXT NOT NULL,
  raw_data JSONB NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payment_events_payment_id ON payment_events(payment_id);

-- Enable RLS
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON payment_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON payment_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create view for payment analytics
CREATE OR REPLACE VIEW payment_analytics AS
SELECT 
  date_trunc('day', created_at) as date,
  status,
  COUNT(*) as count,
  SUM(amount) as total_amount
FROM payment_events
GROUP BY 1, 2
ORDER BY 1 DESC;