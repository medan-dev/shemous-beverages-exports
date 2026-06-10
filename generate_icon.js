const fs = require('fs');

// Read the PNG
const imageBuffer = fs.readFileSync('public/images/shemous_logo_master_transparent.png');
const base64Data = imageBuffer.toString('base64');

// Create the SVG content
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <style>
    image { filter: brightness(0); } /* Black by default for light theme */
    @media (prefers-color-scheme: dark) {
      image { filter: none; } /* White/Original for dark theme */
    }
  </style>
  <image href="data:image/png;base64,${base64Data}" width="500" height="500" />
</svg>`;

// Write to src/app/icon.svg
fs.writeFileSync('src/app/icon.svg', svgContent);
console.log('Created src/app/icon.svg successfully!');
