import { absoluteUrl } from "@/lib/seo";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/dev/"] }],
        sitemap: absoluteUrl("/sitemap.xml"),
    };
}
