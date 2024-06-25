import * as dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config();
console.log(process.env);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
export default supabase;