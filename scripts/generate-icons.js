const fs = require('fs');
const { execFileSync } = require('child_process');

function createSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#102216"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.45}" fill="rgba(19,236,91,0.15)"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.25}" fill="rgba(19,236,91,0.1)"/>
  <text x="${size/2}" y="${size*0.58}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${size*0.5}" fill="#13ec5b">P</text>
  <circle cx="${size*0.72}" cy="${size*0.3}" r="${size*0.035}" fill="#13ec5b"/>
</svg>`;
}

[192, 512].forEach(size => {
  const svgPath = `public/icons/icon-${size}.svg`;
  const pngPath = `public/icons/icon-${size}.png`;

  fs.writeFileSync(svgPath, createSVG(size));

  try {
    execFileSync('rsvg-convert', ['-w', String(size), '-h', String(size), svgPath, '-o', pngPath]);
    console.log(`Generated PNG: ${pngPath}`);
  } catch {
    try {
      execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath]);
      console.log(`Generated PNG via sips: ${pngPath}`);
    } catch {
      console.log(`Kept SVG as fallback: ${svgPath}`);
    }
  }
});
