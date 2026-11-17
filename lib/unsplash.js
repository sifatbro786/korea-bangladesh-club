/**
 * Unsplash source URLs.
 *
 * Every Unsplash URL uses the SAME query string, and next.config.mjs allowlists exactly
 * that string (`images.remotePatterns[].search`). So the image optimiser cannot be asked
 * to fetch arbitrary Unsplash transforms. next/image does the responsive resizing; the
 * query only caps the original we pull (Unsplash originals can be 6000px+).
 *
 * Host + query constants live in unsplash.config.mjs (also imported by next.config.mjs).
 */
import { UNSPLASH_HOST, UNSPLASH_QUERY } from "./unsplash.config.mjs";

/** @param {string} photoPath e.g. "photo-1556513584-fc549ffb7577" */
export function unsplashSrc(photoPath) {
    return `https://${UNSPLASH_HOST}/${photoPath}${UNSPLASH_QUERY}`;
}
