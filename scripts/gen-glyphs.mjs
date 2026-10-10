// Generates refs/glyphs.svg (QA sheet) and refs/glyphs.json (inline-ready glyph kit).
// Every glyph is authored in a 100x100 local box; its ink bbox is measured from a
// real render and the glyph is auto-scaled/centred so the ink bbox is centred in the box.
import fs from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { decodePng, inkBBox, pxBBoxToUnits } from './pngutil.mjs'
import { roundRect, roundPoly, offsetConvex, f } from './geom.mjs'

const PX = 3200 // measurement render size (px)
const SPAN = 300 // units covered by the measurement viewport
const ORIGIN = -100 // viewport starts here, so ink outside 0..100 is still seen
const INK = '#101114'

// ---------------------------------------------------------------- geometry ---
const T = 9 // uniform PlayStation shape weight (of 100)

// A. triangle ---------------------------------------------------------------
const triOuter = [
  [50, 8.8],
  [97, 88],
  [3, 88],
]
const triInner = offsetConvex(triOuter, T)
const triangleRaw = () =>
  `<path d="${roundPoly(triOuter, 10.7)} ${roundPoly(triInner, 1)}" fill="currentColor" fill-rule="evenodd"/>`

// B. circle -----------------------------------------------------------------
const circleRaw = () =>
  `<circle cx="50" cy="50" r="36.5" fill="none" stroke="currentColor" stroke-width="${T}"/>`

// C. cross ------------------------------------------------------------------
const CROSS_L = 104
const CROSS_W = 18
const crossRaw = () =>
  `<g transform="translate(50 50)" fill="currentColor">` +
  `<rect x="${-CROSS_L / 2}" y="${-CROSS_W / 2}" width="${CROSS_L}" height="${CROSS_W}" rx="${CROSS_W / 2}" transform="rotate(45)"/>` +
  `<rect x="${-CROSS_L / 2}" y="${-CROSS_W / 2}" width="${CROSS_L}" height="${CROSS_W}" rx="${CROSS_W / 2}" transform="rotate(-45)"/>` +
  `</g>`

// D. square -----------------------------------------------------------------
const squareRaw = () =>
  `<path d="${roundRect(10, 10, 90, 90, 12)} ${roundRect(19, 19, 81, 81, 3)}" fill="currentColor" fill-rule="evenodd"/>`

// E. ps-logo ----------------------------------------------------------------
// P: upright (pre-shear) italic-capital letter.  stem x 8..23, cap 14..88,
// bowl out to x=64 with a 15-unit wall (= stem width), counter 23..49 x 29..45.
const P_PATH =
  'M8 14 H49 A15 15 0 0 1 64 29 V46 A15 15 0 0 1 49 61 H23 V88 H8 Z ' +
  'M23 27 H41 A8 8 0 0 1 49 35 V38.5 A8 8 0 0 1 41 46.5 H23 Z'
// S: two tangent 11-unit-radius arcs (upper lobe CCW, lower lobe CW) joined by the
// S's middle diagonal; stroked 12, round terminals.  cap ~62 (84% of the P).
const S_PATH =
  'M87.43 36.43 A11 11 0 0 0 71.93 51.93 L88.07 62.07 A11 11 0 1 1 70.66 74.26'
const PS_SHEAR = 0.24 // italic slant
const PS_BASE = 88 // baseline the shear pivots about
const psLogoRaw = () =>
  `<g transform="matrix(1 0 ${-PS_SHEAR} 1 ${f(PS_SHEAR * PS_BASE)} 0)">` +
  `<defs><mask id="pslogoGap" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-160" y="-160" width="480" height="480">` +
  `<rect x="-160" y="-160" width="480" height="480" fill="#fff"/>` +
  `<path d="${P_PATH}" fill="#000" fill-rule="evenodd" stroke="#000" stroke-width="3" stroke-linejoin="round"/>` +
  `</mask></defs>` +
  `<g mask="url(#pslogoGap)"><path d="${S_PATH}" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/></g>` +
  `<path d="${P_PATH}" fill="currentColor" fill-rule="evenodd"/>` +
  `</g>`

// F. create -----------------------------------------------------------------
// links are trimmed to the node perimeters so they do not show inside the rings
const createRaw = () =>
  `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">` +
  `<path d="M32.6 46.4 L67.4 27.6 M32.6 53.6 L67.4 72.4"/>` +
  `<circle cx="26" cy="50" r="7.5"/>` +
  `<circle cx="74" cy="24" r="7.5"/>` +
  `<circle cx="74" cy="76" r="7.5"/>` +
  `</g>`

