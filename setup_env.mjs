import fs from 'fs'
import readline from 'readline'
import path from 'path'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function setup() {
  console.log('\x1b[36m%s\x1b[0m', '\n🚀 Shemous Beverages & Exports - Environment Setup\n')

  const envFile = path.resolve(process.cwd(), '.env.local')
  const envExampleFile = path.resolve(process.cwd(), '.env.example')

  // Load example values if available
  let exampleUrl = ''
  let exampleKey = ''
  
  if (fs.existsSync(envExampleFile)) {
    const exampleContent = fs.readFileSync(envExampleFile, 'utf8')
    exampleUrl = exampleContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1] || ''
    exampleKey = exampleContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)?.[1] || ''
  }

  const supabaseUrl = await question(`Enter Supabase URL [${exampleUrl}]: `) || exampleUrl
  const supabaseAnonKey = await question(`Enter Supabase Anon Key [${exampleKey}]: `) || exampleKey
  const adminKey = await question(`Enter Admin Secret Key (PORTAL_ADMIN_KEY): `) || 'dev-secret-123'

  const envContent = `# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}

# Admin Configuration
PORTAL_ADMIN_KEY=${adminKey}
`

  try {
    fs.writeFileSync(envFile, envContent)
    console.log('\x1b[32m%s\x1b[0m', `\n✅ Successfully created .env.local`)
    console.log('\nNext steps:')
    console.log('1. Run "npm run dev" to start your local server.')
    console.log('2. Add these same keys to your Vercel Project Settings for production.')
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', `\n❌ Failed to write .env.local: ${err.message}`)
  }

  rl.close()
}

setup()
