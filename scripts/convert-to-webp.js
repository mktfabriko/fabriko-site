const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  'public/fotos',
  'public/items',
  'public/linhas',
];

async function convertDir(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace('.png', '.webp'));
    await sharp(input).webp({ quality: 82 }).toFile(output);
    const before = fs.statSync(input).size;
    const after = fs.statSync(output).size;
    console.log(`${file}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${Math.round((1-after/before)*100)}%)`);
  }
}

(async () => {
  for (const dir of dirs) convertDir(dir);
})();
