// small analytic geometry helpers for building glyph paths
export const f = (n) => {
  const v = Math.round(n * 1000) / 1000
  return Object.is(v, -0) ? 0 : v
}
const d = (a, b) => [a[0] - b[0], a[1] - b[1]]
const len = (v) => Math.hypot(v[0], v[1])
export const norm = (v) => {
  const l = len(v) || 1
  return [v[0] / l, v[1] / l]
}
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1]
const cross = (a, b) => a[0] * b[1] - a[1] * b[0]

// rounded rectangle path, clockwise (screen coords, y down)
export function roundRect(x0, y0, x1, y1, r) {
  r = Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2)
  return [
    `M${f(x0 + r)} ${f(y0)}`,
    `H${f(x1 - r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y0 + r)}`,
    `V${f(y1 - r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x1 - r)} ${f(y1)}`,
    `H${f(x0 + r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x0)} ${f(y1 - r)}`,
    `V${f(y0 + r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x0 + r)} ${f(y0)}`,
    'Z',
  ].join(' ')
}

// polygon with rounded corners; `radii` are the ARC radii at each corner
// (number | array per vertex).  The tangent distance is derived from the
// interior angle so the arc is exactly tangent to both edges.
export function roundPoly(pts, radii) {
  const n = pts.length
  const rad = (i) => (Array.isArray(radii) ? radii[i] : radii)
  const t2s = []
  const steps = []
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n]
    const p = pts[i]
    const next = pts[(i + 1) % n]
    const lp = len(d(prev, p))
    const ln = len(d(next, p))
    const up = norm(d(prev, p))
    const un = norm(d(next, p))
    const theta = Math.acos(Math.max(-1, Math.min(1, dot(up, un)))) // interior angle
    const tanHalf = Math.tan(theta / 2)
    let r = rad(i)
    let td = tanHalf > 1e-9 ? r / tanHalf : 0 // tangent distance along each edge
    const tdMax = Math.min(lp, ln) / 2 - 1e-3
    if (td > tdMax) {
      td = Math.max(0, tdMax)
      r = td * tanHalf
    }
    if (td <= 1e-4) {
      t2s.push(p)
      steps.push(`L${f(p[0])} ${f(p[1])}`)
      continue
    }
    const t1 = [p[0] + up[0] * td, p[1] + up[1] * td]
    const t2 = [p[0] + un[0] * td, p[1] + un[1] * td]
    // sweep flag: clockwise turn in screen coords (y down) -> 1
    const sweep = cross(d(p, prev), d(next, p)) > 0 ? 1 : 0
    t2s.push(t2)
    steps.push(`L${f(t1[0])} ${f(t1[1])}`, `A${f(r)} ${f(r)} 0 0 ${sweep} ${f(t2[0])} ${f(t2[1])}`)
  }
  const start = t2s[n - 1]
  return [`M${f(start[0])} ${f(start[1])}`, ...steps].join(' ') + ' Z'
}

// convex polygon offset inward by t (exact parallel edges), returns new point list
export function offsetConvex(pts, t) {
  const n = pts.length
  const c = pts.reduce((a, p) => [a[0] + p[0] / n, a[1] + p[1] / n], [0, 0])
  const lines = []
  for (let i = 0; i < n; i++) {
    const a = pts[i]
    const b = pts[(i + 1) % n]
    const dir = norm(d(b, a))
    let nm = [-dir[1], dir[0]]
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    if (dot(nm, d(c, mid)) < 0) nm = [-nm[0], -nm[1]]
    lines.push({ p: [a[0] + nm[0] * t, a[1] + nm[1] * t], d: dir })
  }
  const out = []
  for (let i = 0; i < n; i++) {
    const L1 = lines[(i - 1 + n) % n]
    const L2 = lines[i]
    // intersect L1 and L2
    const den = cross(L1.d, L2.d)
    const dp = d(L2.p, L1.p)
    const s = cross(dp, L2.d) / den
    out.push([L1.p[0] + L1.d[0] * s, L1.p[1] + L1.d[1] * s])
  }
  return out
}
