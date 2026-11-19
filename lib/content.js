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
    return resolveMedia(await localize("site", site, locale));
}

/**
 * @param {string} id
 * @returns {Promise<Media>}
 */
export async function getMedia(id) {
    const item = media[id];
    if (!item) {
        throw new Error(`[content] Unknown media id: "${id}"`);
    }
    return item;
}

/**
 * @param {string[]} ids
 * @returns {Promise<Media[]>}
 */
export async function getMediaList(ids) {
    return Promise.all(ids.map(getMedia));
}

/** Primary + footer navigation. */
export async function getNavigation(locale) {
    return localize("navigation", navigation, locale);
}

/**
 * Replace media ids with Media records: any `image` (string) or `images` (string[])
 * field, at any depth. Unknown ids throw — a broken reference should fail the build.
 */
async function resolveMedia(value) {
    if (Array.isArray(value)) return Promise.all(value.map(resolveMedia));
    if (!value || typeof value !== "object") return value;

    const entries = await Promise.all(
        Object.entries(value).map(async ([key, v]) => {
            if (key === "image" && typeof v === "string") return [key, await getMedia(v)];
            if (key === "images" && Array.isArray(v)) return [key, await getMediaList(v)];
            return [key, await resolveMedia(v)];
        }),
    );
    return Object.fromEntries(entries);
}

/** Homepage content with media resolved. */
export async function getHomePage(locale) {
    return resolveMedia(await localize("home", home, locale));
}

/** About page content with media resolved. */
export async function getAboutPage(locale) {
    return resolveMedia(await localize("about", about, locale));
}

/** Membership page content with media resolved. */
export async function getMembershipPage(locale) {
    return resolveMedia(await localize("membership", membership, locale));
}

/** Members page (office bearers, committee, directory) with media resolved. Phase 2: `members` collection. */
export async function getMembersPage(locale) {
    const data = await resolveMedia(await localize("members", members, locale));
    const officers = data.leadership.officers.toSorted((a, b) => a.rank - b.rank);
    return { ...data, leadership: { ...data.leadership, officers } };
}

/** Event categories (filter tabs). */
export async function getEventCategories() {
    return eventCategories;
}

const categoryLabel = (key) => eventCategories.find((c) => c.key === key)?.label ?? key;
const withLabel = (e) => ({ ...e, categoryLabel: categoryLabel(e.category) });

/**
 * Events, newest first within each status. Upcoming are sorted soonest first.
 * @param {{ status?: "upcoming" | "past" }} [filter]
 */
export async function getEvents({ status } = {}) {
    const list = status ? events.filter((e) => e.status === status) : events;
    const sorted = [...list].sort((a, b) =>
        a.status === "upcoming" && b.status === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
    return resolveMedia(sorted.map(withLabel));
}

/** @param {string} slug */
export async function getEvent(slug) {
    const event = events.find((e) => e.slug === slug);
    return event ? resolveMedia(withLabel(event)) : null;
}

/** Slugs for generateStaticParams. */
export async function getEventSlugs() {
    return events.map((e) => e.slug);
}

/** Gallery page with media resolved and category labels attached. */
export async function getGallery() {
    const data = await resolveMedia(gallery);
    return { ...data, items: data.items.map((item) => ({ ...item, categoryLabel: categoryLabel(item.category) })) };
}

/** Every stock-photo credit (Unsplash, Pexels) used anywhere on the site (for the gallery credits list). */
export async function getPhotoCredits() {
    const seen = new Map();
    for (const m of Object.values(media)) {
        if ((m.source === "unsplash" || m.source === "pexels") && m.credit) seen.set(m.credit.url, { ...m.credit, alt: m.alt });
    }
    return [...seen.values()];
}

const typeLabel = (key) => postTypes.find((t) => t.key === key)?.label ?? key;

export async function getPostTypes() {
    return postTypes;
}

/** News & notices, newest first. */
export async function getPosts({ type } = {}) {
    const list = (type ? posts.filter((p) => p.type === type) : posts)
        .toSorted((a, b) => b.date.localeCompare(a.date))
        .map((p) => ({ ...p, typeLabel: typeLabel(p.type) }));
    return resolveMedia(list);
}

/** @param {string} slug */
export async function getPost(slug) {
    const post = posts.find((p) => p.slug === slug);
    return post ? resolveMedia({ ...post, typeLabel: typeLabel(post.type) }) : null;
}

export async function getPostSlugs() {
    return posts.map((p) => p.slug);
}

export async function getContactPage() {
    return contact;
}

/** @param {"privacy" | "terms"} key */
export async function getLegalPage(key) {
    return legal[key];
}
