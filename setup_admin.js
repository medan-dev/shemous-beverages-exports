const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const env = fs.readFileSync('.env.local', 'utf8')
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim()

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupAdmin() {
  console.log('Attempting to create admin user...')
  const { data, error } = await supabase.auth.signUp({
    email: 'medancityvybz@gmail.com',
    password: 'shemtrust@33#',
  })
  
  if (error) {
    console.error('Error creating user:', error.message)
  } else {
    console.log('User created successfully:', data.user?.email)
    console.log('Session exists (meaning no email confirmation required):', !!data.session)
  }
}

setupAdmin()
