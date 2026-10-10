# Sony PS5 DualSense — Front-View Blueprint Specification

**Subject:** Sony PlayStation 5 DualSense Wireless Controller, standard model **CFI-ZCT1\*** (white outer shell / black inner body, as shipped in the PS5 box).
**Purpose:** a hand-authored SVG illustration, drawn from scratch — no traced bitmap.
**Not covered:** DualSense Edge (CFI-ZCP1) and alternative colourways (these differ in colour and extras, not in front-view geometry).

> **Numbers in this document were checked by rendering the anchor paths** (silhouette, seam, and every control footprint) and confirming that no two controls overlap and that every control sits inside the correct half of the dual-tone split.

---

## 0. How to read this document

### 0.1 Confidence key

Every quantitative claim carries one of these tags. Do not silently upgrade them.

| Tag | Meaning |
|---|---|
| **[H]** High | Published fact, or an arithmetic consequence of one. Safe to build on. |
| **[M]** Medium | Best reconstruction from product photography and hardware familiarity. Expect ±1–2 mm (±6–12 px) at illustration scale. |
| **[L]** Low | Genuinely uncertain; a primary reading **and** a named alternative are given, plus what to check in a reference photo. |

### 0.2 The frame

* **Canvas / viewBox:** `0 0 1000 700` (x right, y down).
* **Controller bounding box:** `x 0 → 1000`, `y 18 → 681`. Full canvas width; 18 px of dead space top and bottom.
* **Silhouette aspect:** 1000 / 663 = **1.509** [H].
* **Centreline:** `x = 500`. The shell is mirror-symmetric about it; the printed control graphics are not (D-pad + Create left, face buttons + Options right).
* **Unit scale:** **6.25 px = 1 mm** [H].

```
px_x = 6.25 × mm_x
px_y = 18 + 6.25 × mm_y      (mm_y measured from the top of the controller downward)
```

### 0.3 Published overall dimensions [H]

| Axis | Value | Note |
|---|---|---|
| Width | **160 mm** | → 1000 px, the full canvas width |
| Height (front view: top of shell → lowest point of grip tips) | **106 mm** | → 663 px |
| Depth (front-to-back, not visible here) | 66 mm | only affects grip wrap shading |
| Mass | 280 g | n/a |

