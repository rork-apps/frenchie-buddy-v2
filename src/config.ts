// Public backend config. Both values are PUBLIC by design (anon key is RLS-gated).
// Read from env first (EXPO_PUBLIC_* is inlined at build); fall back to the shared
// public values from database-credentails/supabase-shared-credentials.md.
export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "https://supabase.apppublishing.ai";

export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLXNlbGYtaG9zdGVkIiwiaWF0IjoxNzgwNjAyMjI2LCJleHAiOjQxMDI0NDQ4MDB9.AmDH0NbkuDHPi61_1udNgCtpbURbtqw2yNK5UIK-sws";

export const APP_SCHEMA = "frenchie_buddy";
