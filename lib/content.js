import "server-only";
import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { eventCategories, events } from "@/content/events";
import { gallery } from "@/content/gallery";
import { home } from "@/content/home";
import { legal } from "@/content/legal";
import { members } from "@/content/members";
import { membership } from "@/content/membership";
import { media } from "@/content/media";
import { navigation } from "@/content/navigation";
import { postTypes, posts } from "@/content/news";
import { site } from "@/content/site";
import { ko } from "@/content/ko";
import { mediaAltKo } from "@/content/ko/media";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { deepMerge, getLocale } from "@/lib/i18n/server";

/**
 * Content access layer.
 *
 * Every component reads content through these async functions — never by importing
 * `/content/*` directly. In Phase 2 only the bodies of these functions change
 * (MongoDB + `"use cache"` + `cacheTag(...)`, revalidated from the admin dashboard);
 * component code and data shapes stay the same.
 *
 * Locale: every getter takes an optional `locale`; when omitted it is read from the `[locale]`
 * root segment (next/root-params). Route handlers (sitemap) must pass it explicitly.
 * Korean copy lives in /content/ko as partial overrides merged over English (missing → English).
 */

const OVERRIDES = { ko };

/** Merge the locale's overrides for content document `key` over the English base. */
async function localize(key, base, locale) {
    locale ??= await getLocale();
    if (locale === DEFAULT_LOCALE) return base;
    return deepMerge(base, OVERRIDES[locale]?.[key]);
}

/**
 * @typedef {Object} Media
 * @property {string} id
 * @property {string} src            Local path (/images/...) or absolute https URL
 * @property {string} alt            Required, descriptive — empty only for pure decoration
 * @property {number} width          Intrinsic width (prevents CLS)
 * @property {number} height         Intrinsic height
 * @property {string} [objectPosition] CSS object-position (focal point)
 * @property {"club"|"soft"|"none"} grade  Photo grade treatment (see DESIGN.md)
 * @property {"club"|"unsplash"|"pexels"|"upload"} source
 * @property {{ name: string, url: string } | null} credit
 * @property {string} [blurDataURL]
 */

/**
 * @typedef {Object} SiteSettings
 * @property {string} name
 * @property {string} shortName
 * @property {{ image: Media } | null} logo
 * @property {{ building: string, line1: string, area: string, city: string, postcode: string, country: string }} address
 * @property {string} mapUrl
 * @property {{ phone: string | null, email: string | null }} contact
 * @property {{ label: string, url: string }[]} social
 */

/** @returns {Promise<SiteSettings>} */
export async function getSiteSettings(locale) {
    locale ??= await getLocale();
    return resolveMedia(await localize("site", site, locale), locale);
}

/**
 * @param {string} id
 * @returns {Promise<Media>}
 */
export async function getMedia(id, locale = DEFAULT_LOCALE) {
    const item = media[id];
    if (!item) {
        throw new Error(`[content] Unknown media id: "${id}"`);
    }
    const alt = locale === "ko" ? mediaAltKo[id] : undefined;
    return alt ? { ...item, alt } : item;
}

/**
 * @param {string[]} ids
 * @returns {Promise<Media[]>}
 */
export async function getMediaList(ids, locale) {
    return Promise.all(ids.map((id) => getMedia(id, locale)));
}

/** Primary + footer navigation. */
export async function getNavigation(locale) {
    return localize("navigation", navigation, locale);
}

/**
 * Replace media ids with Media records: any `image` (string) or `images` (string[])
 * field, at any depth. Unknown ids throw — a broken reference should fail the build.
 */
async function resolveMedia(value, locale) {
    if (Array.isArray(value)) return Promise.all(value.map((v) => resolveMedia(v, locale)));
    if (!value || typeof value !== "object") return value;

    const entries = await Promise.all(
        Object.entries(value).map(async ([key, v]) => {
            if (key === "image" && typeof v === "string") return [key, await getMedia(v, locale)];
            if (key === "images" && Array.isArray(v)) return [key, await getMediaList(v, locale)];
            return [key, await resolveMedia(v, locale)];
        }),
    );
    return Object.fromEntries(entries);
}

/** Homepage content with media resolved. */
export async function getHomePage(locale) {
    locale ??= await getLocale();
    return resolveMedia(await localize("home", home, locale), locale);
}

/** About page content with media resolved. */
export async function getAboutPage(locale) {
    locale ??= await getLocale();
    return resolveMedia(await localize("about", about, locale), locale);
}

/** Membership page content with media resolved. */
export async function getMembershipPage(locale) {
    locale ??= await getLocale();
    return resolveMedia(await localize("membership", membership, locale), locale);
}

/** Members page (office bearers, committee, directory) with media resolved. Phase 2: `members` collection. */
export async function getMembersPage(locale) {
    locale ??= await getLocale();
    const data = await resolveMedia(await localize("members", members, locale), locale);
    const officers = data.leadership.officers.toSorted((a, b) => a.rank - b.rank);
    return { ...data, leadership: { ...data.leadership, officers } };
}

