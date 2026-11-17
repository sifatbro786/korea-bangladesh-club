# HANDOVER — KBBCC

_Last updated: 2026-11-17 · Phase 0 complete (Step 4 done) → next: Phase 1 Step 1 (Header/Nav)_

## Project snapshot
- Next.js 16.4.6 (App Router, JS), React 19.3, Tailwind v4.3 (via `@tailwindcss/turbopack`), React Compiler on, `cacheComponents` + `partialPrefetching` on.
- Fonts: Cormorant Garamond (display) + Jost (UI/body) via `next/font/google`, latin only.
- Design tokens: `app/globals.css` (`@theme`); docs in `DESIGN.md`.
- Dependencies added: `lenis` 1.3.27, `gsap` 3.15.1 (exact-pinned).

## Folder map
- `app/` — routes (`layout.js` has fonts + metadata; `page.js` is still a placeholder)
- `app/dev/media/` — dev-only media/grade preview (`/dev/media`, 404 in production)
- `app/dev/motion/` — dev-only motion check (`/dev/motion`: anchors, Reveal, GSAP scrub/parallax)
- `lib/motion/runtime.js` — Lenis singleton + `loadGsap()` (lazy) + Lenis↔gsap.ticker handover
- `components/motion/SmoothScroll.js` — mounted once in `layout.js`; starts Lenis, adds `html.motion-ready`, follows reduced-motion live
- `components/motion/Reveal.js` — library-free scroll reveal (shared IntersectionObserver; CSS in `globals.css`)
- `components/loader/` — first-visit loader: `loaderScript.js` (inline head script + storage key/TTL), `InitialLoader.js` (server markup), `LoaderController.js` (client: waits, progress, exit). Styles in `globals.css` (`.loader*`, `grain` utility)
- `components/motion/useGsap.js` — `useGsap(scopeRef, ({ gsap, ScrollTrigger, reduce }) => {...})`; auto-reverted on unmount
- `content/` — static content that mirrors future MongoDB documents (`site.js` = settings singleton, `media.js` = media collection)
- `lib/content.js` — **the only way components read content** (`getSiteSettings`, `getMedia`, `getMediaList`); `server-only`
- `lib/unsplash.js` — `unsplashSrc(photoPath)` caps Unsplash originals at 2400px
- `components/media/ClubImage.js` — the only image primitive (next/image + grade + blur placeholder)
- `public/images/club/` — real club photos, renamed by scene (15 files)
- `public/images/brand/logo-source.jpeg` — low-res source logo (324px JPEG); needs a vector replacement
- `design-refs/inspiration/` — taste references (moved out of `public/` so they are not deployed)
- `design-refs/_unused-club-photos/` — duplicates, burst shots and the AI banner (kept, not deleted)

## Phase plan
- **Phase 0 — Foundation**
  - [x] Step 0: Audit
  - [x] Step 1: Assets organised, design tokens, fonts, DESIGN.md, HANDOVER.md
  - [x] Step 2: Image strategy (Unsplash remotePattern, AVIF/WebP, quality allowlist, localPatterns), photo grade utilities, media registry with blur placeholders, content access layer, `/dev/media` preview
  - [x] Step 3: Motion foundation — Lenis (anchors, stopInertiaOnNavigate), lazy GSAP + ScrollTrigger on one ticker, `<Reveal>`, `useGsap`, reduced-motion everywhere, `/dev/motion`
  - [x] Step 4: Initial loader — SSR overlay, head-script gating (no flash), waits for fonts + images in first 2.5 viewports (min 4.2s, cap 6.5s), hairline progress, curtain exit, scroll lock, CSS failsafe, `onLoaderDone()` hook
- **Phase 1 — Static frontend** (one section per step): header/nav → hero → intro → about → membership → events → leadership → gallery → contact/map → footer. Then inner pages.
- **Phase 2 — Backend + admin dashboard:** MongoDB, auth (JWT/httpOnly), every page's text and images editable, image upload.
- **Phase 3 — E-commerce:** single-store B2B/B2C, managed by the club, connected to B&F's Kmarket.com.

