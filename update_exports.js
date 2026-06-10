const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const env = fs.readFileSync('.env.local', 'utf8')
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim()

const supabase = createClient(supabaseUrl, supabaseKey)

const exportProducts = [
  {
    name: 'Premium Export Bananas',
    category: '100% Organic',
    description: 'Hand-harvested, premium Cavendish bananas from the rich soils of Uganda, ready for global shipping.',
    image_url: '/images/banana_export.jpg',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  },
  {
    name: 'Export-Grade Avocados',
    category: '48H Global Export',
    description: 'Hand-picked premium Hass avocados, expedited worldwide directly from our organic farms.',
    image_url: '/images/avocado_export.jpg',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  },
  {
    name: 'Organic Ginger Root',
    category: 'Direct Farm',
    description: 'Intensely flavorful, raw organic ginger roots harvested at peak maturity for international export.',
    image_url: '/images/ginger_export.jpg',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  },
  {
    name: 'Fresh Tropical Mangoes',
    category: 'Pure Nature',
    description: 'Sun-ripened, naturally sweet tropical mangoes, carefully packaged to preserve farm-fresh quality.',
    image_url: '/images/mango_export.jpg',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  },
  {
    name: 'Premium Pineapples',
    category: 'Global Export',
    description: 'Juicy, vibrant Ugandan pineapples known globally for their exceptional sweetness and low acidity.',
    image_url: '/images/pineapple_export.jpg',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  },
  {
    name: 'Robusta Coffee Beans',
    category: 'Ugandan Heritage',
    description: 'The finest authentic Robusta coffee beans from the heart of Uganda, prepared for international export.',
    image_url: '/images/coffee_robusta.png',
    is_featured: false,
    stock_status: 'in_stock',
    metadata: { is_export: true }
  }
]

async function updateDb() {
  // First, delete old export products
  console.log('Deleting old exports...')
  await supabase.from('products').delete().contains('metadata', { is_export: true })

  // Then insert the new flawless products
  console.log('Inserting new exports...')
  const { data, error } = await supabase.from('products').insert(exportProducts)
  
  if (error) {
    console.error('Error inserting:', error)
  } else {
    console.log('Successfully updated Supabase Database!')
  }
}

updateDb()