// ── Dates ──────────────────────────────────────────────────────────────────────
// Labels are formatted from the ISO `date` per locale, so translations never carry dates.
// UTC on purpose: "2026-12-12" is a calendar date, not an instant.
const fmt = (locale, opts) => new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-GB", { timeZone: "UTC", ...opts });

/** { day, month, weekday, short, full } — en: "12" "December 2026" "Saturday" · ko: "12" "2026년 12월" "토요일". */
function eventDateLabel(iso, locale) {
    const d = new Date(`${iso}T00:00:00Z`);
    return {
        day: fmt(locale, { day: "2-digit" }).format(d).replace(/\D/g, ""),
        month: fmt(locale, { month: "long", year: "numeric" }).format(d),
        weekday: fmt(locale, { weekday: "long" }).format(d),
        short: fmt(locale, { day: "numeric", month: "long", year: "numeric" }).format(d),
        full: fmt(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d),
    };
}

const postDateLabel = (iso, locale) => fmt(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T00:00:00Z`));

// ── Collections (events, posts) ────────────────────────────────────────────────
// Korean overrides for collections are keyed by slug/key (admin can reorder), not by index.

const overridesFor = (locale, key) => (locale === DEFAULT_LOCALE ? undefined : OVERRIDES[locale]?.[key]);

/** Event categories (filter tabs). */
export async function getEventCategories(locale) {
    locale ??= await getLocale();
    const labels = overridesFor(locale, "eventCategories");
    return eventCategories.map((c) => ({ ...c, label: labels?.[c.key] ?? c.label }));
}

function localizeEvent(e, locale, categories) {
    const merged = deepMerge(e, overridesFor(locale, "events")?.[e.slug]);
    return {
        ...merged,
        dateLabel: eventDateLabel(e.date, locale),
        categoryLabel: categories.find((c) => c.key === e.category)?.label ?? e.category,
    };
}

/**
 * Events, newest first within each status. Upcoming are sorted soonest first.
 * @param {{ status?: "upcoming" | "past", locale?: string }} [filter]
 */
export async function getEvents({ status, locale } = {}) {
    locale ??= await getLocale();
    const categories = await getEventCategories(locale);
    const list = status ? events.filter((e) => e.status === status) : events;
    const sorted = [...list].sort((a, b) =>
        a.status === "upcoming" && b.status === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
    return resolveMedia(sorted.map((e) => localizeEvent(e, locale, categories)), locale);
}

/** @param {string} slug */
export async function getEvent(slug, locale) {
    locale ??= await getLocale();
    const event = events.find((e) => e.slug === slug);
    if (!event) return null;
    return resolveMedia(localizeEvent(event, locale, await getEventCategories(locale)), locale);
}

/** Slugs for generateStaticParams. */
export async function getEventSlugs() {
    return events.map((e) => e.slug);
}

/** Gallery page with media resolved and category labels attached. */
export async function getGallery(locale) {
    locale ??= await getLocale();
    const [data, categories] = await Promise.all([resolveMedia(await localize("gallery", gallery, locale), locale), getEventCategories(locale)]);
    return {
        ...data,
        items: data.items.map((item) => ({ ...item, categoryLabel: categories.find((c) => c.key === item.category)?.label ?? item.category })),
    };
}

/** Every stock-photo credit (Unsplash, Pexels) used anywhere on the site (for the gallery credits list). */
export async function getPhotoCredits(locale) {
    locale ??= await getLocale();
    const seen = new Map();
    for (const m of Object.values(media)) {
        if ((m.source === "unsplash" || m.source === "pexels") && m.credit) {
            const { alt } = await getMedia(m.id, locale);
            seen.set(m.credit.url, { ...m.credit, alt });
        }
    }
    return [...seen.values()];
}

export async function getPostTypes(locale) {
    locale ??= await getLocale();
    const labels = overridesFor(locale, "postTypes");
    return postTypes.map((t) => ({ ...t, label: labels?.[t.key] ?? t.label }));
}

function localizePost(p, locale, types) {
    const merged = deepMerge(p, overridesFor(locale, "posts")?.[p.slug]);
    return {
        ...merged,
        dateLabel: postDateLabel(p.date, locale),
        typeLabel: types.find((t) => t.key === p.type)?.label ?? p.type,
    };
}

/** News & notices, newest first. */
export async function getPosts({ type, locale } = {}) {
    locale ??= await getLocale();
    const types = await getPostTypes(locale);
    const list = (type ? posts.filter((p) => p.type === type) : posts)
        .toSorted((a, b) => b.date.localeCompare(a.date))
        .map((p) => localizePost(p, locale, types));
    return resolveMedia(list, locale);
}

/** @param {string} slug */
export async function getPost(slug, locale) {
    locale ??= await getLocale();
    const post = posts.find((p) => p.slug === slug);
    return post ? resolveMedia(localizePost(post, locale, await getPostTypes(locale)), locale) : null;
}

export async function getPostSlugs() {
    return posts.map((p) => p.slug);
}

export async function getContactPage(locale) {
    return localize("contact", contact, locale);
}

/** @param {"privacy" | "terms"} key */
export async function getLegalPage(key, locale) {
    return (await localize("legal", legal, locale))[key];
}
