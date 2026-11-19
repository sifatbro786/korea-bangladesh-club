# HANDOVER — KBBCC

_Last updated: 2026-11-19 · **Phase 1.5** — step 24a (i18n foundation, EN/KO) done → next: 24b Korean copy for header/footer + homepage_

## Project snapshot
- Next.js 16.4.6 (App Router, JS), React 19.3, Tailwind v4.3 (via `@tailwindcss/turbopack`), React Compiler on, `cacheComponents` + `partialPrefetching` on.
- Fonts: Hahmlet (display) + Google Sans (UI/body), self-hosted via `next/font/local` from `app/fonts/` (variable woff2, latin only, OFL licences beside them).
- Design tokens: `app/globals.css` (`@theme`); docs in `DESIGN.md`.
- Dependencies added: `lenis` 1.3.27, `gsap` 3.15.1 (exact-pinned).

## Folder map
- `app/[locale]/layout.js` — ROOT layout (locale is a root param): `<html lang>`, fonts, metadata (og:locale), loader head script, `<InitialLoader>`, `<SmoothScroll>`; `generateStaticParams` → en + ko
- `proxy.js` — locale routing (see decision 49) · `app/global-not-found.js` — 404 for unmatched URLs (`experimental.globalNotFound`) · `app/font-config.js` — shared `next/font/local` setup
- `lib/i18n/config.js` (client-safe: `LOCALES`, `localizePath`, `stripLocale`, cookie name) · `lib/i18n/server.js` (`getLocale()` via `next/root-params`, `getDictionary()`, `localeAlternates(path)`, `deepMerge`) · `lib/i18n/dictionaries/{en,ko}.js` — UI strings
- `components/i18n/LocaleLink.js` — the ONLY link component (wraps next/link, adds `/ko`) · `components/i18n/LocaleSwitch.js` — EN / KO switch
- `content/ko/` — Korean overrides per content document (`index.js` registry), merged over English by index/key
- `app/[locale]/(site)/` — public site route group (all routes below moved under `app/[locale]/` on 2026-11-19; paths in this list are relative to it): `layout.js` (skip link, Header, `<main>`, Footer), `page.js` (homepage). Phase 2 admin gets its own group.
- `components/layout/` — `Header.js` (server) + `HeaderClient.js` (scroll state, hide-on-scroll, mobile menu dialog), `Footer.js` (marquee, columns, cached year)
- `components/home/` — one file per homepage section: Hero (+HeroIntro), Intro, Pillars, Clubhouse, Events, Membership, Leadership, Moments (+MomentsTrack), Visit
- `components/ui/` — `SectionLabel`, `Ornament`, `Arrow`, `ArrowLink` (the only CTA style; no pill buttons)
- `components/motion/` — `Parallax`, `SplitHeading` (line-mask heading reveal, SplitText), `ScrubText` (word-by-word scroll fill), `StackPanels` (sticky stacked panels + depth), `Shutters` (hanji lattice shutters open on scroll), `Marquee` (scroll-velocity marquee), `DrawLine` (scroll-drawn hairline). All lazy GSAP, all static under reduced motion.
- `components/ui/Select.js` — themed, accessible select (combobox + listbox, keyboard, typeahead, hidden input for FormData); `components/ui/LineArt.js` — ring / lattice hairline ornaments
- `components/gallery/GalleryBrowser.js` (filter + masonry + `<dialog>` lightbox), `components/news/NewsList.js`, `components/contact/ContactForm.js` + `MapEmbed.js` (click-to-load facade), `components/forms/Field.js` (shared field + input style), `components/page/LegalPage.js`
- `app/(site)/gallery`, `app/(site)/news`, `app/(site)/news/[slug]`, `app/(site)/contact`, `app/(site)/privacy`, `app/(site)/terms`, `app/not-found.js` (global 404 with site chrome)
- `content/gallery.js`, `content/news.js` (posts: news | notice, block body), `content/contact.js`, `content/legal.js`
- `app/sitemap.js`, `app/robots.js` (disallows /dev/), `app/manifest.js`, `app/opengraph-image.js` (default share image, static at build) · `lib/seo.js` (`SITE_URL`, `absoluteUrl`) · `components/seo/JsonLd.js` (Organization on home, Event on event pages, NewsArticle on news pages)
- `app/(site)/members/` + `components/members/` (`OfficeBearers`, `ExecutiveCommittee`, `Directory`, `Country`) + `content/members.js` (getter: `getMembersPage()`, officers sorted by `rank`)
- `components/page/` — `PageHero` (inner-page hero; h1 never hidden), `CtaBand`
- `components/about/`, `components/membership/`, `components/events/` — page sections; `ApplicationForm` + `EventsBrowser` are the client islands
- `app/(site)/about`, `app/(site)/membership`, `app/(site)/events`, `app/(site)/events/[slug]` (generateStaticParams over all slugs; unknown slug → 404)
- `content/about.js`, `content/membership.js`, `content/events.js` (events collection with admin-set `status`)
- `public/images/brand/logo.png` — official emblem cut out from the JPEG (corner background removed by flood fill, ribbon intact); `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` generated from it
- `content/navigation.js`, `content/home.js` — nav + homepage copy (mirrors future Mongo docs); `draft: true` marks placeholder copy
- `app/dev/media/` — dev-only media/grade preview (`/dev/media`, 404 in production)
- `app/dev/motion/` — dev-only motion check (`/dev/motion`: anchors, Reveal, GSAP scrub/parallax)
- `lib/motion/runtime.js` — Lenis singleton + `loadGsap()` (lazy) + Lenis↔gsap.ticker handover
- `components/motion/SmoothScroll.js` — mounted once in `layout.js`; starts Lenis, adds `html.motion-ready`, follows reduced-motion live
- `components/motion/Reveal.js` — library-free scroll reveal (shared IntersectionObserver; CSS in `globals.css`)
- `components/loader/` — first-visit loader: `loaderScript.js` (inline head script + storage key/TTL), `InitialLoader.js` (server markup), `LoaderController.js` (client: waits, progress, exit). Styles in `globals.css` (`.loader*`, `grain` utility)
- `components/motion/useGsap.js` — `useGsap(scopeRef, ({ gsap, ScrollTrigger, reduce }) => {...})`; auto-reverted on unmount
- `content/` — static content that mirrors future MongoDB documents (`site.js` = settings singleton, `media.js` = media collection)
- `lib/content.js` — **the only way components read content** (`getSiteSettings`, `getMedia`, `getMediaList`); `server-only`
- `lib/unsplash.js` + `lib/unsplash.config.mjs` — `unsplashSrc(photoPath)`; host + the ONE allowed query string live in the `.mjs` (shared with `next.config.mjs`)
- `components/ui/InlineScript.js` — pre-paint inline script without React's dev "script tag" warning (used for the loader head script)
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
- **Phase 1 — Static frontend** (one section per step)
  - [x] 1 Header/Nav · [x] 2 Hero (Seoul|Dhaka diptych) · [x] 3 Intro · [x] 4 Pillars (Trade/Investment/Culture) · [x] 5 Clubhouse · [x] 6 Events · [x] 7 Membership band · [x] 8 Leadership · [x] 9 Moments (pinned horizontal) · [x] 10 Visit · [x] 11 Footer
  - [x] 12 About (story, values, committee, CTA) · [x] 13 Membership (benefits, tiers, process, FAQ, application form UI) · [x] 14 Events (filterable list with cursor preview + detail pages) · [x] 15 Gallery (+ Unsplash credits, auto-collected) · [x] 16 News & notices (list + detail) · [x] 17 Contact (form + map facade), Privacy, Terms, custom 404
  - [x] 18 Responsive + a11y pass (axe-core: 0 violations on 10 pages × desktop/mobile; no overflow at 360/768/1024/1920; keyboard + skip link verified) · [x] 19 SEO (sitemap, robots, manifest, OG image, canonicals, JSON-LD) · [x] 20 Lighthouse mobile 90+ (median: home 91, membership 93, event 95; others 89–97; a11y/BP/SEO 100)
