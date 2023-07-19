import { createClient } from '@supabase/supabase-js'

// Use a custom domain as the supabase URL
export const supabase = createClient("https://xdptfdetbbbkblxvtuhu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcHRmZGV0YmJia2JseHZ0dWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0OTgwMzUsImV4cCI6MjAwNDA3NDAzNX0.paiLa7aOe0FnYytN43opco0NPzP72kZKPWkGxTSVQdw");