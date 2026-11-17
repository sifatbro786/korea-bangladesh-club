# KBBCC — Design System

Source of truth for visual decisions. Tokens are implemented in `app/globals.css` (`@theme`).
Never hardcode hex values in components — use the token utilities (`bg-surface`, `text-accent`, `border-line`, ...).

## Colour

| Token | Value | Use |
|---|---|---|
| `bg` | `#0B0C0E` | Page background |
| `surface` | `#141619` | Raised panels, cards |
| `surface-2` | `#1B1D21` | Hover / nested surfaces |
| `heading` | `#F4F1EA` | Headings, key text |
| `body` | `#9A9891` | Body copy |
| `muted` | `#8C8A84` | Captions, meta (≥4.5:1 on every dark surface) |
| `accent` | `#C6A87C` | Champagne — links, ornaments, active states |
| `accent-soft` | `#A88D65` | Accent hover/pressed |
| `line` | `rgba(198,168,124,0.2)` | 1px dividers and hairlines |
| `crimson` | `#7A1820` | Logo red deepened to oxblood for a dark UI — used once on the homepage (membership band) |
| `danger` | `#E0A39C` | Form validation messages and invalid field borders only |
| `navy` | `#1D2A4D` | Logo navy, desaturated — max ~5% of a screen |

### Tonal rhythm (2026-11-17)

The site is dark-first, but never one flat tone for long. Sections alternate:

- **Dark** `bg` · **Warm dark** `bg-warm` (`#15120E`) · **Surface** `surface` · **Crimson** band (once per page) · **Ivory** (`theme-ivory`).
- `theme-ivory` remaps the tokens inside the section (bg `#F4F1EA`, heading `#141619`, body `#4A4842` 8.1:1, muted `#6E6A62` 4.8:1, accent `#7A5E38` 5.3:1, line 14% ink). The dark-theme champagne fails AA on ivory, hence the deeper accent. Grain is inverted there.
- Homepage: Intro and Visit are ivory. Use at most 2–3 ivory sections per page, never two in a row.
- Photo grade tints are fixed champagne and do not follow section themes.

### Atmosphere

- `glow-lamp`: one static, soft champagne radial light (`--gx`, `--gy`, `--gs`, `--ga`). Reads as lamplight. Never animated, never multicolour mesh/aurora gradients.
- `LineArt` (`components/ui/LineArt.js`): `ring` (from the emblem ring) and `lattice` (changhoji window). Hairline, `text-accent`, 8–14% opacity, partly off-canvas behind section headers.

Tailwind's default palette is wiped (`--color-*: initial`), so `orange-500`, `indigo-*`, `white` and `black` do not exist on purpose.

## Form controls

- Inputs: underline only (`border-b border-line`), label in tracked caps above.
- Selects use `components/ui/Select.js` (ARIA select-only combobox), never a native `<select>`: the OS draws native option lists in its own colours.

## Typography

- **Display:** Cormorant Garamond (variable, normal + italic) — headings only, never below 32px. Weight 300–500.
- **UI / body:** Jost (variable) — geometric, Art-Deco club character. Base 17px / 1.7.
- Labels: `text-label` (11px), uppercase, `tracking-label` (0.24em), colour `accent` or `muted`.
- Scale: `text-display-lg` (hero), `text-display-md` (section titles), `text-display-sm` (sub-titles), `text-lg`, `text-base`, `text-sm`, `text-label`.
- Contrast rule from references: display-to-body size ratio of 6–8x; body copy in narrow columns (max ~60ch).

## Shape & depth

- Corners: `rounded-none`; max `rounded-hair` (2px). `rounded-full` only for small circular ornaments/badges.
- Dividers: `border-line`, 1px. Hairline divider can carry a small centred circle ornament.
- No shadows (`--shadow-*` wiped). Depth comes from surface steps and photography.

## Identity layer (Korea × Bangladesh)

- Hanji paper grain: very subtle noise texture overlay on select surfaces (CSS/SVG, not a raster image).
- Hairline ornaments derived from dancheong and nakshi kantha line patterns — thin, champagne, used as dividers and frames only.
- Ornamental frames (window-lattice / changhoji silhouette) as image masks, used sparingly.
- Real photography over illustration.

## Photography

- Club photos live in `public/images/club/` (named by scene) and are registered in `content/media.js`.
- Always render through `components/media/ClubImage.js`, never a raw `<img>` or a bare `next/image`.
- Grade treatments (CSS, on the image wrapper):
  - `club` → `photo-grade`: `saturate(.4) contrast(1.12) brightness(.74)` + champagne multiply overlay at 42%. Tames the yellow boardroom walls and mixed lighting.
  - `soft` → `photo-grade-soft`: `saturate(.72) contrast(1.05) brightness(.86)` + champagne multiply at 18%. For curated Unsplash photography.
  - `none` → untouched (logos, documents).
  - Optional `fade` → `photo-fade-b`: bottom gradient into `bg`, for images that bleed into text.
- Where club photos are not enough, use Unsplash (`lib/unsplash.js`). Every image becomes admin-editable in Phase 2.
- Preview all images and grades at `/dev/media` (dev only).
- The AI-generated "Business Exchanges" banner is not used on the site.

## Motion

- Lenis smooth scroll (respects anchor links; disabled on `prefers-reduced-motion`).
- Easing token: `ease-club` = `cubic-bezier(0.22, 1, 0.36, 1)`.
- Restrained: reveals, masked text lines, image clip reveals and slow parallax only. See HANDOVER.md → Decisions for the library strategy.

## Banned (anti-slop)

Inter / Roboto / Poppins / Open Sans / Arial / Plus Jakarta Sans; Tailwind orange/indigo/purple gradients; pure #000/#fff; equal 3-column card grids; a centred hero with two pill buttons; glassmorphism stat bars; gradient text; count-up number bars; emoji icons; lorem ipsum.

## References

`design-refs/inspiration/` — taste reference only (rhythm, hierarchy, spacing, contrast). Never copy layout or content.