// G. options ----------------------------------------------------------------
const optionsRaw = () =>
  `<g stroke="currentColor" stroke-width="8" stroke-linecap="round">` +
  `<path d="M19 28 H81 M19 50 H81 M19 72 H81"/>` +
  `</g>`

// H. mic-mute ---------------------------------------------------------------
const micRaw = () =>
  `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">` +
  `<rect x="41" y="19" width="18" height="37" rx="9" fill="currentColor" stroke="none"/>` +
  `<path d="M28 44 A22 22 0 0 0 72 44"/>` +
  `<path d="M50 66 V79 M37 79 H63"/>` +
  `<path d="M22 74 L78 26" stroke-width="3.4"/>` +
  `</g>`

// I. mic-hole ---------------------------------------------------------------
const micHoleRaw = () =>
  `<circle cx="50" cy="50" r="25" fill="#2b3038"/>` +
  `<circle cx="50" cy="50" r="20" fill="#0b0c0f"/>`

// J. usb-c ------------------------------------------------------------------
const usbCRaw = () =>
  `<rect x="12" y="38" width="76" height="24" rx="12" fill="#171a1f"/>` +
  `<rect x="15" y="41" width="70" height="18" rx="9" fill="#0a0b0d"/>` +
  `<rect x="19" y="46.5" width="62" height="7" rx="3.5" fill="#99a1ae"/>`

// ---------------------------------------------------------------- registry ---
const GLYPHS = [
  { name: 'triangle', raw: triangleRaw },
  { name: 'circle', raw: circleRaw },
  { name: 'cross', raw: crossRaw },
  { name: 'square', raw: squareRaw },
  { name: 'ps-logo', raw: psLogoRaw, fit: 84 },
  { name: 'create', raw: createRaw },
  { name: 'options', raw: optionsRaw },
  { name: 'mic-mute', raw: micRaw },
  { name: 'mic-hole', raw: micHoleRaw },
  { name: 'usb-c', raw: usbCRaw },
]


// ------------------------------------------------------------- measurement ---
function measure(inner) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PX}" height="${PX}" viewBox="${ORIGIN} ${ORIGIN} ${SPAN} ${SPAN}">` +
    inner +
    `</svg>`
  const png = new Resvg(svg, { logLevel: 'error' }).render().asPng()
  const img = decodePng(png)
  const bb = inkBBox(img)
  return bb ? pxBBoxToUnits(bb, PX, SPAN, ORIGIN) : null
}

const wrap = (inner, tx, ty, s) =>
  Math.abs(tx) < 0.02 && Math.abs(ty) < 0.02 && Math.abs(s - 1) < 1e-6
    ? inner
    : `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(s)})">${inner}</g>`

const results = []
for (const g of GLYPHS) {
  const raw = g.raw()
  const bb = measure(wrap(raw, 0, 0, 1))
  const w = bb[2] - bb[0]
  const h = bb[3] - bb[1]
  const s = g.fit ? g.fit / Math.max(w, h) : 1
  const tx = 50 - s * (bb[0] + w / 2)
  const ty = 50 - s * (bb[1] + h / 2)
  const markup = wrap(raw, tx, ty, s)
  const bb2 = measure(markup) // verify the finished placement
  results.push({ name: g.name, markup, bb: bb2, s, tx, ty })
  console.log(
    g.name.padEnd(9),
    'raw',
    bb.map((v) => v.toFixed(1)).join(','),
    '| scale',
    s.toFixed(3),
    '| ink',
    bb2.map((v) => v.toFixed(1)).join(','),
    '| size',
    (bb2[2] - bb2[0]).toFixed(1) + 'x' + (bb2[3] - bb2[1]).toFixed(1),
  )
}

// --------------------------------------------------------------- QA sheet ---
const CELL = 300
const SCALE = 2.4
const layout = [
  ['triangle', 'circle', 'cross', 'square'],
  ['ps-logo', 'create', 'options', 'mic-mute'],
  ['mic-hole', 'usb-c'],
]
let guides = ''
let placed = ''
layout.forEach((row, r) => {
  row.forEach((name, c) => {
    const lx = c * CELL + (CELL - 100 * SCALE) / 2
    const ly = r * CELL + (CELL - 100 * SCALE) / 2
    guides += `<rect x="${lx}" y="${ly}" width="${100 * SCALE}" height="${100 * SCALE}" fill="none" stroke="#e2e6ec"/>`
    guides += `<path d="M${lx + 114} ${ly + 120} h12 M${lx + 120} ${ly + 114} v12" stroke="#d5dbe4" fill="none"/>`
    const g = results.find((x) => x.name === name)
    placed += `<g transform="translate(${lx} ${ly}) scale(${SCALE})">${g.markup}</g>`
  })
})