- **Phase 1.5 — Sifat feedback (2026-11-19)**
  - [x] 21 Hero city labels → "South Korea" / "Bangladesh" (city + coords stay as the sub-line); hero body copy says "South Korea and Bangladesh"
  - [x] 22 Header wordmark: "KBBCC" text removed, full name as a two-line lockup at all sizes; nav: Membership removed (reached via "Apply for membership" CTA → `/membership`), **Members** added
  - [x] 23 `/members` page: PageHero · Office bearers (President feature + staggered officer portraits) · Executive committee (ivory ledger) · Member directory (grouped by category, no JS) · CtaBand
  - [x] 24a i18n foundation (Option A, no dependency — Sifat 2026-11-19): `app/[locale]` root, `proxy.js`, EN/KO switch in header + mobile menu, `LocaleLink`, localized content layer, hreflang + sitemap alternates, global 404, Korean nav labels + header UI strings
  - [ ] 24b Korean: header/footer strings + homepage copy · [ ] 24c About + Members · [ ] 24d Membership (+ form labels) · [ ] 24e Events + News (collections) · [ ] 24f Gallery, Contact, Legal, 404, page `meta` titles · [ ] 24g Korean web font decision
- **Phase 2 — Backend + admin dashboard:** MongoDB, auth (JWT/httpOnly), every page's text and images editable, image upload.
- **Phase 3 — E-commerce:** single-store B2B/B2C, managed by the club, connected to B&F's Kmarket.com.

