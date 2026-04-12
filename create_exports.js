const fs = require('fs');
const path = require('path');

const srcFile = 'src/app/admin/products/page.tsx';
const destDir = 'src/app/admin/exports';
const destFile = path.join(destDir, 'page.tsx');

let content = fs.readFileSync(srcFile, 'utf8');

// Replace identifiers
content = content.replace(/AdminProducts/g, 'AdminExports');
content = content.replace(/Products/g, 'Exports');
content = content.replace(/Product/g, 'Export Product');
// Don't replace lowercase products everywhere, just change the query

// Update the fetch logic to only fetch exports
content = content.replace(
  /const { data, error } = await supabase\.from\('products'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\)/,
  "const { data, error } = await supabase.from('products').select('*').contains('metadata', {is_export: true}).order('created_at', { ascending: false })"
);

// Update realtime subscription channel
content = content.replace(
  /\.channel\('admin-products-realtime'\)/,
  ".channel('admin-exports-realtime')"
);

// Add metadata when saving
content = content.replace(
  /const payload: any = \{/,
  "const payload: any = {\n      metadata: { is_export: true },"
);

// Modify categories array inside the select box
content = content.replace(
  /<option value="Banana Juice">Banana Juice<\/option>\s*<option value="Banana Smoothie">Banana Smoothie<\/option>\s*<option value="Banana Milk">Banana Milk<\/option>\s*<option value="Dried Banana Chips">Dried Banana Chips<\/option>\s*<option value="Fresh Produce">Fresh Produce<\/option>/,
  '<option value="Fresh Produce">Fresh Produce</option><option value="Spices & Roots">Spices & Roots</option>'
);

// Initial category state
content = content.replace(
  /setCategory\('Banana Juice'\)/g,
  "setCategory('Fresh Produce')"
);

fs.mkdirSync(destDir, { recursive: true });
fs.writeFileSync(destFile, content);
console.log('Successfully created export module!');
