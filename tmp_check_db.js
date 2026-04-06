const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://pnqirvkijktqjjzwcjod.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWlydmtpamt0cWpqendjam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzU4NTksImV4cCI6MjA5MDY1MTg1OX0.tC2yv4udUzj1EGYfhRH6ZtEuOkCHKVNgE-rEcqk8W6Y'
);

(async () => {
  const { data, error } = await supabase.from('products').select('id, name, image_url');
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
})();
