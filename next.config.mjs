import { UNSPLASH_HOST, UNSPLASH_QUERY } from "./lib/unsplash.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    experimental: {
        // Root layout is app/[locale] → unmatched URLs need app/global-not-found.js (documented for this case).
        globalNotFound: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        // Required since Next 16 — only these qualities can be requested.
        qualities: [60, 75],
        // 31 days; local images are content-addressed by filename, admin uploads get new names.
        minimumCacheTTL: 2678400,
        localPatterns: [{ pathname: "/images/**", search: "" }],
        remotePatterns: [
            // Exact query only — see lib/unsplash.config.mjs. `new URL(".../**")` would forbid any query.
            { protocol: "https", hostname: UNSPLASH_HOST, port: "", pathname: "/**", search: UNSPLASH_QUERY },
        ],
    },
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
