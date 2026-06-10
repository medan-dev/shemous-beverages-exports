const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pnqirvkijktqjjzwcjod.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWlydmtpamt0cWpqendjam9kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NTg1OSwiZXhwIjoyMDkwNjUxODU5fQ.l37WkkFhe8ckjoWB8unS6MEBp2xFzBf0vuhUxm4tldM');

(async () => {
  try {
    const r1 = await supabase.from('products').update({ image_url: '/images/nectar.png' }).eq('name', 'Classic Banana Nectar');
    const r2 = await supabase.from('products').update({ image_url: '/images/smoothie.png' }).eq('name', 'Tropical Banana Smoothie');
    const r3 = await supabase.from('products').update({ image_url: '/images/milk.png' }).eq('name', 'Organic Banana Milk');
    const r4 = await supabase.from('products').update({ image_url: '/images/chips.png' }).eq('name', 'Dried Banana Chips');
    
    console.log('Database product URLs updated to local paths successfully!');
  } catch(e) {
    console.error('Error updating DB:', e);
  }
})();
