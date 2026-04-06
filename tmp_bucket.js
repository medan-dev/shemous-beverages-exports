const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://pnqirvkijktqjjzwcjod.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWlydmtpamt0cWpqendjam9kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NTg1OSwiZXhwIjoyMDkwNjUxODU5fQ.l37WkkFhe8ckjoWB8unS6MEBp2xFzBf0vuhUxm4tldM'
);

(async () => {
  const { data, error } = await supabase.storage.getBucket('products');
  if (error) {
     console.error('Bucket Error:', error);
     const { data: b, error: e } = await supabase.storage.createBucket('products', { public: true });
     console.log('Created Bucket:', b, e);
  } else {
     console.log('Bucket exists:', data);
  }
})();
