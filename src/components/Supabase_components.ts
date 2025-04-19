import { createClient } from "@supabase/supabase-js";
import { Database } from '../types/database.types'

if(!process.env.supabaseUrl || !process.env.supabaseKey) {
  throw new Error("Supabase URL and Key must be provided in environment variables");
}
export const supabase = createClient<Database>(process.env.supabaseUrl??'', process.env.supabaseKey??'')