## Decisions (locked)
1. **Body font is Jost, not Plus Jakarta Sans** — Jakarta reads as a generic AI default; Jost gives Art-Deco club character and pairs with Cormorant.
2. **Images:** use the club photos wherever they fit; fill the gaps with Unsplash. All images are routed through the content layer so the admin dashboard can replace them in Phase 2.
3. **Animation library strategy:** avoid Framer Motion's stock look. Plan: GSAP (core + ScrollTrigger, plus SplitText where needed; all free since 2025) **loaded lazily in client islands only** — never in the critical path — synced with Lenis's RAF, with `gsap.matchMedia()` for reduced-motion. Simple reveals use CSS + IntersectionObserver with no JS library. anime.js v4 is the fallback if GSAP's bundle cost shows up in Lighthouse. Approved by Sifat and implemented in Step 3 (see decision 9).
4. **Initial loader (4–5s), done in a Lighthouse-safe way:**
   - Server-rendered overlay (no JS needed to show it); the real page paints underneath at full opacity, so LCP is the real hero and not a delayed reveal.
   - While the overlay shows: wait for `document.fonts.ready` + above-the-fold and next-section images (`img.decode()`), with a 4–5s minimum hold and a hard cap so a slow network never traps the user.
   - Shown on first visit, then not again for 12h (`localStorage`, `LOADER_TTL_MS`; per-tab sessionStorage replayed it in every new tab). `?loader` in the URL forces it. Reduced motion: 0.7s hold, no animation.
   - Implemented in Step 4. Off-DOM image warm-up (same srcset/sizes) instead of mutating `<img loading>` — mutating caused hydration mismatches on streamed segments.
   - Hero intro animations must start from `onLoaderDone()` (fires at exit start, or immediately when skipped).
   - Lighthouse risk: lab runs always get a fresh profile, so they always see the loader → **Speed Index will be penalised** (~10% weight). LCP itself is not delayed (content paints underneath). Re-measure after the hero ships; if mobile score < 90, lower `MIN_MS` rather than hide the loader from Lighthouse.

5. **Content layer contract:** components never import `/content/*`; they call async getters in `lib/content.js`. Phase 2 swaps only those function bodies to MongoDB + `"use cache"` + `cacheTag`. Unknown facts (phone, email, socials) stay `null` and the UI hides them — never invented.
6. **Images:** every image is a `Media` record (id, src, alt, width, height, objectPosition, grade, source, credit, blurDataURL) rendered through `ClubImage`. Unsplash photos get added to `content/media.js` with `source: "unsplash"`, `grade: "soft"` and a credit, in the step where they are first needed. Phase 2 uploads must generate width/height/blurDataURL server-side (sharp).
7. **Grade treatment is CSS, not baked into files** (`photo-grade`, `photo-grade-soft`, `photo-fade-b` in `globals.css`), so admin-uploaded photos get the same look automatically.
8. **next/image (Next 16):** use `preload` (not the deprecated `priority`) for the LCP image; allowed qualities are `[60, 75]` only; formats AVIF then WebP.

9. **Motion rules:**
   - Initial JS carries only Lenis + the runtime (~9 KB gz). GSAP loads lazily via `useGsap` (verified: no GreenSock code in the initial chunks).
   - Default to `<Reveal>` (CSS). Use `useGsap` only for scroll-scrubbed or sequenced effects. Do not add Framer Motion.
   - Never wrap the LCP element (hero heading/image) in `<Reveal>` or any opacity-0 start state.
   - Reduced motion: Lenis is not created; Reveal shows content immediately; `useGsap` passes `reduce: true` → set final states only.
   - Reveal failsafe: if the motion runtime never boots, hidden content appears after 4s.
   - SplitText (free in gsap 3.13+) is allowed for display headings when a section needs it; import it lazily like ScrollTrigger.
   - gsap is under GreenSock's "Standard no-charge" licence: fine for this client site.

## Open items (waiting on client/Sifat)
- Logo as SVG or high-res transparent PNG.
- Name and title of the person in `leader-portrait-01.jpg`; committee member list.
- Original high-res photos (not WhatsApp-compressed), especially the club space at Rupayan Millennium Square.
- Club phone, email and social links (`content/site.js` has them as `null`).

## Known caveats
- `.next/kbbcc-src.tgz` is a throwaway source snapshot used for browser testing; it is inside the gitignored build folder and disappears on the next `next build`/clean.
- Lockfile was edited surgically to add only gsap + lenis (a Linux npm 10 would drop the `libc` fields your Windows npm writes). Run `npm install` once on Windows to confirm it is a no-op.
- `node_modules` was installed on Windows; build/lint must be run on Sifat's machine (`npm run build`, `npm run lint`).
- `AGENTS.md` is auto-generated by `next dev` — read `node_modules/next/dist/docs/` before using any Next API.
