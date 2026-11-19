/**
 * i18n config — shared by proxy.js, server code and client components (no server-only imports here).
 *
 * URL scheme: English (default) is UNPREFIXED (`/about`), Korean is `/ko/about`.
 * proxy.js rewrites unprefixed URLs to `/en/...` internally, so every page lives under `app/[locale]`.
 */
export const LOCALES = ["en", "ko"];
export const DEFAULT_LOCALE = "en";

/** Set by the navbar switch; proxy.js sends a visitor who chose Korean to /ko on later visits. */
export const LOCALE_COOKIE = "kbbcc-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Switch labels: `short` in the header bar, `name` (in its own language) in the mobile menu + aria. */
export const LOCALE_META = {
    en: { short: "EN", name: "English", htmlLang: "en", ogLocale: "en_US" },
    ko: { short: "KO", name: "한국어", htmlLang: "ko", ogLocale: "ko_KR" },
};

/** @param {unknown} value */
export const hasLocale = (value) => typeof value === "string" && LOCALES.includes(value);

/** Split "/path?query#hash" → ["/path", "?query#hash"]. */
function splitSuffix(href) {
    const i = href.search(/[?#]/);
    return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}

/** Locale prefix of an internal path ("ko", or "en" for the internal rewritten form), or null if unprefixed. */
export function localeOfPath(path) {
    const [pathname] = splitSuffix(path);
    const first = pathname.split("/")[1];
    return hasLocale(first) ? first : null;
}

/**
 * "/ko/about#x" → "/about#x"; "/ko" → "/". Also strips "/en": English pages are served through a
 * rewrite, and usePathname() returns the internal "/en/..." path while prerendering them.
 */
export function stripLocale(path) {
    const [pathname, suffix] = splitSuffix(path);
    const prefix = localeOfPath(pathname);
    if (!prefix) return path;
    const rest = pathname.slice(prefix.length + 1) || "/";
    return rest + suffix;
}

/**
 * Internal href for a locale: "/about" + ko → "/ko/about", "/" + ko → "/ko", "/membership#apply" + ko → "/ko/membership#apply".
 * External URLs, protocol-relative URLs, "#hash" and "?query" hrefs are returned unchanged.
 */
export function localizePath(href, locale) {
    if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return href;
    const bare = stripLocale(href);
    if (!hasLocale(locale) || locale === DEFAULT_LOCALE) return bare;
    const [pathname, suffix] = splitSuffix(bare);
    return `/${locale}${pathname === "/" ? "" : pathname}${suffix}`;
}
