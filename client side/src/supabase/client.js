import { createClient } from '@supabase/supabase-js'

// Use a custom domain as the supabase URL
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);