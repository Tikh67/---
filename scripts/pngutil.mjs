// Minimal PNG decode (8-bit RGBA, non-interlaced) + alpha-bbox measurement.
// Used only for QA of rendered glyphs.
import zlib from 'node:zlib'

export function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not png')
  let off = 8
  let ihdr = null
  const idat = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString('latin1', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === 'IHDR') {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      }
    } else if (type === 'IDAT') idat.push(data)
    else if (type === 'IEND') break
    off += 12 + len
  }
  if (!ihdr) throw new Error('no IHDR')
  if (ihdr.interlace !== 0) throw new Error('interlaced png unsupported')
  const bpp = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ihdr.colorType]
  if (ihdr.bitDepth !== 8) throw new Error('bitdepth ' + ihdr.bitDepth)
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const stride = ihdr.width * bpp
  const out = Buffer.alloc(ihdr.height * stride)
  let p = 0
  for (let y = 0; y < ihdr.height; y++) {
    const ft = raw[p++]
    const line = raw.subarray(p, p + stride)
    p += stride
    const cur = out.subarray(y * stride, (y + 1) * stride)
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0
      const b = prev ? prev[i] : 0
      const c = prev && i >= bpp ? prev[i - bpp] : 0
      let v = line[i]
      if (ft === 1) v += a
      else if (ft === 2) v += b
      else if (ft === 3) v += (a + b) >> 1
      else if (ft === 4) {
        const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c)
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      }
      cur[i] = v & 0xff
    }
  }
  return { width: ihdr.width, height: ihdr.height, bpp, data: out }
}

// bbox of pixels that differ from the background (alpha channel if the bg is transparent)
export function inkBBox(img, threshold = 128) {
  const { width, height, bpp, data } = img
  const at = (x, y) => {
    const o = (y * width + x) * bpp
    return [data[o], data[o + 1], data[o + 2], bpp === 4 ? data[o + 3] : 255]
  }
  const bgc = at(0, 0)
  const transparent = bgc[3] < 8
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * bpp
      let hit
      if (transparent) hit = data[o + 3] > threshold
      else {
        const d = Math.abs(data[o] - bgc[0]) + Math.abs(data[o + 1] - bgc[1]) + Math.abs(data[o + 2] - bgc[2])
        hit = d > threshold
      }
      if (hit) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) return null
  return { x0, y0, x1, y1 }
}

// pixel bbox -> svg user units; the measurement SVG is rendered from a padded
// viewBox so ink outside the 0..100 local box is still measured.
export function pxBBoxToUnits(bb, px, span, origin) {
  const k = span / px
  return [
    +(origin + bb.x0 * k).toFixed(2),
    +(origin + bb.y0 * k).toFixed(2),
    +(origin + (bb.x1 + 1) * k).toFixed(2),
    +(origin + (bb.y1 + 1) * k).toFixed(2),
  ]
}
