import { getEvents, getPosts } from "@/lib/content";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, localizePath } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

/** @returns {Promise<import("next").MetadataRoute.Sitemap>} */
export default async function sitemap() {
    // Route handler: no root params here — content getters that localize must get a locale explicitly.
    const [events, posts] = await Promise.all([getEvents(), getPosts()]);

    const pages = [
        { path: "/", priority: 1, changeFrequency: "weekly" },
        { path: "/about", priority: 0.8, changeFrequency: "monthly" },
        { path: "/membership", priority: 0.9, changeFrequency: "monthly" },
        { path: "/members", priority: 0.7, changeFrequency: "monthly" },
        { path: "/events", priority: 0.9, changeFrequency: "weekly" },
        { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
        { path: "/news", priority: 0.7, changeFrequency: "weekly" },
        { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
        { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
        { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    ].map((p) => ({ url: p.path, changeFrequency: p.changeFrequency, priority: p.priority }));

    const entries = [
        ...pages,
        ...events.map((e) => ({
            url: `/events/${e.slug}`,
            lastModified: e.date,
            changeFrequency: e.status === "upcoming" ? "weekly" : "yearly",
            priority: e.status === "upcoming" ? 0.7 : 0.4,
        })),
        ...posts.map((p) => ({
            url: `/news/${p.slug}`,
            lastModified: p.date,
            changeFrequency: "yearly",
            priority: p.type === "notice" ? 0.4 : 0.5,
        })),
    ];

    // One entry per page per language, each listing every language version (hreflang).
    const languages = (path) => ({
        ...Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].htmlLang, absoluteUrl(localizePath(path, l))])),
        "x-default": absoluteUrl(localizePath(path, DEFAULT_LOCALE)),
    });

    return LOCALES.flatMap((locale) =>
        entries.map((entry) => ({
            ...entry,
            url: absoluteUrl(localizePath(entry.url, locale)),
            alternates: { languages: languages(entry.url) },
        })),
    );
}
