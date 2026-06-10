const fs = require('fs');
const path = 'C:\\Users\\NSHUTI MEDAN\\.gemini\\antigravity-ide\\brain\\73b02e2f-aa41-4a63-ab4e-88cbc16b5618\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const parsed = JSON.parse(line);
    if (parsed.type === 'ACTION_RESPONSE' || parsed.type === 'TOOL_RESPONSE' || parsed.type === 'PLANNER_RESPONSE') {
      const output = JSON.stringify(parsed);
      if (output.includes('FeaturedProducts.tsx') && output.includes('const displayProducts')) {
        fs.writeFileSync('C:\\Users\\NSHUTI MEDAN\\Downloads\\projects-main\\projects-main\\Shemous beverages and exports\\old_featured.txt', output);
      }
    }
  } catch (e) {}
}
console.log('Done.');
