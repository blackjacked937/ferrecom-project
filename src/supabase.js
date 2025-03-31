import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxdmidgajisxilveypcm.supabase.co";  
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZG1pZGdhamlzeGlsdmV5cGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTk1MDcsImV4cCI6MjA1ODQzNTUwN30.tl6rOxZEzwcp70UCJKAgGadpd39eHnujbuEZacjoIwo";  // Reemplaza con tu API Key pública

export const supabase = createClient(supabaseUrl, supabaseKey);
