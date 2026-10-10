// Legibility check: every glyph at 60px and 28px, no guides, on white.
import fs from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const data = JSON.parse(fs.readFileSync('/workspace/refs/glyphs.json', 'utf8'))
const names = Object.keys(data.glyphs)
const sizes = [60, 28]
let out = ''
sizes.forEach((sz, r) => {
  names.forEach((n, i) => {
    const x = 20 + i * (sz + 14)
    const y = 20 + r * (sz + 30)
    out +=
      `<g transform="translate(${x} ${y}) scale(${sz / 100})">` + data.glyphs[n].svg + `</g>`
  })
})
const W = 20 * 2 + names.length * (60 + 14)
const H = 20 * 2 + 60 + 30 + 28
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<rect width="${W}" height="${H}" fill="#ffffff"/><g color="#111111">${out}</g></svg>`
fs.writeFileSync('/tmp/small.png', new Resvg(svg, { fitTo: { mode: 'width', value: W * 3 }, logLevel: 'error' }).render().asPng())
console.log('wrote /tmp/small.png')
