import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function manageProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true })
  if (error) {
    console.error(error)
    return
  }
  
  console.log(`Total products currently in DB: ${data.length}`)
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
    for (const d of duplicates) {
      console.log(`Deleting duplicate: ${d.name} (id: ${d.id})`)
      await supabase.from('products').delete().eq('id', d.id)
    }
  }
  
  // Now add fallback products if they don't exist
  const fallbackProducts = [
    {
      name: 'Premium Banana Juice',
      category: 'Banana Juice',
      description: '100% organic, cold-pressed banana juice, capturing the sweet, pure essence of Ugandan harvests.',
      image_url: '/images/export_banana_juice.png',
      is_featured: true,
      stock_status: 'in_stock'
    },
    {
      name: 'Banana Smoothie',
      category: 'Banana Smoothie',
      description: 'A rich, creamy, and naturally sweet banana smoothie blended for maximum organic nutrition.',
      image_url: '/images/export_banana_smoothie.png',
      is_featured: false,
      stock_status: 'in_stock'
    },
    {
      name: 'Artisan Banana Chips',
      category: 'Dried Banana Chips',
      description: 'Crispy, golden-baked artisan banana chips, lightly sweetened for the perfect healthy organic snack.',
      image_url: '/images/export_banana_chips.png',
      is_featured: false,
      stock_status: 'in_stock'
    },
    {
      name: 'Organic Banana Milk',
      category: 'Banana Milk',
      description: 'Dairy-free, naturally sweet plant-based banana milk, exceptionally rich in potassium and flavor.',
      image_url: '/images/nectar.png',
      is_featured: false,
      stock_status: 'in_stock'
    }
  ];

  for (const fallback of fallbackProducts) {
    if (!names.has(fallback.name)) {
      console.log(`Inserting fallback product: ${fallback.name}`)
      await supabase.from('products').insert([fallback])
    }
  }
  
  console.log("Done")
}

manageProducts()
