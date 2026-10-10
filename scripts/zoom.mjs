// Zoom QA: render selected glyphs big, one per file, with the 0..100 local box,
// the centre cross and the reported ink bbox overlaid (in-file SVG user units).
// usage: node scripts/zoom.mjs <out.png> <px> <name> [name...]
import fs from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const [, , out, pxArg, ...names] = process.argv
const px = parseInt(pxArg || '700', 10)
const data = JSON.parse(fs.readFileSync('/workspace/refs/glyphs.json', 'utf8'))

const list = names.length ? names : Object.keys(data.glyphs)
const CELL = 100
const cols = Math.min(list.length, 3)
const rows = Math.ceil(list.length / cols)

let body = ''
list.forEach((n, i) => {
  const g = data.glyphs[n]
  if (!g) throw new Error('unknown glyph ' + n)
  const cx = (i % cols) * CELL
  const cy = Math.floor(i / cols) * CELL
  const b = g.inkBBox
  body +=
    `<g transform="translate(${cx} ${cy})">` +
    `<rect x="0" y="0" width="100" height="100" fill="#ffffff" stroke="#dfe3ea" stroke-width="0.4"/>` +
    `<path d="M${50} 46 h0 M46 50 h8 M50 46 v8" stroke="#c7cedb" stroke-width="0.6" fill="none"/>` +
    `<path d="M0 0 h100 v100 h-100 Z M0 50 h100 M50 0 v100" stroke="#eef1f5" stroke-width="0.3" fill="none"/>` +
    g.svg +
    `<rect x="${b[0]}" y="${b[1]}" width="${b[2] - b[0]}" height="${b[3] - b[1]}" fill="none" stroke="#e5484d" stroke-width="0.5" stroke-dasharray="3 2"/>` +
    `</g>`
})

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * CELL}" height="${rows * CELL}" viewBox="0 0 ${cols * CELL} ${rows * CELL}">` +
  `<rect width="${cols * CELL}" height="${rows * CELL}" fill="#f2f3f5"/>` +
  body +
  `</svg>`
const png = new Resvg(svg, { fitTo: { mode: 'width', value: px }, logLevel: 'error' }).render().asPng()
fs.writeFileSync(out, png)
console.log(`wrote ${out} (${list.join(', ')})`)
