import { createClient } from '@supabase/supabase-js'

// Check if environment variables are defined
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY  // Fixed typo here
)