CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add an index for faster lookups on ip_address
CREATE UNIQUE INDEX IF NOT EXISTS visitors_ip_address_idx ON visitors (ip_address);

-- Optional: Enable Row Level Security (RLS) and create a policy for public read/insert
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert their IP if it doesn't exist
CREATE POLICY "Allow insert for unique IPs" ON visitors
  FOR INSERT WITH CHECK (true);

-- Policy to allow anonymous users to read the total count
CREATE POLICY "Allow read access for all users" ON visitors
  FOR SELECT USING (true);
