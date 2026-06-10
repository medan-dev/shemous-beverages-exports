import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDuplicates() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error(error)
    return
  }
  
  console.log(`Total products: ${data.length}`)
  const names = new Set()
  const duplicates = []
  
  for (const product of data) {
    if (names.has(product.name)) {
      duplicates.push(product)
    } else {
      names.add(product.name)
    }
  }
  
  console.log(`Found ${duplicates.length} duplicates.`)
  if (duplicates.length > 0) {
    console.log('Duplicates:', duplicates.map(d => ({ id: d.id, name: d.name })))
  }
}

checkDuplicates()
