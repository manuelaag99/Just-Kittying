import { createClient } from '@supabase/supabase-js'

// Use a custom domain as the supabase URL
export const supabase = createClient();