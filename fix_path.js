const fs = require('fs');

const data = fs.readFileSync('build/manifest.json', 'utf8');

const result = data.replace(/\\/g, '/');

fs.writeFileSync('build/manifest.json', result);