## Decisions (locked)
1. **Body font is Google Sans** (Sifat, 2026-11-17; was Jost, originally Plus Jakarta Sans — rejected as an AI default). Variable 400–700, so nothing below 400 in UI text.
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

10. **Homepage composition:** sections are server components fed by `getHomePage()`; only Header, HeroIntro, Reveal, Parallax, MomentsTrack are client islands. The h1 ("Two nations. / One table.") is never hidden — hero intro animates only images, seam and secondary text, triggered by `onLoaderDone()`.
11. **Images (Sifat, 2026-11-17):** club photos are used only where they genuinely fit (sessions, recognition, dinners, portrait). Everything else uses curated free-licence Unsplash photos (8 in `content/media.js`, each with credit). All are admin-replaceable.
12. **No Google Maps iframe** on the homepage (heavy JS for one link) — address + "Open in Google Maps" link. The Contact page can embed a click-to-load map later.
13. **Crimson token deepened to `#7A1820` (oxblood)** — the brighter red read too loud across a full-width band.

14. **Unsplash allowlist (bugfix 2026-11-17):** `remotePatterns: [new URL("https://host/**")]` forbids ANY query string, so every Unsplash URL 500'd. Now an object pattern with `search: UNSPLASH_QUERY` (exact match). Any other query → 400. Never add `search`-less patterns (that allows every query).
15. **Inline head script:** rendered via `InlineScript` (server `text/javascript`, client `text/plain`, per Next's "preventing flash before hydration" guide). `LoaderController` re-applies `data-loader` in `useLayoutEffect` because dev Strict Mode resets `<html>` attributes (no-op in production).
16. Dev-only notice "rendering with server caches disabled" = the request had `cache-control: no-cache` (DevTools "Disable cache" or hard reload). Not a bug.

17. **Homepage v2 (Sifat feedback 2026-11-17):** hero Dhaka pane → modern metro-rail aerial (Unsplash, Tatiana Mokhova); "What we do" rebuilt as full-screen stacked panels (was a dark zig-zag that read as boring); real logo in header, loader, footer and favicons.
18. **Motion inventory (homepage):** hero intro after loader + scroll-out split · Intro word scrub · section headings line-mask reveal · Pillars stacked panels · image curtain (clip) reveals · Clubhouse parallax · Membership hanji shutters · Moments pinned horizontal · footer velocity marquee. GSAP + SplitText stay out of the initial bundle (verified).
19. **Rule for full-bleed images:** `ClubImage` wrapper is `relative h-full`; to layer content over it, put it inside an `absolute inset-0` box (the Pillars bug where titles were pushed out of view).
20. **Events:** homepage "What's on" reads from `content/events.js` (first upcoming + latest past). `status` is admin-set, not computed from the date, so pages stay static.
21. **Membership form is a UI mock** (validation, honeypot, a11y done; submit only fakes success). Must become a Server Action (zod, rate limit, Mongo, email) in Phase 2 before launch. Tier "Apply" links scroll to `#apply` (no query preselect — would need `useSearchParams` + Suspense under cacheComponents).

22. **Theme direction (Sifat, 2026-11-17):** stay dark-first, add tonal rhythm instead of going light: `theme-ivory` sections (homepage Intro + Visit), warm-dark Clubhouse, static champagne `glow-lamp` (hero, membership band), `LineArt` ring/lattice behind Pillars and Moments headers. No animated/mesh gradients. Roll out to inner pages next (About values, Membership benefits + form are the candidates).
23. **Native `<select>` removed** from the application form (OS-drawn white option list). `Select` component instead; validation focuses `[data-field=name]`.
24. **About story heading is no longer sticky** (Sifat asked for it to stay in place). Event detail sidebar is still sticky by design.
25. `metadataBase` reads `SITE_URL` (env) — set it on deploy for correct OG image URLs.

26. **Tonal rhythm rolled out site-wide:** every `PageHero` has a lamp glow + ring line-art. Ivory sections: About Values · Membership Benefits + Application · Events "Recently" · event/news article bodies · Gallery credits · News list · Contact form · Legal bodies. Warm-dark: About Story, Membership FAQ, homepage Clubhouse.
27. **Marquee bug (home only):** it used a position-based ScrollTrigger whose end was measured before pins/images grew the page, so it stopped updating near the footer. Now uses `ScrollTrigger.observe` (scroll deltas/velocity only). Also `useGsap` now schedules one `ScrollTrigger.refresh()` after any trigger is created/reverted, so later pins never leave earlier triggers mis-measured.
28. **Contact form prefill:** event "Reserve a place" links go to `/contact?subject=<event-slug>` → subject "events" + message prefilled. Read via `useSyncExternalStore(location.search)` (no `useSearchParams` → no Suspense needed under cacheComponents). Form is a Phase-1 mock like the membership form.
29. **Map:** click-to-load Google Maps iframe (no third-party request or map JS until asked; privacy notice mentions it). Dark-styled with CSS filter.
30. **Legal pages are drafts** — sensible defaults for a club site (no tracking cookies; one localStorage value for the loader). Need the club's legal review before launch.

31. **Loader is first visit per 12h, not per page load** (`localStorage`). Test with `?loader`, a private window, or clear `kbbcc:loader-seen`.
32. **A11y fixes (step 18):** muted token #6B6A65 → #8C8A84 (was 3.4:1); header logo link name now matches visible text; Moments track is a focusable labelled region; Events "Upcoming/Recently" labels are h2 (`SectionLabel as="h2"`); decorative 404 numeral drawn via ::before.
33. **Responsive fixes:** Pillars title/body, membership tiers + process, news featured + list stack below `lg` (they overflowed at 768–1024). Footer link columns 2-up below `lg`.
34. **Performance (step 20):**
    - Loader has no per-frame JS: progress is one CSS transition (`.loader[data-progress]`). Images warm in two stages (on-screen first, then nearby) so they never compete with the LCP image.
    - GSAP/SplitText load only after the loader is done + `requestIdleCallback` (`afterLoaderIdle()` in runtime) — moved ~250 ms of TBT out of the critical window. CSS fallbacks cover the gap.
    - Hero/page-hero/detail images use `quality={60}` (grade overlay hides it); only the first hero pane is `preload`, the second is `eager`. Loader logo is `eager`, not `preload`.
    - Blur placeholders regenerated as 8px WebP (media.js 25 KB → 13 KB; smaller HTML/RSC).
    - Measured in a sandbox with fonts mocked and Unsplash replaced by local photos — re-run Lighthouse on the real deployment (real fonts + Unsplash) and set `SITE_URL`.
35. **SEO:** set `SITE_URL` in production (sitemap, robots, canonicals, OG and JSON-LD URLs all derive from it). Submit `/sitemap.xml` to Google Search Console after launch.

36. **Footer credit:** "Developed by STR Solutions LTD" (https://strsltd.com, new tab) after "All rights reserved." in `Footer.js`.
37. **ESLint:** `@next/next/no-img-element` is off only for `**/opengraph-image.js` / `**/twitter-image.js` in `eslint.config.mjs` (satori needs plain `<img>`). `npm run lint` is clean.
38. **Header hide-on-scroll fix:** direction now uses 12px hysteresis (`DIRECTION_PX`); 0px frames never change state. The old `y > lastY` check flipped the header during Lenis ease-out (it dropped ~17px for a moment). Verified: one hide on scroll down, one show on scroll up.

39. **Eyebrow redesign (Sifat: "AI slop"):** `SectionLabel` is now sentence case, 14px/500, normal tracking, with a hairline lattice lozenge — no numbers, no dash, no tracked caps (`eyebrow` utility). Hero/"Next on the calendar"/"Latest story" kickers use the same utility. Tracked-caps `text-label` stays for meta data only (categories, dates, form labels). `index` prop removed.
40. **Display font is Hahmlet** (Sifat, 2026-11-17; Cormorant read as a stock "luxury template" serif). Korean-foundry serif = real Korea link. No italic: title accent lines are colour-only, `font-synthesis-style: none` on `html`. Display scale re-tuned (lg 2.6–6rem, md 2.1–3.6rem, sm 1.75–2.3rem, tracking -0.01em) and the hard-coded display clamps (Pillars words, event dates, footer marquee, quotes, 404) scaled ~0.8. Membership "Apply" + Gallery credits grids now split at `lg` (headings overflowed at 768). Overflow scan: 0 issues on 11 pages × 360/390/768/1024/1440.
41. **Fonts are self-hosted** (`next/font/local`, `app/fonts/*.woff2`, from the Fontsource latin variable builds). `next/font/google` downloads every subset at compile time; on Sifat's network a Google Sans file timed out and `next dev` returned 500 ("Can't resolve @vercel/turbopack-next/internal/font/google/font"). Now builds need no network. To swap a font: drop the woff2 in `app/fonts/` and change `layout.js`.
42. **Hero diptych photos are Sifat's own picks from Pexels** (2026-11-17), self-hosted: `public/images/korea.jpg` (rain-washed Seoul alley at night with Hangul neon, Nuhyil Ahammed) and `public/images/dhaka.jpg` (elevated metro rail curving between towers, Siam Chowdhury). Media ids `hero-seoul-alley` / `hero-dhaka-metro`, `source: "pexels"`; Pexels credits now show in the Gallery credits list alongside Unsplash. (Tried before: Unsplash Yeouido night, N Seoul Tower sunset, a street-level MRT shot.) On mobile the Dhaka caption is hidden — that pane sits under the title and body copy.
43. **Hero/header legibility:** each hero pane has a top scrim (dark → transparent, under the caption) so the header and the city captions stay readable over bright skies; captions are `text-heading` with a soft text-shadow (were accent/muted and vanished on the Seoul sunset). Header tagline is sentence case 13px `text-heading/80` (was 10px tracked caps in `muted`).
44. **Hero has no divider — cursor split (Sifat chose it; a dashed route arc was rejected as not award-level):**
    - Desktop: both panes are 70% wide and overlap; the Dhaka pane dissolves in (soft ~5vw mask edge) at `--split`, which eases towards the cursor in `HeroIntro` (30–70%; hovering a city opens it up; rAF runs only while moving). Off on touch, mobile and reduced motion (rests at 50%).
    - Mobile: panes stacked, the lower one dissolves into the upper (no line).
    - City names "Seoul" / "Dhaka" (display-sm + coords; Sifat asked for smaller than display-md) sit large on their own sides — Seoul top-left, Dhaka top-right, aligned to `container-club` — and never move (Sifat). The figcaptions stay for screen readers; Seoul's shows on mobile.
    - Hero kicker ("A private members' club in Dhaka") removed at Sifat's request; `Hero.js` renders a kicker only if content has one.
    - `components/home/HeroRoute.js` is the unused arc experiment — delete it.

45. **Hero city labels are the countries** (Sifat): `city` = "South Korea" / "Bangladesh", `coords` = "Seoul · …" / "Dhaka · …". Field name `city` kept so the data shape doesn't change.
46. **Header wordmark = full club name** (two lines: "Korea Bangladesh" / "Business & Cultural Club"), "KBBCC" text removed (the acronym is in the emblem). To fit at 1024px, nav gap is `gap-6` and tracking `0.14em` below `xl` (`0.2em` from `xl`). Footer still shows the old KBBCC lockup — not changed.
47. **Navigation:** no Membership item; the header CTA "Apply for membership" goes to `/membership` (top of page, not `#apply`). "Members" (`/members`) is in the primary nav; footer "The Club" column has "Our members" + "Membership".
48. **Members page data is DUMMY** (Sifat asked for placeholders): every name/company in `content/members.js` is invented and marked `draft: true`; portraits are 13 Unsplash stock photos (`member-portrait-01…13`, credits auto-listed on Gallery). This is the one exception to decision 5 — must be replaced by the club's real list before launch. Directory is grouped by category (founding / life / corporate / general); Phase 2 → `members` collection with `rank`, `category`, `country`, `since`, `image`, `published`.

49. **i18n = Option A, no library** (Sifat, 2026-11-19), following Next 16's own i18n guide:
    - URLs: English unprefixed (`/about`), Korean `/ko/about`. `proxy.js`: `/en/*` → 308 to unprefixed; `/ko/*` served; unprefixed → 307 to `/ko/*` if cookie `kbbcc-locale=ko`, else rewritten to `/en/*`. No Accept-Language sniffing (crawlers + first visit = English).
    - Locale is read with `next/root-params` (`getLocale()`), so content getters/components need no prop drilling. Getters take an optional `locale`; route handlers (sitemap) must pass it — root params don't work there.
    - Korean content = partial overrides in `content/ko/*` merged over English (arrays by INDEX — keep order identical; hrefs/media ids come from English). Missing keys show English. Phase 2: a `ko` field per document.
    - Always import `Link` from `@/components/i18n/LocaleLink` (never `next/link`) and keep hrefs locale-free in content.
    - `stripLocale` also strips `/en`: on rewritten English pages `usePathname()` returns `/en/...` during prerender (bug found + fixed: switch linked to `/ko/en/members`).
    - Switch = plain `<a hreflang>` links (crawlable, no JS needed) + cookie on click; full page load because `<html lang>` changes.
    - Page metadata: `generateMetadata` → `alternates: await localeAlternates("/path")` (canonical per locale + hreflang en/ko/x-default). Sitemap lists every URL in both languages with alternates.
    - Korean type: Hangul falls back to OS Korean faces (stacks in `@theme`); `html:lang(ko)` → `word-break: keep-all`, and all `tracking-*` utilities drop to 0.02em on Korean pages.
50. **404s:** unmatched URLs → `app/global-not-found.js` (English chrome; real 404 status + full HTML). `notFound()` inside pages → `app/[locale]/not-found.js`. Both render `components/page/NotFoundView.js`. `Header`/`Footer` accept an optional `locale` prop for this case. A catch-all `[...rest]` route was tried first and rejected: under cacheComponents it served an empty error shell.
51. Header CTA has `shortLabel` ("Apply" / "가입 신청") shown only between `lg` and `xl`, where the nav + language switch leave no room.

## Open items (waiting on client/Sifat)
- **Real member list for `/members`** — office bearers (with ranks), executive committee, directory by category, portraits, and each member's consent to be listed. Everything there now is dummy.
- **Korean (KO) copy:** Claude drafts it step by step; a native Korean speaker (club member) must proofread before launch. All Korean files are marked DRAFT.
- **Korean web font (step 24g):** Hahmlet ships Hangul but the full file is large (MBs); options: subset Hahmlet to the Hangul actually used, or Pretendard / Noto Sans KR for body. Until then Korean uses OS fonts.
- Logo as SVG or high-res transparent PNG.
- Name and title of the person in `leader-portrait-01.jpg`; committee member list.
- Original high-res photos (not WhatsApp-compressed), especially the club space at Rupayan Millennium Square.
- Club phone, email and social links (`content/site.js` has them as `null`).
- **Draft copy to confirm/replace** (`draft: true` in `content/home.js`): the featured event (12 Dec 2026, Winter Session), membership tiers, the President's quote, two clubhouse space descriptions. President's name is `null` (UI shows the role only).
- Committee names (About page shows "To be confirmed"), real event calendar, tier fees, membership process — all `draft: true`.
- Logo is a raster cut-out (324px). Ask the club for the SVG / original artwork for crisp large sizes.

## Phase 2 — first decisions/inputs needed
- MongoDB host (Atlas vs on the VPS) and image storage (VPS disk vs S3/Cloudinary).
- Dependency approvals: `mongoose`, `zod`, password hashing (`argon2` or `bcryptjs`), email (`nodemailer`/Resend).
- Admin roles (super_admin / editor) and who gets accounts.
- Where form submissions go (secretariat email address).
- Deployment target (STR VPS or client's Hostinger) and the domain → `SITE_URL`.

## Known caveats
- Unknown event/news slugs (`/events/xyz`) stream the not-found UI with status 200 (Partial Prerender fallback) — pre-existing Next behaviour, not caused by i18n. Fine for now; revisit with Phase 2 data.
- `.next/kbbcc-src.tgz` is a throwaway source snapshot used for browser testing; it is inside the gitignored build folder and disappears on the next `next build`/clean.
- Lockfile was edited surgically to add only gsap + lenis (a Linux npm 10 would drop the `libc` fields your Windows npm writes). Run `npm install` once on Windows to confirm it is a no-op.
- `node_modules` was installed on Windows; build/lint must be run on Sifat's machine (`npm run build`, `npm run lint`).
- `AGENTS.md` is auto-generated by `next dev` — read `node_modules/next/dist/docs/` before using any Next API.
