import "server-only";
import { media } from "@/content/media";
import { site } from "@/content/site";

/**
 * Content access layer.
 *
 * Every component reads content through these async functions — never by importing
 * `/content/*` directly. In Phase 2 only the bodies of these functions change
 * (MongoDB + `"use cache"` + `cacheTag(...)`, revalidated from the admin dashboard);
 * component code and data shapes stay the same.
 */

/**
 * @typedef {Object} Media
 * @property {string} id
 * @property {string} src            Local path (/images/...) or absolute https URL
 * @property {string} alt            Required, descriptive — empty only for pure decoration
 * @property {number} width          Intrinsic width (prevents CLS)
 * @property {number} height         Intrinsic height
 * @property {string} [objectPosition] CSS object-position (focal point)
 * @property {"club"|"soft"|"none"} grade  Photo grade treatment (see DESIGN.md)
 * @property {"club"|"unsplash"|"upload"} source
 * @property {{ name: string, url: string } | null} credit
 * @property {string} [blurDataURL]
 */

/**
 * @typedef {Object} SiteSettings
 * @property {string} name
 * @property {string} shortName
 * @property {Media | null} logo
 * @property {{ building: string, line1: string, area: string, city: string, postcode: string, country: string }} address
 * @property {string} mapUrl
 * @property {{ phone: string | null, email: string | null }} contact
 * @property {{ label: string, url: string }[]} social
 */

/** @returns {Promise<SiteSettings>} */
export async function getSiteSettings() {
    return site;
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
