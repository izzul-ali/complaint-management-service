import { createClient } from "@supabase/supabase-js"
import { supabaseKey, supabaseUrl } from "./environtment"

export const supabase = createClient(supabaseUrl, supabaseKey)
