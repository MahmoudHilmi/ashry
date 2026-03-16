import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://slmgkxjktjwmmydpeddm.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbWdreGprdGp3bW15ZHBlZGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDIxMTgsImV4cCI6MjA4ODk3ODExOH0.4PTJJFBbd6vJU3YyVKjmd_qppq_V27MsM80Pn_KkylY"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);