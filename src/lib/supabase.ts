import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pmvidjjauvosqfuxkrrg.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdmlkamphdXZvc3FmdXhrcnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTg2ODUsImV4cCI6MjA5NDc3NDY4NX0.EgwZ22dzqszaa5k7otSHztdJ9SMEk29sCZ0j-3YzPGU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
