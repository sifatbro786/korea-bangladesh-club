/**
 * Build a capped source URL for an Unsplash photo.
 * next/image does the responsive resizing; this only caps the original we pull
 * (Unsplash originals can be 6000px+, which slows the first optimisation).
 *
 * @param {string} photoPath  e.g. "photo-1517248135467-4c7edcad34c4"
 * @param {number} [maxWidth=2400]
 */
export function unsplashSrc(photoPath, maxWidth = 2400) {
    return `https://images.unsplash.com/${photoPath}?auto=format&fit=max&w=${maxWidth}&q=80`;
}