const sheet =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">` +
  `<rect width="1200" height="900" fill="#f2f3f5"/>` +
  `<g stroke-width="1">${guides}</g>` +
  placed +
  `</svg>`

fs.mkdirSync('/workspace/refs', { recursive: true })
fs.writeFileSync('/workspace/refs/glyphs.svg', sheet)

// ------------------------------------------------------------------- json ---
const labels = {
  triangle:
    'PlayStation triangle: upwards rounded-corner ring, 9/100 wall, equilateral-ish with a slightly flat base.',
  circle: 'PlayStation circle: perfect ring, uniform 9/100 wall.',
  cross:
    'PlayStation cross: two 104 x 18 rounded bars at +/-45 deg (bar ~5.8x its thickness), round caps.',
  square:
    'PlayStation square: upright axis-aligned ring, 9/100 wall, outer corner radius 12 (inner 3).',
  'ps-logo':
    'PlayStation PS monogram: italic capital P (stem 15 wide, cap 74 tall, 15-unit bowl wall) leaning on a shear of 0.24 about the design baseline y=88, with a smaller capital S (two tangent r=11 arcs + middle diagonal, stroked 12, cap ~62) overlapping behind it on the right. One solid colour; a 1.5-unit transparent gap is knocked out of the S around the P silhouette so the overlap reads. Uses <mask id="pslogoGap">; rename the id if you inline two copies into one document (identical definitions, so a duplicated id still renders correctly).',
  create:
    'DualSense Create: share glyph - 3 hollow nodes (r=7.5) + 2 links, 2-unit stroke, round caps.',
  options: 'DualSense Options: 3 equal 62-long horizontal lines, 8 thick, 22 apart, round caps.',
  'mic-mute':
    'Microphone: capsule (18x37 pill) + cradle arc (r=22 centred on y=44) + stem and base bar + subtle mute slash.',
  'mic-hole': 'Microphone hole: dark disc r=25 with a lighter soft rim ring (inner disc r=20).',
  'usb-c':
    'USB-C receptacle from the front: 76x24 slot (r=12), darker inner cavity, 62x7 metal tongue.',
}

const glyphsOut = {}
const inkBBoxes = {}
for (const g of results) {
  const bb = g.bb
  const size = [+(bb[2] - bb[0]).toFixed(1), +(bb[3] - bb[1]).toFixed(1)]
  glyphsOut[g.name] = {
    viewBox: '0 0 100 100',
    svg: g.markup,
    inkBBox: bb,
    inkSize: size,
    standalone:
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" color="${INK}">` +
      g.markup +
      `</svg>`,
  }
  inkBBoxes[g.name] =
    `[${bb.join(', ')}]  ${size[0]}x${size[1]}  centre (${((bb[0] + bb[2]) / 2).toFixed(1)}, ${((bb[1] + bb[3]) / 2).toFixed(1)})`
}

const notes = {
  sheet:
    'refs/glyphs.svg - 1200x900, background #f2f3f5, 4x3 grid of 300x300 cells, every glyph drawn at 2.4x inside its own 100x100 local box (faint box outline + centre tick = guide, not part of the glyph).',
  usage:
    'glyphs.<name>.svg is inline-ready inner markup (a <g> tree) authored in a 0..100 local box: drop it inside any <g transform="translate(tx ty) scale(s)"> or inside a <svg viewBox="0 0 100 100">. No <text>, no fonts, no external references. "standalone" is the same art wrapped in its own <svg> for a quick file-level preview.',
  centring:
    'Each glyph is auto-positioned so its measured ink bbox is centred in the 0..100 box (measured from a 3200px render over a padded viewBox, thresholded at 50% alpha; <=0.1 unit antialias fringe included).',
  inkBBoxes,
  colours:
    'triangle / circle / cross / square / ps-logo / create / options / mic-mute use fill|stroke="currentColor" (inherits; defaults to black). mic-hole and usb-c carry explicit dark greys because their look depends on colour.',
  weights:
    'All PlayStation shapes share one 9/100 weight (ring wall = 9 units of the 100-unit box, i.e. 9% of the glyph box).',
  glyphNotes: labels,
  psLogoNote:
    'ps-logo is authored in an upright italic-capital frame (P cap 14..88, P x 8..64, S skeleton x 68..92) and then sheared; the finished ink is scaled so its longest side is 84 units. The shear axis IS the slanted baseline (horizontal baseline, letters leaning right), which is how Sony draws it.',
}

fs.writeFileSync(
  '/workspace/refs/glyphs.json',
  JSON.stringify({ glyphs: glyphsOut, notes }, null, 2) + '\n',
)
console.log('\nwrote /workspace/refs/glyphs.svg and /workspace/refs/glyphs.json')
