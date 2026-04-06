import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pnqirvkijktqjjzwcjod.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWlydmtpamt0cWpqendjam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzU4NTksImV4cCI6MjA5MDY1MTg1OX0.tC2yv4udUzj1EGYfhRH6ZtEuOkCHKVNgE-rEcqk8W6Y'
);

async function sanitize() {
  console.log('--- Fetching all products for sanitation ---');
  const { data: products, error } = await supabase.from('products').select('id, name, image_url');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products. Checking for corruption...`);

  for (const product of products) {
    console.log(`Checking [${product.name}]: "${product.image_url}"`);
    if (product.image_url && /[\s\n\r\t]/.test(product.image_url)) {
      const cleanUrl = product.image_url.replace(/[\s\n\r\t]/g, '');
      console.log(`  -> Sanitizing to: "${cleanUrl}"`);
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: cleanUrl })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Failed to sanitize ${product.name}:`, updateError.message);
      } else {
        console.log(`Successfully sanitized ${product.name}.`);
      }
    }
  }

  console.log('--- Sanitation complete ---');
}

sanitize();
