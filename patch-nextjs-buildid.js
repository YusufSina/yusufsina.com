// Patch script to fix Next.js build ID generation on Windows/WSL
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', 'next', 'dist', 'build', 'generate-build-id.js');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the problematic generate function call with a fallback
  content = content.replace(
    /let buildId = await generate\(\);/,
    `let buildId;
    try {
      buildId = await generate();
    } catch (e) {
      buildId = null;
    }`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched generate-build-id.js');
} else {
  console.log('File not found:', filePath);
}

