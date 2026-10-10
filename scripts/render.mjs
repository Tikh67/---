// SVG -> PNG renderer for visual QA of the artwork.
// Usage: node scripts/render.mjs <in.svg> <out.png> [width] [cropX,cropY,cropW,cropH]
import { Resvg } from '@resvg/resvg-js'
import fs from 'node:fs'

const [, , inPath, outPath, widthArg, cropArg] = process.argv
if (!inPath || !outPath) {
  console.error('usage: node scripts/render.mjs <in.svg> <out.png> [width] [x,y,w,h]')
  process.exit(2)
}

const svg = fs.readFileSync(inPath, 'utf8')
const width = widthArg ? parseInt(widthArg, 10) : 1600

const opts = {
  background: '#f2f3f5',
  fitTo: { mode: 'width', value: width },
  logLevel: 'warn',
  font: { loadSystemFonts: false, defaultFontFamily: 'sans-serif' },
}

if (cropArg) {
  const [x, y, w, h] = cropArg.split(',').map((n) => parseFloat(n))
  opts.crop = { left: x, top: y, right: x + w, bottom: y + h }
}

const resvg = new Resvg(svg, opts)
const png = resvg.render().asPng()
fs.writeFileSync(outPath, png)
console.log(`wrote ${outPath} (${png.length} bytes, ${resvg.width}x${resvg.height})`)
