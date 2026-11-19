import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, hasLocale } from "@/lib/i18n/config";

/**
 * Locale routing (no library).
 *  - `/en` and `/en/...`  → 308 to the unprefixed URL (English has one canonical URL).
 *  - `/ko/...`            → served as is.
 *  - unprefixed           → visitor chose Korean before (cookie)? 307 to `/ko/...`;
 *                           otherwise rewritten internally to `/en/...` (URL stays unprefixed).
 * No Accept-Language sniffing: crawlers and first-time visitors always get English at `/`,
 * Korean is one click away in the navbar and is remembered from then on.
 */
export function proxy(request) {
    const url = request.nextUrl;
    const { pathname } = url;
    const first = pathname.split("/")[1];

    if (first === DEFAULT_LOCALE) {
        url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
        return NextResponse.redirect(url, 308);
    }

    if (hasLocale(first)) return NextResponse.next();

    const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
    if (hasLocale(preferred) && preferred !== DEFAULT_LOCALE) {
        url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
        return NextResponse.redirect(url, 307);
    }

    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(url);
}

export const config = {
    // Skip Next internals, public files (anything with a dot: /images/*.jpg, /sitemap.xml, /icon.png …)
    // and extension-less metadata routes.
    matcher: ["/((?!_next/|images/|opengraph-image|twitter-image|.*\\..*).*)"],
};
