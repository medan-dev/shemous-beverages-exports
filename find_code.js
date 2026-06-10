const fs = require('fs');
const path = 'C:\\Users\\NSHUTI MEDAN\\.gemini\\antigravity-ide\\brain\\73b02e2f-aa41-4a63-ab4e-88cbc16b5618\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const parsed = JSON.parse(line);
    if (parsed.tool_calls) {
      for (const call of parsed.tool_calls) {
        if (call.response && call.response.output) {
          if (typeof call.response.output === 'string') {
            if (call.response.output.includes('WhatsApp')) {
               console.log('Found WhatsApp in tool call:', call.name);
               fs.appendFileSync('C:\\Users\\NSHUTI MEDAN\\Downloads\\projects-main\\projects-main\\Shemous beverages and exports\\found_code.txt', call.response.output + '\n\n-----------------\n\n');
            }
          }
        }
      }
    }
  } catch (e) {}
}
console.log('Done searching.');