**Do not reuse DualShock 4 proportions.** DS4 is 162 × 52 × 98 mm → aspect **1.653**. The DualSense is narrower, *taller*, and much deeper: aspect **1.509**. A DualSense drawn at DS4 proportions reads instantly wrong (mistake #1, §7).

### 0.4 Global constants

| Constant | Value | Meaning |
|---|---|---|
| `CX` | 500 | mirror axis |
| `SEAM_R` | `#0B0B0D` | seam / groove ink; draw at 45–60 % opacity, 1.5–2 px |
| `AO` | `rgba(30,26,22,0.35)` | ambient-occlusion ink for recesses |
| Shell white base | `#F1F0EE` | §4 |
| Insert black base | `#232326` | §4 |

### 0.5 Glyph assets already in this repo

`refs/glyphs.json` holds a 100 × 100-unit glyph kit built for exactly this illustration: `triangle`, `circle`, `cross`, `square`, `ps-logo`, `create`, `options`, `mic-mute`, `mic-hole`, `usb-c` — measured, ink-centred, `currentColor` unless noted. **Use it.** To place a glyph whose ink size is `(w_i, h_i)` at centre `(cx, cy)` with target ink width `w_target`:

```svg
<g transform="translate(cx - 50s, cy - 50s) scale(s)" color="#DCDCE0">
  <!-- glyph markup from refs/glyphs.json -->
</g>
<!-- s = w_target / w_i  (each glyph's ink is centred in its own 0..100 box) -->
```

Per-glyph scales are tabulated in §3 and §6. If you re-author a glyph, keep the kit's **9/100 stroke weight** so the four PlayStation shapes stay optically consistent.

---

## 1. SILHOUETTE

### 1.1 Reading of the outline

The front silhouette is **one closed path**:

1. a broad, gently **domed top edge** peaking on the centreline (the black USB-C bridge);
2. two **wings** flaring outward and downward to the widest point of the body — home of L1/R1 and the L2/R2 triggers;
3. an outer edge running almost **vertically down the outside of each grip**; the grips splay outward and descend *well below* the body's underside;
4. two **inward-hooking grip tips** — the lowest points of the whole shape;
5. the **inner edges of the grips**, converging upward;
6. the **underside edge of the central body** between the grips, carrying the headphone jack;
7. mirrored back up the right side.

**Widths at a glance [M]:** widest 1000 px (x = 0 and 1000) over the band y ≈ 250–330; ≈ 760 px (122 mm) across the grip tips. Free gap between the grips: ≈ 374 px (60 mm) at the top of the gap (y = 559), widening to ≈ 488 px (78 mm) between the tips, ≈ 544 px (87 mm) at the very bottom.


### 1.2 Anchor table — left half, clockwise from the top-centre

All points in px. Mirror every anchor with `x' = 1000 − x`. Angles are the **direction of travel**, measured below the horizontal, on a canvas where y increases downward. Curvature is stated from the traveller's point of view.

| ID | Point (px) | ≈ mm from centre / from top | Tangent | Curvature & character |
|---|---|---|---|---|
| T0 | (500, 18) | 0 / 0.0 | — | **Apex of the top edge** (black USB-C bridge). Horizontal tangent. |
| T0a | (392, 22) | −17.3 / 0.6 | 183°, ≈2° | Bridge top runs nearly flat 500 → 392, sagging 2 px, ends rounded r ≈ 6. |
| T1 | (392, 22) | −17.3 / 0.6 | 193°, ≈13° | Hard tangent change: the white shell's top edge begins. |
| T2 | (302, 46) | −31.7 / 4.5 | 197°, 17° | **Convex up.** Single curvature, no inflection. |
| T3 | (216, 74) | −45.4 / 9.0 | 202°, 22° | Convex up, steepening. |
| T4 | (146, 106) | −56.6 / 14.1 | 206°, 26° | Convex up. Peak of the "wing brow". |
| T5 | (104, 130) | −63.4 / 17.9 | 214°, 34° | Curvature tightens; the shoulder turns down. Convex out. |
| T6 | (48, 166) | −72.3 / 23.7 | 226°, 46° | Convex out, tightening fast. |
| T7 | (12, 205) | −78.1 / 29.9 | 244°, 64° | Convex out. |
| T8 | (0, 268) | −80.0 / 40.0 | 270°, 90° | **Leftmost point**; vertical tangent. |
| T9 | (4, 330) | −79.4 / 49.9 | 274°, ≈86° | Near-straight; the widest band ends here. |
| T10 | (20, 410) | −76.8 / 62.7 | 281°, 79° | Near-straight, faintly convex out. |
| T11 | (36, 470) | −74.2 / 72.3 | 284°, 76° | Near-straight. |
| T12 | (52, 522) | −71.7 / 80.6 | 286°, 74° | Concave-out start (the grip begins to close). |
| T13 | (70, 572) | −68.8 / 88.6 | 287°, 73° | Concave out. |
| T14 | (92, 620) | −65.3 / 96.3 | 289°, 71° | Concave out. |
| T15 | (118, 655) | −61.1 / 101.9 | 295°, 65° | Turning into the tip. |
| T16 | (175, 681) | −52.0 / 106.1 | 340°, 20° | **Lowest point of the silhouette.** Convex down; tip cap. |
| T17 | (228, 673) | −43.5 / 104.8 | 25° (rising) | Convex; tip cap completing. |
| T18 | (256, 660) | −39.0 / 102.7 | 55° (rising rightward) | **Inner edge of the grip starts.** |
| T19 | (272, 634) | −36.5 / 98.6 | 64° | Slightly convex **toward the centreline**: the grip's inner face hooks in 6–10 px relative to the chord T18–T22. |
| T20 | (292, 600) | −33.3 / 93.1 | 68° | As above. |
| T21 | (306, 576) | −31.0 / 89.3 | 72° | As above. |
| T22 | (313, 559) | −29.9 / 86.6 | 78° | **Large-radius blend (r ≈ 40 px)** into the underside edge — the apex of the notch between grip and body. |
| T23 | (420, 574) | −12.8 / 89.0 | 172°, ≈8° | **Underside edge** — nearly flat, dipping very slightly. |
| T24 | (500, 581) | 0 / 90.1 | 180°, ≈4° | **Lowest point of the central body**, on the centreline; the headphone jack sits here. |
| — | mirror T23 … T0 | | | Continue (580, 574) → (687, 559) → right grip → (500, 18). Close the path. |

**Tangency notes for path authoring**

* T1 → T5 is a **single convex-up curve** (one cubic suffices): (392, 22, 13°) → (104, 130, 34°); it sits ≈ 12 px above its chord. Suggested: `C 300 40 190 96 104 130`.
* T5 → T8 tightens sharply: (104, 130, 34°) → (0, 268, 90°). Suggested: `C 48 172 0 210 0 268`.
* T8 → T15 is *almost* straight with a slow curvature change (90° → 65°). **The grip's outer edge bows ≈ 26 px outward** from the chord (0, 268) → (118, 655): never draw it straight. Suggested: `L 4 330 C 8 400 60 560 118 655`.
* T15 → T18 is the tip cap: a wide soft round, minimum radius ≈ 24 px, through the global low point (175, 681).
* T18 → T22 bows inward by 6–10 px (the "hook" that makes the grips read): `C 268 640 300 596 313 559`.
* T22 → T24 is the wide, near-flat underside: `C 350 566 430 578 500 581`. The turn at T22 is 60° of direction change — **round it with r ≈ 40 px**, not a corner.

**Layer trick for the triggers:** draw the L2/R2 shapes **before** (under) the white shell. Only the part of each trigger above the shell's top edge then shows — exactly the real occlusion (§3.11).

### 1.3 The one genuinely uncertain silhouette feature

**How the body's underside edge runs between the grips (T22 → T24 → mirror).** [L]

* **Primary reading (used above):** nearly flat, dipping only ≈ 22 px (3.5 mm) from the notch blends to the centreline — the grips hang ≈ 122 px (19.5 mm) below it, and the headphone jack sits on that edge at the centre.
* **Alternative reading:** a deeper central lobe (the underside dipping to y ≈ 600–610 px, jack on the lobe's bottom). Some product shots suggest this; it is worth ≤ 30 px on screen.
* Either way, **keep the notch blend points at (313, 559) / (687, 559)** with a large radius, and keep the jack centred at x = 500. Those two facts are what actually read.

### 1.4 Shoulder areas

* The **wings** are the outer thirds of the top shell between T1/T5 (left) and their mirrors; their top edge is the domed arc T1 → T5. Each wing carries L1/R1 on its top-front surface and the trigger behind/above it.
* The **shoulder line** falls from 22 px at the USB bridge to 130 px at the wing's outer corner, mean slope ≈ 20°, and is **convex up** all the way — never S-shaped.
* From a true front view each shoulder shows, outside-in: the trigger's rounded cap (above the shell line), a 2 px shadow gap, the L1/R1 band, then the seam where the wing meets the black insert (§2).
* **No step, vent or louvre** in the shoulder area. The only shoulder detailing is the button gaps.

---

## 2. DUAL-TONE SPLIT

The front face is two mouldings: the **white outer shell** and the **black inner body** that shows through it. This boundary carries the controller's identity — get it right before anything else.

### 2.1 What is white and what is black

| White outer shell (front face) | Black inner body (front face) |
|---|---|
| Both **wings** (top-left, top-right) and the whole **top-edge rim** except the central bridge | The **top-edge bridge / USB-C slot** at the centre (x 330–670) |
| Both **grips** — outer face, tip, *and* the whole inner face down to the notch blend at (313, 559) | The **touchpad surround**, both **light-bar strips**, and the black band above the touchpad |
| A narrow **bottom rim** flanking the central underside | **Create** and **Options** buttons and their surrounds |
| | The **D-pad** cluster and its recess |
| | The **face-button** cluster △ ○ × □ |
| | Both **stick wells** and the sticks themselves |
| | The **PS button**, **mute button**, mute LED, speaker grille, mic inlets |
| | The **underside band** between the grips that carries the **headphone jack** |

**No control sits on the white shell.** Every input surface is on black, and every printed mark is light-on-dark: the ○ × △ □ glyphs on the buttons, the PS logo on the PS button, the mic-slash on the mute button, the Create/Options icons, the USB-C and jack graphics.

### 2.2 The seam, as a path

Left half; mirror with `x' = 1000 − x`. This is the white/black boundary on the front face. It starts where the black bridge interrupts the top edge and ends where the grip's inner edge leaves the body (silhouette T22).

| ID | Point (px) | ≈ mm | Tangent | Character |
|---|---|---|---|---|
| C0 | (330, 22) | (−27.2, 0.6) | 197°, ≈17° | Top edge; left end of the black bridge. |
| C1 | (290, 62) | (−33.6, 7.0) | 219°, ≈39° | Convex out; runs down-left, roughly parallel to the wing's inner fall. |
| C2 | (262, 118) | (−38.1, 16.0) | 238°, ≈58° | Convex out. |
| C3 | (250, 175) | (−40.0, 25.1) | 252°, ≈72° | Convex out. |
| C4 | (242, 232) | (−41.3, 34.2) | 260°, ≈80° | Convex out, straightening. |
| C5 | (240, 288) | (−41.6, 43.2) | 265°, ≈85° | **Leftmost point of the seam.** |
| C6 | (246, 344) | (−40.6, 52.2) | 276°, ≈84° | Inflection: now concave out. |
| C7 | (258, 400) | (−38.7, 61.1) | 280°, ≈80° | Concave out — it hugs the stick well. |
| C8 | (272, 452) | (−36.5, 69.4) | 284°, ≈76° | Concave out. |
| C9 | (270, 496) | (−36.8, 76.5) | 274°, ≈86° | Concave out; the seam's closest approach to the well. |
| C10 | (285, 528) | (−34.4, 81.6) | 300°, ≈60° | Turning into the blend. |
| C11 | (313, 559) | (−29.9, 86.6) | 350°, ≈10° | Same point as silhouette T22: the seam **leaves the shell** here and the black body's own silhouette takes over. |
| C12 | (420, 574) → (500, 581) | | | The underside band — identical to silhouette T23 → T24. |

Construction: build the black insert as **one closed region** = [C0 → C11 → C12 → centreline → mirrored C12 → mirrored C11 → mirrored C0 → close across the top edge from x 330 to x 670]. The white shell is whatever lies between that insert and the silhouette. Draw the seam itself as a groove on top of the join (§4.4).

### 2.3 Clearances the seam must respect (all [M] — verify by rendering)

| Feature | Nearest seam point | Clearance |
|---|---|---|
| D-pad left key outer edge (x = 228) | C4/C5 (x ≈ 240–242) | 12 px (2 mm) |
| Left stick well outer edge (x = 281 at y = 480) | C9 (x ≈ 270) | 11 px (1.8 mm) |
| Create button left edge (x = 239) | C3/C4 (x ≈ 246 at y ≈ 199) | 7 px (1.1 mm) — tight, as on the real part |
| Light-bar outer edge (x = 315) | C1/C2 (x ≈ 275 at y ≈ 118) | 40 px (6 mm) |
| Touchpad top-left corner (337, 56) | C0/C1 | 30 px (4.8 mm) |
| ○ button outer edge (x = 755) | mirrored C4/C5 (x ≈ 758) | 3 px (0.5 mm) — deliberately tight |

The seam is **symmetric**; the *controls* inside it are not (the D-pad cluster is 23 mm wide, the face cluster 34 mm). Do not "balance" the controls to the seam.

---

## 3. CONTROL INVENTORY

### 3.0 Master placement table

Centres in px (canvas 1000 × 700). "Size" = visible front-view footprint. Rotations are SVG `rotate(θ)` (positive = clockwise on screen).

| # | Control | Centre (px) | Centre (mm) | Size (px) | Size (mm) | Transform / note |
|---|---|---|---|---|---|---|
| 1 | Touchpad | (500, 152) | (80.0, 21.5) | 325 × 194 | 52 × 31 | trapezoid path, §3.1 |
| 2 | Light bar L / R | (324.5, 144.5) / (675.5, 144.5) | (51.9, 20.2) | 19 × 141 | 3.0 × 22.6 | `rotate(-3.5)` / `rotate(3.5)` |
| 3 | Create | (269, 199) | (43.0, 29.0) | 59 × 30 | 9.4 × 4.8 | `rotate(6)` |
| 4 | Options | (731, 199) | (117.0, 29.0) | 59 × 30 | 9.4 × 4.8 | `rotate(-6)` |
| 5 | D-pad cluster | (300, 290) | (48.0, 43.5) | 144 × 144 | 23 × 23 | 4 separate keys, §3.4 |
| 6 | Left stick | (356, 480) | (57.0, 74.0) | well ⌀150, cap ⌀110 | 24 / 17.6 | §3.5 |
| 7 | Right stick | (644, 480) | (103.0, 74.0) | as above | as above | §3.5 |
| 8 | Face cluster | (647, 290) | (103.5, 43.5) | 4 × ⌀65, diamond r 76 | ⌀10.4, r 12.2 | §3.6 |
| 8a | △ | (647, 214) | (103.5, 31.4) | ⌀65 | ⌀10.4 | symbol ink ≈ 25 px wide |
| 8b | ○ | (723, 290) | (115.7, 43.5) | ⌀65 | ⌀10.4 | symbol ink ⌀27.5 px |
| 8c | × | (647, 366) | (103.5, 55.7) | ⌀65 | ⌀10.4 | symbol ink 27 px |
| 8d | □ | (571, 290) | (91.4, 43.5) | ⌀65 | ⌀10.4 | symbol ink 27 px |
| 9 | PS button | (500, 430) | (80.0, 66.0) | 75 × 34 | 12.0 × 5.4 | PS logo ink 29 × 22 px |
| 10 | Mute button | (500, 493) | (80.0, 76.0) | 69 × 29 | 11.0 × 4.6 | mic-slash ink ≈ 20 px tall |
| 11 | Mute LED | (500, 472) | (80.0, 72.6) | 75 × 10 | 12.0 × 1.6 | amber, §3.7 |
| 12 | Speaker grille | (500, 330) | (80.0, 50.0) | arc, span 200 | span 32 | 11 holes ⌀7, pitch 20 |
| 13 | Mic inlets | (450, 356) / (550, 356) | (72.0, 54.0) / (88.0, 54.0) | ⌀9 each | ⌀1.4 | [L] §3.8 |
| 14 | USB-C | (500, 33) | (80.0, 2.4) | 59 × 19 (recess 78 × 30) | 9.4 × 3.0 | §3.10 |
| 15 | Headphone jack | (500, 568) | (80.0, 88.0) | ⌀22 (recess 40 × 16) | ⌀3.5 | §3.9 |
| 16 | L1 / R1 | (176, 134) / (824, 134) | (28.2, 18.6) | 230 × 44 | 36.8 × 7.0 | `rotate(-20)` / `rotate(20)` |
| 17 | L2 / R2 | peak (170, 32) / (830, 32) | (27.2, 2.2) | x 62–300 | 38 wide | drawn under the shell, §3.11 |

**Layout logic worth keeping in mind:** the D-pad cluster (23 mm) sits outboard, its left key ~2 mm from the seam; the face cluster (34 mm) sits inboard of its side's seam by design. The two clusters share the same centre height (y = 290 px) [M]. The sticks are lower (y = 480 px) and inboard, leaving a 22 mm-wide corridor down the centreline for the PS button, the mute button and the underside band.

### 3.1 Touchpad

* **Shape [M]:** a rounded trapezoid, *wider at the top than at the bottom*, with a **faintly convex-down bottom edge**:

  | Point | px | note |
  |---|---|---|
  | TL | (338, 56) | top-left corner, radius 46 |
  | TR | (662, 56) | top-right corner, radius 46 |
  | BL | (350, 249) | bottom-left corner, radius 30 |
  | BR | (650, 249) | bottom-right corner, radius 30 |
  | bottom mid | (500, 253) | bottom edge bows **down** 4 px |

  Left side (338, 56) → (350, 249) is straight, slanting 3.6° from vertical (top leans outboard).
* **Finish [H]:** black, **glossier** than the surrounding insert; a separate moulding in a 1–2 px recess. **No visible grid, dots or texture.** A uniform micro-texture is optional at ≤ 3 % opacity; anything stronger reads as a DualShock 4 / PS Vita pad and is wrong.
* **Seam:** 1.5 px `SEAM_R` groove all round at 45 % opacity, a 3 px inner shadow along the top edge, a 2 px light rim along the bottom-left.
* The touchpad is **not backlit**. Its light comes only from the two strips beside it.

### 3.2 Twin light-bar strips

* Two thin translucent strips **flanking the touchpad**, parallel to its slanted sides, **outside** the touchpad seam and **inside** the Create/Options buttons.
* **Geometry [M]:** 19 × 141 px (3.0 × 22.6 mm), rounded ends (rx = 9.5 = half-width). Left strip centred (324.5, 144.5), rotated `-3.5°` so its top leans outboard; right strip mirrored at (675.5, 144.5), `rotate(3.5)`. The strip's inner edge sits ≈ 4 px (0.6 mm) from the touchpad's edge.
* **Off state:** milky grey-white `#D6D6D3` at 55–70 % over the black insert, with a soft inner gradient (lighter along the outer edge, darker along the inner edge) — it must read as *translucent plastic*, not as a painted white bar.
* **On state + glow recipe: §5.**
* These strips are the only illuminated element on the front face. They are **not** on the top edge and **not** behind the touchpad (those are DualShock 4 traits).

### 3.3 Create and Options

| | Create (left) | Options (right) |
|---|---|---|
| Centre | (269, 199) px = (43.0, 29.0) mm | (731, 199) px = (117.0, 29.0) mm |
| Body | rounded rect 59 × 30 px (9.4 × 4.8 mm), corner radius 13 px (2.1 mm) | identical |
| Rotation | `rotate(6)` — outer (left) end 3 px higher | `rotate(-6)` — outer (right) end 3 px higher |
| Icon ink | ≈ 19 × 20 px (3.0 × 3.2 mm) → glyph scale **s = 0.29** | ≈ 22 × 18 px → glyph scale **s = 0.355** |
| Icon colour | `#DCDCE0` | `#DCDCE0` |

* They sit **level with the touchpad's lower third** (y = 199 px vs the touchpad's bottom edge at 249 px), not at the touchpad's mid-height as on a DualShock 4.
* Both are **raised ~4 px above the black insert**, with a 2 px dark shadow at the body's bottom-right, a 1 px highlight along the top-left, and a 1.5 px `SEAM_R` outline.
* **Options icon [H]:** three equal horizontal lines, no arrows, no dots — exactly the `options` glyph in `refs/glyphs.json` (62 units long, 8 thick, 22 apart, round caps). Equal length; do not shorten the middle line.
* **Create icon [L — read before drawing]:** the DualSense's Create button carries a *capture-style* glyph (a small rounded-rectangle "screen" mark with a dot/underline), **not** the DualShock 4 SHARE node-glyph. However, the node glyph (one node left, two right, two links) is the reading used by `refs/glyphs.json` and by most published fan art, and at 3 mm it reads identically in practice.
  * **Primary (recommended):** the `create` glyph from `refs/glyphs.json` at **s = 0.29**, centred on the button.
  * **If you want the literal PS5 mark:** a 3.0 × 2.1 mm rounded-rect outline (stroke 0.35 mm, radius 0.5 mm), a 0.7 mm filled dot centred 0.45 mm above the rect's bottom edge, and a 1.3 mm horizontal bar 0.5 mm below the rect. Keep the ink inside 19 × 20 px.
  * Either way: monochrome, light-on-dark, centred, and **kept upright** (rotate the button body, not the glyph).

### 3.4 D-pad

The DualSense D-pad is **four separate keys** in a cross on a shallow dished recess — *not* a single rocker cross, *not* a disc-dish pad. One of the most common errors (§7 #4).

| Property | Value |
|---|---|
| Cluster centre | (300, 290) px = (48.0, 43.5) mm |
| Overall footprint | 144 × 144 px (23 × 23 mm) |
| Recess | circular dish ⌀ 144 px, dished ≈ 6 px deep, fill `#0E0E10`, soft AO ring at the top-left |
| Keys | 4, radial. Each: length **56 px (9.0 mm)**, spanning r = 16 px to r = 72 px from the cluster centre |
| Key width | 50 px (8.0 mm) at the outer end, 42 px (6.7 mm) at the inner end |
| Corner radii | outer end 20 px, inner end 12 px |
| Key centres | up (300, 241), down (300, 339), left (251, 290), right (349, 290) |
| Gaps | ≈ 6 px along the diagonals, opening to ≈ 10 px at the outer corners; channels `#0A0A0C` |
| Central void | ⌀ 32 px (5.1 mm) of exposed recess where the four keys meet |
| Key top | dished 2–3 px, matte; the outer end droops ≈ 2° so the face turns slightly away from the viewer |
| Markings | **none** — no arrows, no dots, no printed symbols |

* Each key is a rounded wedge: widest and roundest at the outer end, tapering toward the centre; the inner end is cut almost square so the central void is a clean circle.
* Shading: 1 px highlight along each key's top-left edge, a 2–3 px contact shadow inside the recess under each key's outer edge, a soft sheen across the top face. Keys read a shade lighter than the insert: `#1E1E21` vs `#17171A`.
* The left key's outer edge is ~12 px from the dual-tone seam. Do not shrink the D-pad to "make room", and do not push it further out.

### 3.5 Analogue sticks (left and right)

Both sticks are identical, symmetric about x = 500, and sit **side by side below the D-pad and face-button clusters**, inboard — not under the D-pad (DualShock 3 layout) and not offset asymmetrically (Xbox layout). Centres: left (356, 480), right (644, 480) px = (57, 74) / (103, 74) mm. Centre-to-centre distance 288 px (46 mm).

Draw each stick as stacked elements, bottom to top:

| Layer | Size | Appearance |
|---|---|---|
| **Well (recess)** | ⌀ 150 px (24 mm) | Circular depression in the black insert, 6–8 px deep. Fill `#0C0C0E`; soft AO crescent inside the top-left rim (2–4 px); 1 px highlight arc along the bottom-right rim; the well's outer edge blends into the insert over 3 px. |
| **Gimbal skirt / collar** | ⌀ 74 px at base → ⌀ 104 px at top | Truncated cone rising out of the well, glossy dark `#121215`, vertical gradient (lighter at the top-front, near-black at the base). Optional 2 px seam ring where it meets the well floor. |
| **Stick cap** | ⌀ 110 px (17.6 mm) | Black `#17171A`; outer edge rounded r = 6 px with a 1 px top-left rim highlight. |
| **Cap rim texture** | ring 17 px (2.7 mm) wide | 36–40 fine radial ridges/dots alternating `#2C2C31` / `#141417`, reading as a knurled ring. Keep them subtle: 1 px marks, low contrast. |
| **Cap dish (concave top)** | ⌀ 76 px (12.2 mm) | Concave dish ≈ 7 px deep, smooth (no dot, no logo), inner gradient dark at the dish's top edge → broad soft highlight across the lower-right, `#101013` → `#1C1C20`. |

* The cap sits **centred** in the well (neutral pose). For a dynamic illustration, tilt the cap 5–8° and draw it as an ellipse; keep the well perfectly circular.
* Geometry to respect (checked by rendering): the well's outer edge clears the dual-tone seam by ~11 px; the well's bottom (y = 555) clears the body's underside edge by ~8 px; the well's top (y = 405) clears the D-pad's down key by ~7.5 mm and the × button by ~6.5 px. Do not enlarge the well beyond ⌀ 150 px or it will collide with all three.
* The sticks are the darkest elements on the face. Do not tint them blue-grey and do not give them a chrome ring.

### 3.6 Face buttons (△ ○ × □)

**Layout [H] — memorise this, it is the single most common error:**

```
              △  (647, 214)   top
□ (571, 290)                    ○ (723, 290)
   left                             right
              ×  (647, 366)   bottom
```

* Cluster centre (647, 290) px = (103.5, 43.5) mm; diamond radius **76 px (12.2 mm)**; each button **⌀ 65 px (10.4 mm)**; centre-to-centre across the diamond 152 px (24.3 mm), diagonally 215 px (34.4 mm); diagonal edge-to-edge gap ≈ 41 px (6.6 mm).
* The cluster's centre y (290) equals the D-pad's centre y (290) — the two clusters are level. [M]
* The cluster is **inboard of its side's seam by only ~3 px** at the ○ button: that tightness is real, not a mistake. If your seam runs further out, the ○ button will look detached.
* **Buttons:** dark, slightly translucent charcoal (`#202024` base, `#3B3B42` rim sheen), domed 2–3 px, with a 2 px dark ring gap to the insert. They read as **solid dark grey** — not glass, not black.
* **Symbols [H]:** printed **light grey**, `#DCDCE0` (drop to `#C9C9CF` if your render is bright). They are **outline glyphs, not filled**:
  * ○ = ring, stroke = 9/100 of the glyph box → `circle`, **s = 0.336** (⌀27.5 px ink).
  * × = two rounded bars at ±45° → `cross`, **s = 0.343** (27 px ink).
  * △ = rounded triangle outline → `triangle`, **s = 0.347** (27 px ink width).
  * □ = upright square outline → `square`, **s = 0.337** (27 px ink).
* **Colour rule:** on a retail DualSense the four symbols are **monochrome light grey — never blue/red/green/pink**. Coloured symbols belong to third-party pads and marketing renders; using them is mistake #8.
* Symbols ≈ 27 px (4.3 mm) wide, centred on each button, upright (no rotation with the cluster).
* Add a 0.5 px darker halo (`rgba(0,0,0,0.35)`) under the ink so it stays legible against the button's specular sweep, and never let a highlight cross the ink at full strength.

### 3.7 PS button, mute button and mute LED

Stacked on the centreline below the touchpad, in this vertical order: **PS button → mute LED → mute button.**

| | PS button | Mute button | Mute LED |
|---|---|---|---|
| Centre | (500, 430) px = (80, 66.0) mm | (500, 493) px = (80, 76.0) mm | (500, 472) px = (80, 72.6) mm |
| Body | pill 75 × 34 px (12.0 × 5.4 mm), r = 17 | pill 69 × 29 px (11.0 × 4.6 mm), r = 14.5 | bar 75 × 10 px (12.0 × 1.6 mm), r = 5 |
| Ink | PS logo, ink 29 × 22 px (4.6 × 3.5 mm), **s = 0.345** | `mic-mute` glyph, ink ≈ 19 × 20 px, **s = 0.325** | — |
| Ink colour | `#DCDCE0` | `#DCDCE0` | — |
| Lit | **never lit** — the DualSense's PS button is not illuminated | — | `#FFA22B` core, `#FF7A00` at the ends, `rgba(255,150,20,0.55)` glow |

* All three sit in the 22 mm-wide corridor between the stick wells: 31 px (5 mm) of clearance on each side. Nothing else shares that corridor except the speaker grille above the PS button.
* Both buttons are domed 3–4 px, with a 1.5 px `SEAM_R` outline, a 1 px top-left rim highlight and a 3 px bottom shadow. The mute button sits slightly deeper in the face than the PS button.
* **Mute icon [M]:** microphone capsule with cradle arc, stem and base bar, plus a thin diagonal slash (muted). Use the `mic-mute` glyph as-is; for the *unmuted* look, omit only the slash path.
* **LED behaviour [M]:** amber when muted, off (dark `#2A2A2E` with a faint sheen) when unmuted. It reads as a thin glowing slot, not a bulb.
* **LED position caveat [L]:** the primary reading above makes the LED a separate bar **immediately above** the mute key (1.75 px gap). An equally defensible reading (several teardown photos suggest it) is that the LED is the **top edge of the mute key itself**, glowing along its upper rim. If you take that route, delete the separate bar and give the mute key's top edge a 4 px amber gradient — the composition is otherwise identical.
* The PS logo is **upright and centred** on the button: never rotated, never coloured, never glowing (§6).

### 3.8 Speaker grille and microphone inlets

* **Speaker grille [L]:** 11 holes, each **⌀ 7 px (1.1 mm)**, **pitch 20 px (3.2 mm)**, centred (500, 330) px = (80, 50) mm — the black band between the touchpad's bottom edge (y = 249) and the PS button's top edge (y = 413). The row is a **shallow arc bowing 4 px downward at the centre** (span 200 px / 32 mm) — not a straight line, and definitely not a 2-D grid.
* Each hole: dark `#0B0C0F` disc with a 1 px lighter rim `#2B3038` — exactly the `mic-hole` glyph in `refs/glyphs.json` (ink 50.1 units) → **s = 0.14**.
* **Mic inlets [L]:** 2 holes, **⌀ 9 px (1.4 mm)**, at (450, 356) and (550, 356) px = (72, 54) and (88, 54) mm — symmetric about the centreline, 100 px (16 mm) apart, just below the grille arc. Same glyph at **s = 0.18**.
* **Alternative mic reading:** some references place the two mic inlets on the **bottom edge either side of the headphone jack** (≈ (470, 545) and (530, 545)). Both readings are plausible; pick one and stay consistent. Never draw more than two mic inlets.
* **Never** draw a perforated mesh panel, louvred vent or "grille plate" anywhere on the front — that is a PS5 *console* trait.

### 3.9 Headphone jack (bottom edge, centre)

* Opening: **⌀ 22 px (3.5 mm)** circle centred **(500, 568)** px = (80, 88) mm — sitting on the body's underside edge (T24 at y = 581), with its lower edge 2 px inside the silhouette.
* Surround: a 40 × 16 px (6.4 × 2.6 mm) rounded slot (r = 8) centred (500, 572), filled `#141416`, giving the recessed look; the slot's lower half may cross the silhouette edge.
* Barrel: `#08080A` with a 1.5 px inner ring `#3A3A40` at the lower-right (catching the light) and a 3 px `AO` crescent inside the top of the bore. Nothing inside the bore but darkness.
* It is the **only** feature on the bottom edge: no second jack, no USB, no screws.

### 3.10 USB-C port (top edge, centre)

* The port sits in the **black bridge** at the top of the silhouette: the bridge spans x 330–670 and its top edge *is* the silhouette between T1 (392, 22) and its mirror, with a shallow sag of 2 px. The port is centred at **(500, 33)** px = (80, 2.4) mm.
* **Opening:** 59 × 19 px = **9.4 × 3.0 mm** rounded slot (r = 9) — the real USB-C receptacle aperture (8.3 × 2.4 mm) plus its surround. Never wider than 62 px, never micro-USB (no trapezoid, no notch).
* **Surround:** a 78 × 30 px (12.5 × 4.8 mm) rounded slot (r = 14) centred (500, 34) at `#1A1A1D` — the recessed lip — sitting on the black bridge.
* **Colours:** cavity `#0B0B0D`; a hint of the metal tongue as a 4–5 px bar across the lower half at `#9AA2AE` with a 1 px darker line under it; a 1 px `#4A4A52` highlight along the top inner lip.
* Use the `usb-c` glyph from `refs/glyphs.json` (ink 75.9 × 24 units) at **s = 0.78** for the 59 × 19 px footprint, and draw the 78 × 30 recess yourself.
* **Orientation [H]:** the opening's long axis is horizontal — the port is **not** rotated. The white shell does **not** cover the top-centre; if your drawing has white plastic wrapping the USB-C, the dual-tone split is wrong (§2).

### 3.11 L1/R1 shoulder buttons and L2/R2 triggers

Front-view visibility, top to bottom at each shoulder: **trigger cap → L1/R1 band → shell line → wing.**

| | L1 / R1 (bumpers) | L2 / R2 (triggers) |
|---|---|---|
| Centre | (176, 134) / (824, 134) px = (28.2, 18.6) mm | visible cap peaks at (170, 32) / (830, 32) px = (27.2, 2.2) mm |
| Body | rounded rect 230 × 44 px = **36.8 × 7.0 mm**, r = 20 | ≈ 38 mm wide, from x 62 to x 300 (left) |
| Rotation | `rotate(-20)` (left) / `rotate(20)` (right): the **outer end is lower**, following the wing's top edge | same tilt direction, 18–22° |
| Visible height above the shell | — | ≈ 64 px = **10 mm** at the peak, tapering to 0 at the inner end |
| Colour | white, same family as the shell: `#EFEEEC` top face, `#D9D7D4` front bevel | white, slightly darker: `#E7E5E2` top, `#C9C6C2` in the shadow under the shell line |

* **Occlusion:** draw both triggers **before** the shell in z-order, then the shell on top. The trigger shapes may be drawn generously (they are clipped by the shell silhouette). Left trigger outline: (62, 96) → (78, 44) → (150, 30) → (232, 40) → (300, 92) → back along the shell edge. Mirror for R2.
* **Check:** with L1 centred at (176, 134) rotated -20°, its top-outer corner lands at ≈ (60, 153) and its top-inner corner at ≈ (277, 74); the silhouette's top edge is above both (≈ y 160 and ≈ y 52 respectively). If you move L1 outward, it will poke through the outline — that is the constraint that fixes its position.
* **Separation:** a 2 px `SEAM_R` line where each trigger disappears behind the shell, plus a 3 px soft shadow cast by the shell onto the trigger's lower part. This is what makes the triggers read as *behind*.
* **L1/R1:** each is a raised band whose outer side is nearly flush with the wing's silhouette and whose inner end fades under the top edge. 1.5 px `SEAM_R` outline all round, a 1 px highlight along the top edge, a 2 px contact shadow below. Gap between L1 and the trigger ≈ 4–6 px.
* **Never** draw the four shoulder elements as a single row of equal buttons, and never hide L1/R1 behind the body: from the front they are clearly visible bands.

### 3.12 Screws, vents, slits, grip texture — what NOT to add

| Feature | Reality |
|---|---|
| Screws on the front | **None.** All screws are on the back / under the back cover. Do not add screw heads anywhere. |
| Vents / louvres | **None** on the controller. (The PS5 console has vents; the pad does not.) |
| Slits beside the headphone jack | **Not a feature.** Some fan art adds two slots flanking the jack; there is nothing there. |
| Grip texture on the front shell | **Not visible at illustration scale.** The white shell is satin-smooth; the black insert is a satin micro-texture. Optional: a 2–4 % noise overlay over the black insert and the grips' shadow sides only. |
| Grip "stipple" / hex pattern | **None.** A strong pattern means you are looking at a DualSense Edge or a third-party grip cover. |
| Front-face seams besides the dual-tone seam | Only the touchpad recess and the button outlines. No centreline seam down the face. |
| "SONY" / "PlayStation" wordmark on the front | **None.** Front branding = the printed control glyphs and the PS logo on the PS button. |

---

## 4. COLOURS, GRADIENTS, LIGHTING

### 4.1 Material palette

Values are for a **neutral studio render** with a soft key light from the upper left. Hexes are starting points; keep the *relationships* (shell = warm-neutral off-white, insert = cool-neutral near-black) even if you shift the absolutes.

| Element | Base | Highlight | Mid / falloff | Shadow | Deep shade / recess |
|---|---|---|---|---|---|
| **White outer shell** (front face) | `#F1F0EE` | `#FBFAF8` | `#E7E5E2` | `#CFCCC8` | `#B3AFAA` |
| Shell, seam-side AO | — | — | — | `#A9A5A0` | `#8E8A85` |
| Shell, bottom rim / under-shoulder | — | — | `#DAD7D3` | `#BFBBB6` | `#A19C97` |
| **Black insert** (front face) | `#232326` | `#34343A` (satin sheen) | `#1D1D20` | `#17171A` | `#0E0E10` |
| Insert, top-edge bridge (rolls away from the light) | `#1A1A1D` | `#2A2A2F` | — | — | `#0C0C0E` |
| **Touchpad** | `#1A1A1D` | `#3A3A40` (broad, low contrast) | `#161619` | `#111113` | `#0D0D0F` |
| Touchpad rim / recess | `#0B0B0D` | `#2E2E33` (bottom-left only) | — | — | — |
| **Stick cap** | `#17171A` | `#2C2C31` (rim ridges) | `#141417` | `#101013` | `#0B0B0D` |
| Stick skirt | `#121215` | `#232327` (top-front) | — | — | `#0A0A0C` |
| Stick well | `#0C0C0E` | `#222226` (bottom-right rim arc) | — | — | `#08080A` |
| **D-pad keys** | `#1E1E21` | `#2C2C31` (top-left edge) | `#1A1A1D` | `#141416` | `#0A0A0C` (gaps, void) |
| **Face buttons** (translucent charcoal) | `#202024` | `#3B3B42` (rim) | `#1C1C20` | `#161618` | `#101012` |
| **Printed symbols** (○ × △ □, PS, icons) | `#DCDCE0` | `#F2F2F5` (specular kiss) | — | `#C9C9CF` | — |
| **Mute LED on** | `#FFA22B` | `#FFE0A8` (hot centre) | — | `#FF7A00` | — |
| **Mute LED off** | `#2A2A2E` | `#3A3A3F` | — | — | — |
| **Light-bar strip, off** | `#D6D6D3` @ 60 % | `#EFEFEC` | — | `#A8A8A6` | — |
| **Light-bar strip, lit** | `#0070D1` (nominal) / `#2C90FF` | `#EAF6FF` (hot core) | `#8FD0FF` | — | — |
| **USB-C cavity** | `#0B0B0D` | `#4A4A52` (top inner lip) | — | — | — |
| USB-C metal tongue | `#9AA2AE` | `#C2C8D2` | — | `#6E747E` | — |
| **Headphone jack bore** | `#08080A` | `#3A3A40` (lower-right ring) | — | — | — |
| Speaker / mic holes | `#0B0C0F` | `#2B3038` (rim) | — | — | — |

### 4.2 Gradients worth hard-coding

* **Shell front (left→right):** `linearGradient` x1=0 y1=0 x2=1 y2=0 — `#FBFAF8` @0 → `#F1F0EE` @0.35 → `#E7E5E2` @0.75 → `#D2CFCB` @1. The outer edges of the wings are always slightly darker than the centre.
* **Shell vertical wash:** a second `linearGradient` (top→bottom) `rgba(255,255,255,0.35)` @0 → `rgba(0,0,0,0.10)` @1, multiplied over the shell only. This is what stops the white from looking like flat paper.
* **Insert (top→bottom):** `#2A2A2F` @0 → `#232326` @0.4 → `#17171A` @1: the insert is *brighter at the top* because the top edge rolls toward the key light.
* **Touchpad:** diagonal `linearGradient` (135°) — `#3A3A40` @0 → `#1E1E22` @0.35 → `#151518` @1, plus a 12 % white specular band at 20–30 % of the diagonal, blurred 8 px.
* **Stick cap dish:** `radialGradient` centred 38 % / 32 % — `#1C1C20` @0 → `#131316` @0.6 → `#0D0D0F` @1.
* **Grip wrap:** per grip, a `linearGradient` across the grip's width: `#D8D5D1` (inner edge) → `#F1F0EE` (centre) → `#C6C2BD` (outer edge). The grips' inner edges are in shadow because they face each other.

### 4.3 Lighting model (three lights + AO)

1. **Key light:** soft, broad, upper-left, ≈ 35° elevation. Produces the shell's top-left highlight band, the insert's top-edge rim light, the touchpad's specular band, the top-left rim highlights on every button, and cast shadows falling **down-right**.
2. **Fill light:** large, weak, lower-right. Produces the bottom-right rim arcs (stick wells, D-pad recess, buttons) and keeps the black from crushing to `#000`.
3. **Rim light:** thin, from directly above, on the top silhouette edge only (2–3 px at 25–40 % white). This is what makes the controller read as a physical object.
4. **Ambient occlusion:** where the shell meets the insert (4–6 px dark gradient on the shell side, 2–3 px on the black side), inside every recess, under every button, and where the grips' inner edges face each other. Use a dark *neutral* (`#3A3733` at low alpha), never pure black.
5. **Contact shadow:** an ellipse under the controller — centre (500, 690), 980 × 46 px, `radialGradient` `rgba(20,18,16,0.28)` @0 → transparent @1, plus a tighter 700 × 24 px `rgba(20,18,16,0.18)` core.
6. **Never** use pure `#FFFFFF` for the shell or pure `#000000` for the insert: the result reads as clip-art. The shell's brightest pixel should be ≈ `#FBFAF8`; the insert's darkest ≈ `#08080A`.

### 4.4 Seam rendering recipe

Draw the dual-tone seam as two stacked strokes: (a) 3 px `rgba(60,55,50,0.45)` blurred 1.5 px — the AO side; (b) 1.5 px `#0B0B0D` @ 55 % on top — the groove line. Then add a 5 px `linearGradient` on the white side fading from `rgba(140,134,127,0.5)` to transparent, running perpendicular to the seam. The same recipe at half scale serves for the button outlines and the touchpad recess.

---

## 5. LIGHT BAR — BEHAVIOUR AND SVG FAKING

### 5.1 What it actually does [geometry high confidence; software behaviour medium]

* The DualSense's light bar is **two strips flanking the touchpad** (§3.2) — *not* the single bar behind the DualShock 4's touchpad, and *not* a ring around the touchpad.
* The strips are **diffused plastic light guides** fed by RGB LEDs. Lit, they read as bright, saturated bars with a **white-hot core** in the middle third and tapering ends.
* Colour is set by the system/game. The PS5's system default is a **PlayStation blue**; with several controllers connected, player colours may be shown (the DualShock 4-style blue/red/green/pink convention). Games may override with any colour and animate it (pulses, fades, sweeps).
* The two strips can be **driven independently** on the hardware; for a static illustration assume a single colour across both — that is the common case and never looks wrong. If you want to imply animation, keep the *same* hue on both and vary intensity only.
* The strips are **never off-and-invisible**: unlit they still read as milky translucent bars.

### 5.2 The default colour

| Role | Value |
|---|---|
| Nominal brand blue | `#0070D1` |
| Saturated mid | `#2C90FF` |
| Hot core | `#EAF6FF` |
| Cool edge / falloff | `#8FD0FF` |
| Glow spill | `rgba(44,144,255,0.35)` → transparent |
| Optional warm alternative (health / damage states) | `#FF8A2B`, core `#FFF0DC` |

### 5.3 Blend-mode-free glow recipe (safe in resvg-js)

Per strip, all on the same rounded-rect geometry (19 × 141 px, r = 9.5), in this z-order:

1. **Spill pool** — the rect inflated by 26 px, `radialGradient` `rgba(44,144,255,0.30)` @0 → `rgba(44,144,255,0.10)` @0.55 → transparent @1: the coloured wash on the black insert and the touchpad edge.
2. **Wide glow** — the rect, `fill="#2C90FF"`, blur **14 px**, opacity 0.30.
3. **Mid glow** — same rect, blur **6 px**, opacity 0.45.
4. **Tight glow** — same rect, blur **2 px**, opacity 0.55.
5. **Body** — the rect with a `linearGradient` along its length: `#2C90FF` @0 → `#8FD0FF` @0.3 → `#CFEBFF` @0.5 → `#8FD0FF` @0.7 → `#2C90FF` @1 (brightest at the middle third).
6. **Hot line** — a 3 px wide × 100 px long rounded line down the strip's centre axis, `#EAF6FF`, opacity 0.75, blurred 1.5 px.
7. **Rim definition** — a 1 px `rgba(255,255,255,0.35)` stroke on the strip outline so it keeps a crisp edge against its own glow.

```svg
<filter id="barBlurWide"  x="-120%" y="-60%" width="340%" height="220%">
  <feGaussianBlur stdDeviation="14"/>
</filter>
<filter id="barBlurMid"   x="-120%" y="-60%" width="340%" height="220%">
  <feGaussianBlur stdDeviation="6"/>
</filter>
<filter id="barBlurTight" x="-120%" y="-60%" width="340%" height="220%">
  <feGaussianBlur stdDeviation="2"/>
</filter>
```

* Additive stacking of low-opacity blurs (2–4) is visually equivalent to screen blending and avoids renderer differences. If your renderer **does** support `mix-blend-mode` (browsers do — verify before relying on it in resvg-js), wrap steps 2–4 in `<g style="mix-blend-mode:screen">` and drop the opacities to 0.20/0.30/0.35. Never blend the body or the hot line: they must stay opaque.
* **Reflections:** a 4 px soft coloured band inside the touchpad's left and right edges (`rgba(44,144,255,0.22)` → transparent over 14 px inward). Do **not** mirror the whole strip onto the touchpad.
* **Spill on the shell:** only for very bright colours — a 6 px `rgba(44,144,255,0.10)` halo across the dual-tone seam is enough; more looks like fog.
* Keep the glow's total footprint within ≈ 40 px (6.4 mm) of the strip. The real part's glow is tight, not a neon bloom.

---

## 6. PS LOGO

### 6.1 The mark, described as geometry

The PlayStation monogram is the italic capitals **P** and **S**, the **S smaller and tucked behind/right of the P**, drawn in one flat colour, with a small transparent gap where the S passes behind the P. `refs/glyphs.json` → `ps-logo` already implements this; the construction is given here so you can verify or re-author it.

* **Authoring frame:** upright italic-capital frame, 100 × 100 units, cap height 74 (y = 14 → 88), baseline y = 88.
* **The P:**
  * stem: vertical bar x = 8 → 23 (**15 units** wide = 20 % of the cap height), from cap top (y = 14) to baseline (y = 88).
  * bowl: sweeps right from the stem's top to x = 64 and down to y = 61 — a rounded rectangle with a **15-unit wall** (equal to the stem width), so the bowl's outer right edge is a half-round of radius 15.
  * proportions: bowl outer 56 units wide (x 8 → 64) × 47 tall (y 14 → 61) ⇒ it occupies the **upper 64 %** of the cap height; the counter (hole) is x 23 → 49 (26 wide) × y 29 → 45 (16.5 tall) ⇒ ≈ 35 % of the cap in width, ≈ 22 % in height, with an 8-unit inner radius.
  * the stem continues **below** the bowl to the baseline (a short, square tail).
* **The S:** a stroked skeleton, **13 units thick** (same visual weight as the P's 15-unit wall), cap height ≈ 61 = **83 % of the P's cap**, sitting to the right (skeleton x 68.5 → 92) with its lower lobe resting on the baseline: a smaller upper bowl and a larger lower bowl, ending in a round cap.
* **Italic slant:** shear **0.24** about the baseline y = 88 → 13.5° from vertical, top leaning right. In SVG: `matrix(1 0 -0.24 1 21.12 0)` for a design frame whose baseline is y = 88.
* **Overlap knockout:** mask the S with a copy of the P's silhouette stroked 3 units wider (a 1.5-unit transparent gap all round) so the P reads in front. Without the gap the letters merge into a blob at small sizes.
* **The "plinth":** in the full-size official mark the S's lower-left terminal sweeps left **beneath** the P's stem, so the P appears to stand on a base that slants with the shear. The glyph in `refs/glyphs.json` omits this under-sweep (it is invisible at 4.6 mm). If you want it: extend the S skeleton's lower end left to x ≈ 4–8 at y ≈ 84–88, keep the 13-unit stroke and the same knockout. Do **not** draw a separate rectangle or wedge as a "plinth" — the base must be made of the S's own stroke.
* **Baseline:** horizontal in the design frame. The apparent slant comes from the italic shear of the letters, not from tilting the baseline.

### 6.2 The "small square / circle marks"

They are **not part of the PS logo and not on the PS button.** On the DualSense the only ○ □ △ × marks are the four face-button symbols (§3.6). Small squares/circles visible inside the monogram are the P's **counter** (the bowl's hole) and the S's enclosed lobes; at 4–5 mm these read as small light shapes and are frequently mistaken for extra marks. The PlayStation *shapes* used in PS5 wordmarks and packaging are a separate graphic device — do not import them onto the controller.

### 6.3 How it is rendered on the DualSense PS button

| Property | Value |
|---|---|
| Size | ink **29 × 22 px** (4.6 × 3.5 mm) ≈ 39 % of the button's 75 px width |
| Placement | centred on the PS button at (500, 430); optically centred, 1 px above the geometric centre |
| Transform | `translate(485.5, 419) scale(0.345)` on the 100-unit glyph (s = 29 / 84 = 0.345) |
| Colour | `#DCDCE0` — the same light grey as the face-button symbols |
| Orientation | **upright**, horizontal; never rotated, never further italicised, never mirrored |
| Backlight | **none** — the PS button does not glow on the DualSense |
| Edge | a 0.4 px `rgba(0,0,0,0.35)` halo under the ink so it survives the button's specular sweep |

---

## 7. COMMON MISTAKES IN FAN-MADE DUALSENSE ART

Ordered roughly by how badly each one breaks recognition.

| # | Mistake | What is actually true | How to avoid it |
|---|---|---|---|
| 1 | **DualShock 4 proportions** (too wide, too short, aspect ≈ 1.65) | DualSense aspect is **1.509** (160 × 106 mm) | Lay out the 1000 × 663 px box first and refuse to deviate |
| 2 | **Wrong face-button order** (× right / ○ bottom, or △ at the bottom) | **△ top, ○ right, × bottom, □ left** — always, in every region | Print the 4-point map from §3.6 and check it before shading |
| 3 | **Mirrored controller** (D-pad right, face buttons left) | D-pad and Create are on the **left**; face buttons and Options on the **right** | Never use one `scale(-1,1)` to build the second half of the *controls* — only for the shell |
| 4 | D-pad drawn as **one cross-shaped rocker** or a dish | Four **separate keys** with diagonal gaps and a ⌀32 px central void | Build one key, then `rotate` 0/90/180/270 about (300, 290) |
| 5 | D-pad keys with **arrows printed** | The DualSense D-pad has **no markings** | Delete all arrows and dots |
| 6 | Light bar drawn as a **single bar behind/above the touchpad** (DS4) | Two strips **flanking** the touchpad, tilted with its sides | §3.2; no light anywhere else on the pad |
| 7 | Light bar on the **top edge**, the **back**, or as a **ring around the touchpad** | Front face only, two strips | — |
| 8 | **Coloured symbols** (blue ×, red ○, green △, pink □) | Monochrome light grey `#DCDCE0` | One ink colour for all four symbols |
| 9 | Symbols drawn **filled** (solid triangle, solid square) | All four are **outlines** at a uniform 9/100 weight | Use the `triangle/circle/cross/square` glyphs from `refs/glyphs.json` |
| 10 | Sticks **asymmetric** (Xbox-style offset) or under the D-pad (DS3) | Both sticks are **level and side-by-side, inboard and low** (y = 480 px) | Check the mirror: (356, 480) ↔ (644, 480) |
| 11 | Sticks with **no well recess**, or wells so large they collide with the D-pad/× button/seam | Well ⌀150 px; it clears the seam by ~11 px and the × button by ~7 px | Draw the well first, then the skirt, then the cap |
| 12 | PS button drawn **round, large, coloured, glowing, or above the touchpad** | 75 × 34 px dark pill **below the touchpad, between the sticks**, never lit | §3.7 |
| 13 | **Mute button missing**, or drawn without an LED, or with a red LED | Small pill below the PS button with an **amber** LED | §3.7 |
| 14 | Whole controller **one colour** (all black or all white) | **Dual tone**: white shell / black insert, seam exactly as in §2 | Build the black insert as a closed region *first* |
| 15 | Seam in the wrong place: **white wrapping the top edge or the USB-C**, white over the D-pad/buttons, or the black not reaching the top-centre | Black owns the top-edge bridge (x 330–670), the whole control zone, and the underside band | §2.2 |
| 16 | **USB-C** too big, wrong shape (micro-USB trapezoid), rotated, or on white plastic | 59 × 19 px rounded slot, horizontal, in the black bridge at (500, 33) | Use the `usb-c` glyph at s = 0.78 |
| 17 | **Headphone jack** too large, off-centre, or drawn on the front face | ⌀22 px at (500, 568), on the bottom edge, centred | §3.9 |
| 18 | Shoulders drawn as a **row of four equal buttons**; triggers invisible; triggers drawn *in front* of the shell so they float on the face | L1/R1 are bands on the top edge; L2/R2 are rounded caps rising ≈10 mm **above** the shell line and occluded by it | Draw the triggers first (under the shell) |
| 19 | Trigger tilt reversed (outer end **higher**) | The outer end is **lower**: L1 `rotate(-20)`, R1 `rotate(20)` | Match the wing's falling top edge |
| 20 | **Create/Options icons swapped**, Options without three lines, Create drawn as a camera | Create = capture/share glyph (left), Options = three equal lines (right) | §3.3 |
| 21 | Create/Options placed at the **touchpad's mid-height** (DS4 position) | They sit **lower** — level with the touchpad's lower third (y = 199 px), tilted 6° | — |
| 22 | Touchpad drawn as the DS4's **small rectangle**, or with a **grid/dot texture**, or **backlit** | Large rounded trapezoid 325 × 194 px, smooth, unlit | §3.1 |
| 23 | Grips **too short**, not splayed, or the gap between them too narrow | Grips descend to y = 681 (≈19 mm below the underside), gap 390 → 540 px top-to-bottom, outer edges bowed ≈26 px | §1.2 |
| 24 | Grips drawn with **straight** edges, or the inner edge not hooking in | Outer edge convex out then concave out; inner edge bows 6–10 px inward | Use the tangent table |
| 25 | Adding **screws, vents, mesh grilles, slits beside the jack, or a SONY wordmark** on the front | None exist | §3.12 |
| 26 | **Pure `#FFFFFF` / `#000000`** fills, no AO, hard cartoon shadows | Shell max ≈ `#FBFAF8`, insert min ≈ `#08080A`, AO at every join | §4 |
| 27 | Light bar glow as a **giant neon bloom** covering the face | The real glow stays within ≈40 px of each strip | §5.3 |
| 28 | Mic/speaker **hole count invented** (20 holes, or a mesh panel) | 11 grille holes + 2 mic inlets, or nothing | §3.8 |

---

## 8. BUILD ORDER, QA CHECKLIST, CONFIDENCE SUMMARY

### 8.1 Recommended z-order (bottom to top)

| Layer | Content |
|---|---|
| 1 | Contact shadow (blurred ellipse) |
| 2 | **L2/R2 triggers** (full shapes; the shell will clip them) |
| 3 | Silhouette fill: white shell base + its gradients |
| 4 | **Black insert** closed region (§2.2) + gradients and inner AO |
| 5 | Top-edge black bridge, USB-C recess, headphone-jack recess |
| 6 | Stick wells → gimbal skirts → caps → dish and rim texture |
| 7 | D-pad recess → 4 keys → gaps and contact shadows |
| 8 | Face buttons → symbol inks |
| 9 | Touchpad recess → touchpad → its sheen |
| 10 | Light-bar strips: spill pool → glows → body → hot line → rim |
| 11 | Create/Options buttons → icons |
| 12 | PS button → PS logo; mute LED → mute button → mic icon |
| 13 | L1/R1 bands, shoulder seams and shadows |
| 14 | Speaker grille and mic inlets |
| 15 | Dual-tone seam groove + AO, button outlines, touchpad seam |
| 16 | Finishing: rim light on the top silhouette, dust/noise, vignette |

### 8.2 QA checklist — render, then verify against the spec

- [ ] Silhouette bounding box is 1000 × 663 px, top y = 18, bottom y = 681.
- [ ] Both grips reach the bottom of the box; the gap between them widens downward.
- [ ] The top edge is convex-up everywhere; the peak is on the centreline.
- [ ] Two trigger caps are visible above the shoulder line, outer end lower.
- [ ] USB-C is a horizontal rounded slot in black, dead centre of the top edge.
- [ ] Headphone jack is a ⌀22 px dark circle at the bottom centre, on the underside edge.
- [ ] White/black seam: black reaches the top edge at the centre, owns the whole control zone, forms the underside band.
- [ ] Touchpad is wider at the top than at the bottom, no grid, no glow.
- [ ] Light strips flank the touchpad, tilted with its sides, glow tight.
- [ ] D-pad is four keys with diagonal gaps and a central void, no arrows.
- [ ] Sticks are level, symmetric, inboard, in ⌀150 px wells with textured rims.
- [ ] Face symbols read **△ top / ○ right / × bottom / □ left**, one light grey, all outlines.
- [ ] PS button is a wide pill between the sticks with an upright PS logo and no glow.
- [ ] Mute button sits below the PS button with an amber LED.
- [ ] No screws, vents, mesh or wordmark anywhere on the front.
- [ ] Nothing is pure `#FFF` or `#000`; AO is present at every join and recess.
- [ ] No two control footprints overlap (the layout in §3.0 was checked by rendering).

### 8.3 Confidence summary — where to spend your checking time

| Item | Tag | Suggested action |
|---|---|---|
| Overall size and aspect (160 × 66 × 106 mm, 1.509) | **[H]** | Trust it |
| Symbol order; monochrome outline symbols | **[H]** | Trust it |
| Dual-tone concept (white shell / black insert; controls on black) | **[H]** | Trust it |
| Light bar = two strips flanking the touchpad | **[H]** | Trust it |
| Jack centre-bottom, USB-C centre-top, touchpad not backlit, PS button not lit | **[H]** | Trust it |
| All pixel positions and sizes in §1–§3 | **[M]** | Compare with one straight-on product photo at the same aspect; expect ≤ 12 px corrections |
| Touchpad trapezoid angle and bottom bow; grille arc curvature | **[M]** | Fine-tune to taste |
| Speaker grille / mic inlet existence and placement | **[L]** | Check a teardown or straight-on photo; primary reading in §3.8 |
| Create button icon (capture glyph vs share glyph) | **[L]** | The kit's share glyph is acceptable; §3.3 gives the literal alternative |
| Mute LED as a separate bar vs the mute key's top edge | **[L]** | Either reads correctly; §3.7 |
| Underside edge depth between the grips | **[L]** | §1.3 — worth ≤ 30 px |

### 8.4 Everything an engineer needs, in one place

* Frame: `0 0 1000 700`; controller box `x 0–1000`, `y 18–681`; scale **6.25 px/mm**; mirror axis **x = 500**.
* Silhouette: 25 anchors + tangents (§1.2), suggested cubics, one large blend (r ≈ 40 px) at (313, 559) and its mirror.
* Seam: 12 anchors + tangents (§2.2), plus a clearance table (§2.3).
* 17 controls with centres, sizes, rotations and glyph scales (§3.0–§3.12).
* Palette with base/highlight/mid/shadow/deep for every material (§4.1), six gradients (§4.2), the lighting model (§4.3), the seam recipe (§4.4).
* Light-bar recipe: 7 stacked layers + 3 filters (§5.3).
* PS logo: authoring frame, P and S proportions, shear 0.24, knockout gap, button transform (§6).
* 28 named mistakes to avoid (§7).
* Build order and QA checklist (§8.1–§8.2).













