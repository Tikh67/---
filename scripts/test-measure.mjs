import { Resvg } from '@resvg/resvg-js'
import { decodePng, inkBBox, pxBBoxToUnits } from './pngutil.mjs'

const inner = '<circle cx="50" cy="50" r="41" fill="none" stroke="#111" stroke-width="9"/>'
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 100 100">${inner}</svg>`
const r = new Resvg(svg, { logLevel: 'warn' })
const png = r.render().asPng()
const img = decodePng(png)
console.log('png', img.width, img.height, img.bpp, 'bytes', png.length)
const bb = inkBBox(img)
console.log('px bbox', bb)
console.log('units bbox', pxBBoxToUnits(bb))
console.log('corner px', img.data[0], img.data[1], img.data[2], img.data[3])
