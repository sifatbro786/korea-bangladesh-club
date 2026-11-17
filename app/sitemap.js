import { getEvents, getPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** @returns {Promise<import("next").MetadataRoute.Sitemap>} */
export default async function sitemap() {
    const [events, posts] = await Promise.all([getEvents(), getPosts()]);

    const pages = [
        { path: "/", priority: 1, changeFrequency: "weekly" },
        { path: "/about", priority: 0.8, changeFrequency: "monthly" },
        { path: "/membership", priority: 0.9, changeFrequency: "monthly" },
        { path: "/events", priority: 0.9, changeFrequency: "weekly" },
        { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
        { path: "/news", priority: 0.7, changeFrequency: "weekly" },
        { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
        { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
        { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    ].map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority }));

    return [
        ...pages,
        ...events.map((e) => ({
            url: absoluteUrl(`/events/${e.slug}`),
            lastModified: e.date,
            changeFrequency: e.status === "upcoming" ? "weekly" : "yearly",
            priority: e.status === "upcoming" ? 0.7 : 0.4,
        })),
        ...posts.map((p) => ({
            url: absoluteUrl(`/news/${p.slug}`),
            lastModified: p.date,
            changeFrequency: "yearly",
            priority: p.type === "notice" ? 0.4 : 0.5,
        })),
    ];
}
