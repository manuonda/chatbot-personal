import * as dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
export default supabase;