// Verifies that glyphs.json markup really is inline-safe: composes every glyph into
// one bigger SVG at assorted translates / scales / rotations, with currentColor
// inherited from an ancestor group.
import fs from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const data = JSON.parse(fs.readFileSync('/workspace/refs/glyphs.json', 'utf8'))
const names = Object.keys(data.glyphs)
const W = 1100
const H = 620

let out = ''
names.forEach((n, i) => {
  const col = i % 5
  const row = Math.floor(i / 5)
  const cx = 110 + col * 220
  const cy = 155 + row * 300
  const s = 1.5 + (col % 2) * 0.35
  const rot = (col - 2) * 6
  out +=
    `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s}) translate(-50 -50)">` +
    data.glyphs[n].svg +
    `</g>`
})

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<rect width="${W}" height="${H}" fill="#ffffff"/>` +
  `<g color="#1b3a6b">${out}</g>` + // proves currentColor inheritance
  `</svg>`
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1400 }, logLevel: 'error' }).render().asPng()
fs.writeFileSync('/tmp/inline.png', png)
console.log('wrote /tmp/inline.png')
